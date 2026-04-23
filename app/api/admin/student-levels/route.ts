import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";
import type { DayCode, StudentMetricContext } from "@/lib/metrics/types";
import { resolveStudentLevelForContext } from "@/lib/levels/resolveStudentLevelForContext";
import { prisma } from "@/lib/prisma";

function toPositiveInt(value: string | null, fallback: number) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function parseDay(value: unknown): DayCode | null {
  return value === "SAM" || value === "SON" || value === "PRIV" ? value : null;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await readSessionFromHeaders();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ajusta esta validación a tu sistema real
  if (session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as {
    studentIds?: number[];
    attendanceLastN?: number;
    punctualityLastN?: number;
    practicesLastN?: number;
  };

  const ids = Array.isArray(body.studentIds)
    ? body.studentIds
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n > 0)
    : [];

  if (!ids.length) {
    return NextResponse.json({ error: "studentIds is required" }, { status: 400 });
  }

  const attendanceLastN = Number.isInteger(body.attendanceLastN) && body.attendanceLastN! > 0
    ? body.attendanceLastN!
    : 3;

  const punctualityLastN = Number.isInteger(body.punctualityLastN) && body.punctualityLastN! > 0
    ? body.punctualityLastN!
    : 3;

  const practicesLastN = Number.isInteger(body.practicesLastN) && body.practicesLastN! > 0
    ? body.practicesLastN!
    : 9;

  const users = await prisma.user.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      nivelActual: true,
      currentCourseId: true,
      isCurrent: true,
      day: true,
      privCode: true,
      name: true,
      points: true,
    },
  });

  const contexts: StudentMetricContext[] = users.map((u) => ({
    id: u.id,
    nivelActual: u.nivelActual ?? null,
    resolvedCourseId: u.currentCourseId ?? null,
    isCurrent: u.isCurrent ?? false,
    day: parseDay(u.day),
    privCode: u.privCode ?? null,
  }));

  const settled = await Promise.allSettled(
    contexts.map((ctx) =>
      resolveStudentLevelForContext(ctx, {
        attendanceLastN,
        punctualityLastN,
        practicesLastN,
      })
    )
  );

  const rows = settled.map((result, index) => {
    const user = users[index];
    const ctx = contexts[index];

    if (result.status === "fulfilled") {
      return {
        id: user.id,
        name: user.name,
        nivelActual: ctx.nivelActual,
        resolvedCourseId: ctx.resolvedCourseId,
        isCurrent: ctx.isCurrent,
        day: ctx.day,
        privCode: ctx.privCode,
        points: user.points ?? null,
        level: result.value.level,
      };
    }

    return {
      id: user.id,
      name: user.name,
      nivelActual: ctx.nivelActual,
      resolvedCourseId: ctx.resolvedCourseId,
      isCurrent: ctx.isCurrent,
      day: ctx.day,
      privCode: ctx.privCode,
      points: user.points ?? null,
      level: null,
      error:
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason),
    };
  });

  return NextResponse.json({
    rows,
  });
}