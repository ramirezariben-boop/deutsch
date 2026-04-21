import { NextResponse } from "next/server";
import { buildGroupMetricsAverage } from "@/lib/metrics/group";
import type {
  DayCode,
  MetricsMode,
  StudentMetricContext,
} from "@/lib/metrics/types";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

function toPositiveInt(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function parseMode(value: unknown): MetricsMode {
  return value === "history_fallback" ? "history_fallback" : "raw_only";
}

function parseDay(value: unknown): DayCode | null {
  if (value === "SAM" || value === "SON" || value === "PRIV") return value;
  return null;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!INTERNAL_SECRET || authHeader !== `Bearer ${INTERNAL_SECRET}`) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const students = Array.isArray(body?.students)
    ? (body.students as StudentMetricContext[])
    : [];

  if (!students.length) {
    return NextResponse.json({ error: "Missing students" }, { status: 400 });
  }

  const result = await buildGroupMetricsAverage({
    students,
    mode: parseMode(body?.mode),
    windows: {
      attendanceLastN: toPositiveInt(body?.windows?.attendanceLastN, 3),
      punctualityLastN: toPositiveInt(body?.windows?.punctualityLastN, 3),
      practicesLastN: toPositiveInt(body?.windows?.practicesLastN, 9),
    },
    context: {
      nivelActual: body?.context?.nivelActual ?? null,
      day: parseDay(body?.context?.day),
      privCode: body?.context?.privCode ?? null,
    },
  });

  return NextResponse.json(result);
}