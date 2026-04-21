import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";
import { buildStudentMetrics } from "@/lib/metrics/student";
import type { DayCode } from "@/lib/metrics/types";

function toPositiveInt(value: string | null, fallback: number) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function parseDay(value: unknown): DayCode | null {
  return value === "SAM" || value === "SON" || value === "PRIV" ? value : null;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await readSessionFromHeaders();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const attendanceLastN = toPositiveInt(searchParams.get("attendanceLastN"), 3);
  const punctualityLastN = toPositiveInt(searchParams.get("punctualityLastN"), 3);
  const practicesLastN = toPositiveInt(searchParams.get("practicesLastN"), 9);

  const metrics = await buildStudentMetrics(
    {
      id: Number(session.uid),
      nivelActual: session.nivelActual ?? null,
      resolvedCourseId: session.resolvedCourseId ?? null,
      isCurrent: session.isCurrent ?? false,
      day: parseDay(session.day),
      privCode: session.privCode ?? null,
    },
    {
      attendanceLastN,
      punctualityLastN,
      practicesLastN,
    }
  );

  return NextResponse.json(metrics);
}