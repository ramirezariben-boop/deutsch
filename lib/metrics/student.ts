import {
  getAttendanceHistoryRowsForStudent,
  getAttendanceRowsForStudent,
  getPracticeGradesForStudent,
  getPunctualityRowsForStudent,
  getStudentPointsForStudent,
  getWideGradesForStudent,
} from "./sources";

import type {
  AttendanceHistoryRow,
  AttendanceRow,
  GradeMetricSet,
  GradePoint,
  NormalizedWideGrades,
  PunctualityRow,
  StudentMetricContext,
  StudentMetrics,
  StudentMetricsWindows,
} from "./types";

const DEFAULT_WINDOWS: StudentMetricsWindows = {
  attendanceLastN: 3,
  punctualityLastN: 3,
  practicesLastN: 9,
};

function avg(nums: Array<number | null | undefined>): number | null {
  const clean = nums.filter(
    (n): n is number => typeof n === "number" && Number.isFinite(n)
  );
  if (!clean.length) return null;
  return clean.reduce((a, b) => a + b, 0) / clean.length;
}

function takeLastN<T>(arr: T[], n: number): T[] {
  if (!Array.isArray(arr) || n <= 0) return [];
  return arr.slice(-n);
}

function gradedOnly(grades: GradePoint[]): GradePoint[] {
  return grades.filter((g) => g.value != null);
}

