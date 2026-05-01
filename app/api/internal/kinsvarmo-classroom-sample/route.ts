import { NextResponse } from "next/server";
import { buildGroupMetricsAverage } from "@/lib/metrics/group";
import type { DayCode, StudentMetricContext } from "@/lib/metrics/types";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;
const CLASSROOM_TRADING_URL =
  process.env.CLASSROOM_TRADING_URL ||
  process.env.CT_BASE_URL ||
  "https://classroom-trading.ariiben.com";

type CtRosterStudent = {
  id: number;
  nivelActual?: string | null;
  isCurrent?: boolean;
  day?: DayCode | null;
  privCode?: string | null;
  resolvedCourseId?: string | null;
};

type RequestBody = {
  courseId?: string;
  day?: DayCode;
  privCode?: string | null;
  limit?: number;
  mode?: "raw_only" | "history_fallback";
  windows?: {
    attendanceLastN?: number;
    punctualityLastN?: number;
    practicesLastN?: number;
  };
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!INTERNAL_SECRET || authHeader !== `Bearer ${INTERNAL_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as RequestBody;
    const courseId = body.courseId?.trim();
    const day = parseDay(body.day);
    const privCode = body.privCode?.trim() || null;
    const limit = toPositiveInt(body.limit, 12);

    const roster = await fetchCurrentRoster();
    const students = roster
      .map(toStudentMetricContext)
      .filter((student) => student.isCurrent)
      .filter((student) => !courseId || student.resolvedCourseId === courseId)
      .filter((student) => !day || student.day === day)
      .filter((student) => day !== "PRIV" || !privCode || student.privCode === privCode)
      .slice(0, limit);

    if (!students.length) {
      return NextResponse.json({
        ok: true,
        generatedAt: new Date().toISOString(),
        students: [],
        sampleCsv: "",
        message: "No current students matched the requested filters.",
      });
    }

    const groupMetrics = await buildGroupMetricsAverage({
      students,
      mode: body.mode === "history_fallback" ? "history_fallback" : "raw_only",
      windows: {
        attendanceLastN: toPositiveInt(body.windows?.attendanceLastN, 3),
        punctualityLastN: toPositiveInt(body.windows?.punctualityLastN, 3),
        practicesLastN: toPositiveInt(body.windows?.practicesLastN, 9),
      },
      context: {
        nivelActual: null,
        day,
        privCode,
      },
    });

    const sampleRows = groupMetrics.students.map((student, index) =>
      anonymizeStudentRow(student, index)
    );

    return NextResponse.json({
      ok: true,
      generatedAt: new Date().toISOString(),
      source: {
        courseId: courseId ?? null,
        day,
        privCode: privCode ? "provided" : null,
        limit,
        rosterMatched: students.length,
      },
      group: {
        size: groupMetrics.group.size,
        averages: groupMetrics.averages,
        counts: groupMetrics.counts,
      },
      students: sampleRows,
      sampleCsv: toCsv(sampleRows),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

async function fetchCurrentRoster(): Promise<CtRosterStudent[]> {
  const response = await fetch(
    `${CLASSROOM_TRADING_URL}/api/internal/roaster/current?onlyCurrent=true&includeResolvedCourseId=true&minimal=true`,
    {
      headers: {
        Authorization: `Bearer ${INTERNAL_SECRET}`,
      },
      cache: "no-store",
    }
  );

  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;

  if (!response.ok || !parsed?.ok || !Array.isArray(parsed.roster)) {
    throw new Error(`Unable to fetch CT roster: ${text.slice(0, 400)}`);
  }

  return parsed.roster as CtRosterStudent[];
}

function toStudentMetricContext(row: CtRosterStudent): StudentMetricContext {
  return {
    id: Number(row.id),
    nivelActual: row.nivelActual ?? null,
    resolvedCourseId: row.resolvedCourseId ?? null,
    isCurrent: row.isCurrent ?? false,
    day: parseDay(row.day),
    privCode: row.privCode ?? null,
  };
}

function anonymizeStudentRow(
  student: {
    attendancePctLastN: number | null;
    lateMinutesLastN: number | null;
    practicesAvgLastN: number | null;
    gradesTotal: number | null;
    gradesOverall: number | null;
    pointsClass: number | null;
  },
  index: number
) {
  const attendanceRate = normalizeRate(student.attendancePctLastN);
  const assignmentCompletion = normalizeRate(student.practicesAvgLastN);
  const quizAverage = normalizeGrade(student.gradesOverall ?? student.gradesTotal);
  const participationScore = normalizeRate(student.pointsClass);
  const lateSubmissions = estimateLateSubmissions(student.lateMinutesLastN);
  const recentTrend = inferTrend({
    attendanceRate,
    assignmentCompletion,
    quizAverage,
    participationScore,
    lateSubmissions,
  });

  return {
    student_id: `STU-${String(index + 1).padStart(3, "0")}`,
    attendance_rate: round(attendanceRate, 2),
    assignment_completion: round(assignmentCompletion, 2),
    quiz_average: Math.round(quizAverage),
    participation_score: round(participationScore, 2),
    late_submissions: lateSubmissions,
    recent_trend: recentTrend,
    support_note: buildSupportNote({
      attendanceRate,
      assignmentCompletion,
      quizAverage,
      participationScore,
      lateSubmissions,
      recentTrend,
    }),
  };
}

function normalizeRate(value: number | null): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  const normalized = value > 1 ? value / 100 : value;
  return clamp(normalized, 0, 1);
}

function normalizeGrade(value: number | null): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  return clamp(value > 10 ? value : value * 10, 0, 100);
}

function estimateLateSubmissions(value: number | null): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return Math.min(5, Math.max(1, Math.round(value / 5)));
}

function inferTrend(input: {
  attendanceRate: number;
  assignmentCompletion: number;
  quizAverage: number;
  participationScore: number;
  lateSubmissions: number;
}): "improving" | "stable" | "declining" {
  if (
    input.attendanceRate < 0.75 ||
    input.assignmentCompletion < 0.62 ||
    input.quizAverage < 68 ||
    input.lateSubmissions >= 4
  ) {
    return "declining";
  }

  if (
    input.attendanceRate >= 0.9 &&
    input.assignmentCompletion >= 0.82 &&
    input.quizAverage >= 78 &&
    input.participationScore >= 0.65
  ) {
    return "improving";
  }

  return "stable";
}

function buildSupportNote(input: {
  attendanceRate: number;
  assignmentCompletion: number;
  quizAverage: number;
  participationScore: number;
  lateSubmissions: number;
  recentTrend: "improving" | "stable" | "declining";
}): string {
  if (input.recentTrend === "improving") {
    return "ready for extension or leadership task";
  }

  if (input.attendanceRate < 0.75) {
    return "attendance pattern should be checked before academic conclusions";
  }

  if (input.assignmentCompletion < 0.62 || input.lateSubmissions >= 4) {
    return "prioritize task chunking and low-pressure follow-up";
  }

  if (input.quizAverage < 68) {
    return "review core concept gaps with short practice loop";
  }

  if (input.participationScore < 0.45) {
    return "invite participation through pair work or prepared prompts";
  }

  return "maintain current support and monitor next checkpoint";
}

function toCsv(rows: ReturnType<typeof anonymizeStudentRow>[]): string {
  const headers = [
    "student_id",
    "attendance_rate",
    "assignment_completion",
    "quiz_average",
    "participation_score",
    "late_submissions",
    "recent_trend",
    "support_note",
  ];

  return [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => csvEscape(String(row[header as keyof typeof row])))
        .join(",")
    ),
  ].join("\n");
}

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function parseDay(value: unknown): DayCode | null {
  return value === "SAM" || value === "SON" || value === "PRIV" ? value : null;
}

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
