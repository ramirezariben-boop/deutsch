import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { DayCode } from "@/lib/metrics/types";
import { resolveStudentLevelForContext } from "@/lib/levels/resolveStudentLevelForContext";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;
const CLASSROOM_TRADING_URL =
  process.env.CLASSROOM_TRADING_URL || "https://classroom-trading.ariiben.com";

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

    const students = await prisma.user.findMany({
      where: {
        isCurrent: true,
        resolvedCourseId: courseId,
        day: { in: ["SAM", "SON", "PRIV"] },
      },
      select: {
        id: true,
        nivelActual: true,
        resolvedCourseId: true,
        isCurrent: true,
        day: true,
        privCode: true,
      },
      orderBy: { id: "asc" },
    });

    if (!students.length) {
      return NextResponse.json({
        ok: true,
        pushed: 0,
        message: "No matching students for this course",
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

      const attendanceAvg =
        data?.core?.attendancePctLastN?.avg ??
        data?.averages?.attendancePctLastN ??
        null;

      const attendanceCount =
        data?.core?.attendancePctLastN?.count ??
        data?.counts?.attendancePctLastN ??
        0;

      const lateAvg =
        data?.core?.lateMinutesLastN?.avg ??
        data?.averages?.lateMinutesLastN ??
        null;

      const lateCount =
        data?.core?.lateMinutesLastN?.count ??
        data?.counts?.lateMinutesLastN ??
        0;

      if (typeof attendanceAvg === "number") {
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

      if (typeof lateAvg === "number") {
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
        pushed: 0,
        message: "No attendance/punctuality rows to push",
      });
    }

    const ctRes = await fetch(
      `${CLASSROOM_TRADING_URL}/api/internal/student-metrics/upsert`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${INTERNAL_SECRET}`,
        },
        body: JSON.stringify({ rows }),
        cache: "no-store",
      }
    );

    const ctJson = await ctRes.json().catch(() => ({}));

    if (!ctRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "CT push failed",
          details: ctJson,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      students: students.length,
      rowsBuilt: rows.length,
      ct: ctJson,
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