function toNumberOrNull(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeToken(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function emptyGradeMetricSet(): GradeMetricSet {
  return {
    continua: null,
    sprechen: null,
    schreiben: null,
    horen: null,
    lesen: null,
    grammatik: null,
    integrador: null,
    total: null,
    overall: null,
  };
}

function computeGradeOverall(set: Omit<GradeMetricSet, "overall">): number | null {
  const direct = avg([set.continua, set.total]);
  if (direct != null) return direct;

  return avg([
    set.sprechen,
    set.schreiben,
    set.horen,
    set.lesen,
    set.grammatik,
    set.integrador,
  ]);
}

function mapWideGradeMetric(
  metricRaw: string
): Exclude<keyof GradeMetricSet, "overall"> | null {
  const token = normalizeToken(metricRaw);

  switch (token) {
    case "continua":
      return "continua";
    case "sprechen":
      return "sprechen";
    case "schreiben":
      return "schreiben";
    case "horen":
      return "horen";
    case "lesen":
      return "lesen";
    case "grammatik":
      return "grammatik";
    case "integrador":
      return "integrador";
    case "total":
      return "total";
    default:
      return null;
  }
}

function normalizeWideGradesForStudent(
  nivelActual: string | null | undefined,
  row: Record<string, unknown> | null
): NormalizedWideGrades | null {
  if (!nivelActual || !row) return null;

  const prefix = `${String(nivelActual)}_`.toLowerCase();
  const evaluations: Record<string, GradeMetricSet> = {};

  for (const [rawKey, rawValue] of Object.entries(row)) {
    if (typeof rawKey !== "string") continue;
    if (!rawKey.toLowerCase().startsWith(prefix)) continue;

    const remainder = rawKey.slice(prefix.length);
    const parts = remainder.split("_");

    if (parts.length < 2) continue;

    const evaluationKey = String(parts[0]).toUpperCase();
    const metricRaw = parts.slice(1).join("_");
    const metric = mapWideGradeMetric(metricRaw);

    if (!metric) continue;

    const value = toNumberOrNull(rawValue);

    if (!evaluations[evaluationKey]) {
      evaluations[evaluationKey] = emptyGradeMetricSet();
    }

    evaluations[evaluationKey][metric] = value;
  }

  const evalKeys = Object.keys(evaluations);
  if (!evalKeys.length) return null;

  for (const key of evalKeys) {
    const current = evaluations[key];
    current.overall = computeGradeOverall({
      continua: current.continua,
      sprechen: current.sprechen,
      schreiben: current.schreiben,
      horen: current.horen,
      lesen: current.lesen,
      grammatik: current.grammatik,
      integrador: current.integrador,
      total: current.total,
    });
  }

  const rollup: GradeMetricSet = {
    continua: avg(evalKeys.map((k) => evaluations[k].continua)),
    sprechen: avg(evalKeys.map((k) => evaluations[k].sprechen)),
    schreiben: avg(evalKeys.map((k) => evaluations[k].schreiben)),
    horen: avg(evalKeys.map((k) => evaluations[k].horen)),
    lesen: avg(evalKeys.map((k) => evaluations[k].lesen)),
    grammatik: avg(evalKeys.map((k) => evaluations[k].grammatik)),
    integrador: avg(evalKeys.map((k) => evaluations[k].integrador)),
    total: avg(evalKeys.map((k) => evaluations[k].total)),
    overall: avg(evalKeys.map((k) => evaluations[k].overall)),
  };

  return {
    currentLevelKey: nivelActual,
    evaluations,
    rollup,
  };
}

export async function buildStudentMetrics(
  ctx: StudentMetricContext,
  windows?: Partial<StudentMetricsWindows>
): Promise<StudentMetrics> {
  const w: StudentMetricsWindows = {
    ...DEFAULT_WINDOWS,
    ...windows,
  };

  const sourceErrors: string[] = [];

  const safe = async <T>(
    label: string,
    fn: () => Promise<T>,
    fallback: T
  ): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      sourceErrors.push(
        `${label} failed for student ${ctx.id}: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      return fallback;
    }
  };

  const [attendanceRows, punctualityRows, grades, points, wideGrades] =
    await Promise.all([
      safe("attendance", () => getAttendanceRowsForStudent(ctx), [] as AttendanceRow[]),
      safe("punctuality", () => getPunctualityRowsForStudent(ctx), [] as PunctualityRow[]),
      safe("practiceGrades", () => getPracticeGradesForStudent(ctx), [] as GradePoint[]),
      safe("studentPoints", () => getStudentPointsForStudent(ctx.id), null),
      safe("wideGrades", () => getWideGradesForStudent(ctx.id), null),
    ]);

  let attendanceHistoryRows: AttendanceHistoryRow[] = [];
  try {
    attendanceHistoryRows = await getAttendanceHistoryRowsForStudent(ctx.id);
  } catch (err) {
    sourceErrors.push(
      `attendanceHistory failed for student ${ctx.id}: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    attendanceHistoryRows = [];
  }

  const historyCurrentCourse =
    attendanceHistoryRows.find((r) => r.course_id === (ctx.resolvedCourseId ?? "")) ??
    null;

  const attendanceLastN = takeLastN<AttendanceRow>(attendanceRows, w.attendanceLastN);
  const punctualityLastN = takeLastN<PunctualityRow>(punctualityRows, w.punctualityLastN);

  const graded = gradedOnly(grades);
  const gradesLastN = takeLastN<GradePoint>(graded, w.practicesLastN);

  const formalGrades = normalizeWideGradesForStudent(
    ctx.nivelActual ?? null,
    wideGrades
  );

  return {
    meta: ctx,

    attendance: {
      rows: attendanceRows,
      lastN: attendanceLastN,
      avgPctAll: avg(attendanceRows.map((r) => r.attendance_pct)),
      avgPctLastN: avg(attendanceLastN.map((r) => r.attendance_pct)),
      historyRows: attendanceHistoryRows,
      historyCurrentCourse,
    },

    punctuality: {
      rows: punctualityRows,
      lastN: punctualityLastN,
      avgLateAll: avg(punctualityRows.map((r) => r.late_minutes)),
      avgLateLastN: avg(punctualityLastN.map((r) => r.late_minutes)),
      historyRows: attendanceHistoryRows,
      historyCurrentCourse,
    },

    practices: {
      grades,
      gradedOnly: graded,
      lastN: gradesLastN,
      avgAll: avg(graded.map((g) => g.value)),
      avgLastN: avg(gradesLastN.map((g) => g.value)),
      countAll: graded.length,
      countLastN: gradesLastN.length,
    },

    points,
    wideGrades,
    formalGrades,
    sourceErrors,
  };
}