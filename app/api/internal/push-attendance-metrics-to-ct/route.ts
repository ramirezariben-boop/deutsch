import { NextResponse } from "next/server";
import type { DayCode } from "@/lib/metrics/types";
import { resolveStudentLevelForContext } from "@/lib/levels/resolveStudentLevelForContext";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;
const CLASSROOM_TRADING_URL =
  process.env.CLASSROOM_TRADING_URL || "https://classroom-trading.ariiben.com";

type CtRosterStudent = {
  id: number;
  nivelActual?: string | null;
  isCurrent?: boolean;
  day?: "SAM" | "SON" | "PRIV" | null;
  privCode?: string | null;
  resolvedCourseId?: string | null;
};

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function toPositiveInt(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function parseDay(value: unknown): DayCode | null {
  return value === "SAM" || value === "SON" || value === "PRIV" ? value : null;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!INTERNAL_SECRET || authHeader !== `Bearer ${INTERNAL_SECRET}`) {
    return unauthorized();
  }

  try {
    const body = await req.json().catch(() => ({}));

    const classId = String(body?.classId || "").trim();
    const courseId = String(body?.courseId || "").trim();

    const attendanceLastN = toPositiveInt(body?.attendanceLastN, 3);
    const punctualityLastN = toPositiveInt(body?.punctualityLastN, 3);
    const practicesLastN = toPositiveInt(body?.practicesLastN, 9);

    if (!classId || !courseId) {
      return NextResponse.json(
        { error: "classId and courseId are required" },
        { status: 400 }
      );
    }

    const rosterRes = await fetch(
      `${CLASSROOM_TRADING_URL}/api/internal/roaster/current?onlyCurrent=true&includeResolvedCourseId=true&minimal=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${INTERNAL_SECRET}`,
        },
        cache: "no-store",
      }
    );

    const rosterText = await rosterRes.text();
    let rosterJson: any = null;

    try {
      rosterJson = rosterText ? JSON.parse(rosterText) : null;
    } catch {
      rosterJson = null;
    }

    if (!rosterRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `CT roster failed with status ${rosterRes.status}`,
          details: rosterText.slice(0, 500),
        },
        { status: 502 }
      );
    }

    if (!rosterJson?.ok || !Array.isArray(rosterJson?.roster)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid CT roster response",
          details: rosterJson ?? rosterText,
        },
        { status: 502 }
      );
    }

    const students: CtRosterStudent[] = rosterJson.roster
      .map((row: any) => ({
        id: Number(row.id),
        nivelActual: row.nivelActual ?? null,
        isCurrent: row.isCurrent ?? false,
        day: row.day ?? null,
        privCode: row.privCode ?? null,
        resolvedCourseId: row.resolvedCourseId ?? null,
      }))
      .filter(
        (student: CtRosterStudent) =>
          Number.isInteger(student.id) &&
          student.id > 0 &&
          String(student.resolvedCourseId || "") === courseId
      );

    if (!students.length) {
      return NextResponse.json({
        ok: true,
        students: 0,
        rowsBuilt: 0,
        message: `No current CT students matched resolvedCourseId=${courseId}`,
      });
    }

    const measuredAt = new Date().toISOString();
    const rows: Array<Record<string, unknown>> = [];

    for (const student of students) {
      const data = await resolveStudentLevelForContext(
        {
          id: student.id,
          nivelActual: student.nivelActual ?? null,
          resolvedCourseId: student.resolvedCourseId ?? null,
          isCurrent: student.isCurrent ?? false,
          day: parseDay(student.day),
          privCode: student.privCode ?? null,
        },
        {
          attendanceLastN,
          punctualityLastN,
          practicesLastN,
        }
      );

      const attendanceAvg = data?.attendance?.avgPctLastN ?? null;
      const attendanceCount =
        data?.attendance?.lastN?.filter(
          (row) => typeof row.attendance_pct === "number"
        ).length ?? 0;

      const lateAvg = data?.punctuality?.avgLateLastN ?? null;
      const lateCount =
        data?.punctuality?.lastN?.filter(
          (row) => typeof row.late_minutes === "number"
        ).length ?? 0;

      if (typeof attendanceAvg === "number" && Number.isFinite(attendanceAvg)) {
        rows.push({
          studentId: student.id,
          factorKey: "attendance_pct_last_n",
          factorLabel: "Asistencia",
          value: attendanceAvg,
          count: attendanceCount,
          mode: "raw_only",
          nivelActual: student.nivelActual ?? null,
          day: parseDay(student.day),
          privCode: student.privCode ?? null,
          measuredAt,
          meta: {
            source: "attendance_upload",
            classId,
            courseId,
            attendanceLastN,
          },
        });
      }

      if (typeof lateAvg === "number" && Number.isFinite(lateAvg)) {
        rows.push({
          studentId: student.id,
          factorKey: "late_minutes_last_n",
          factorLabel: "Puntualidad",
          value: lateAvg,
          count: lateCount,
          mode: "raw_only",
          nivelActual: student.nivelActual ?? null,
          day: parseDay(student.day),
          privCode: student.privCode ?? null,
          measuredAt,
          meta: {
            source: "attendance_upload",
            classId,
            courseId,
            punctualityLastN,
          },
        });
      }
    }

    if (!rows.length) {
      return NextResponse.json({
        ok: true,
        students: students.length,
        rowsBuilt: 0,
        message: "No attendance/punctuality metrics were produced",
      });
    }

    const ctPushRes = await fetch(
      `${CLASSROOM_TRADING_URL}/api/internal/student-metrics/upsert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${INTERNAL_SECRET}`,
        },
        body: JSON.stringify({ rows }),
        cache: "no-store",
      }
    );

    const ctPushText = await ctPushRes.text();
    let ctPushJson: any = null;

    try {
      ctPushJson = ctPushText ? JSON.parse(ctPushText) : null;
    } catch {
      ctPushJson = null;
    }

    if (!ctPushRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `CT metrics upsert failed with status ${ctPushRes.status}`,
          details: ctPushJson ?? ctPushText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      students: students.length,
      rowsBuilt: rows.length,
      ct: ctPushJson ?? ctPushText,
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
