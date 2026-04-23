import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { resolveStudentLevelForContext } from "@/lib/levels/resolveStudentLevelForContext";
import type { AdminStudentLevelRow } from "@/lib/levels/types";
import type { DayCode, StudentMetricContext } from "@/lib/metrics/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RecomputeBody = {
  courseId?: string;
  day?: DayCode;
  privCode?: string | null;
  studentIds?: number[];
  persistToCt?: boolean;
};

type CtRosterRow = {
  id: number;
  name: string | null;
  nivelActual: string | null;
  resolvedCourseId: string | null;
  isCurrent: boolean;
  day: DayCode | null;
  privCode: string | null;
  points: number | null;
  level?: number | null;
  levelUpdatedAt?: string | null;
};

function parseDay(value: unknown): DayCode | null {
  return value === "SAM" || value === "SON" || value === "PRIV" ? value : null;
}

async function fetchRosterFromCt(args: {
  courseId?: string;
  day?: DayCode | null;
  privCode?: string | null;
  studentIds?: number[];
}) {
  const baseUrl =
    process.env.CT_BASE_URL || "https://classroom-trading.ariiben.com";
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    throw new Error("Falta INTERNAL_API_SECRET");
  }

  const res = await fetch(`${baseUrl}/api/internal/roster-for-levels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CT roster error: ${text}`);
  }

  return (await res.json()) as {
    ok: boolean;
    rows: CtRosterRow[];
  };
}

async function pushLevelsToCt(rows: AdminStudentLevelRow[]) {
  const baseUrl =
    process.env.CT_BASE_URL || "https://classroom-trading.ariiben.com";
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    throw new Error("Falta INTERNAL_API_SECRET");
  }

  const payload = {
    rows: rows
      .filter((r) => r.level && !r.error)
      .map((r) => ({
        id: r.id,
        level: r.level!.currentLevel,
        levelUpdatedAt: r.levelUpdatedAt ?? new Date().toISOString(),
        levelMeta: {
          resolvedInput: r.level!.resolvedInput,
          nextLevel: r.level!.next?.level ?? null,
          missing: r.level!.next?.missing.map((m) => m.key) ?? [],
        },
      })),
  };

  const res = await fetch(`${baseUrl}/api/internal/users/update-levels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CT persist error: ${text}`);
  }

  return await res.json();
}

export async function POST(req: Request) {
  const admin = await requireAdmin();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await req.json()) as RecomputeBody;
    const day = parseDay(body.day);

    const roster = await fetchRosterFromCt({
      courseId: body.courseId,
      day,
      privCode: body.privCode ?? null,
      studentIds: body.studentIds,
    });

    const contexts: Array<
      StudentMetricContext & {
        name: string | null;
        points: number | null;
      }
    > = roster.rows.map((row) => ({
      id: row.id,
      name: row.name,
      points: row.points,
      nivelActual: row.nivelActual ?? null,
      resolvedCourseId: row.resolvedCourseId ?? null,
      isCurrent: row.isCurrent ?? false,
      day: row.day ?? null,
      privCode: row.privCode ?? null,
    }));

    const settled = await Promise.allSettled(
      contexts.map(async (ctx) => {
        const data = await resolveStudentLevelForContext(
          {
            id: ctx.id,
            nivelActual: ctx.nivelActual,
            resolvedCourseId: ctx.resolvedCourseId,
            isCurrent: ctx.isCurrent,
            day: ctx.day,
            privCode: ctx.privCode,
          },
          {
            attendanceLastN: 3,
            punctualityLastN: 3,
            practicesLastN: 9,
          }
        );

        const nowIso = new Date().toISOString();

        const row: AdminStudentLevelRow = {
          id: ctx.id,
          name: ctx.name,
          nivelActual: ctx.nivelActual,
          resolvedCourseId: ctx.resolvedCourseId,
          isCurrent: ctx.isCurrent,
          day: ctx.day,
          privCode: ctx.privCode,
          points: ctx.points,
          level: data.level,
          levelUpdatedAt: nowIso,
        };

        return row;
      })
    );

    const rows: AdminStudentLevelRow[] = settled.map((result, index) => {
      const ctx = contexts[index];

      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        id: ctx.id,
        name: ctx.name,
        nivelActual: ctx.nivelActual,
        resolvedCourseId: ctx.resolvedCourseId,
        isCurrent: ctx.isCurrent,
        day: ctx.day,
        privCode: ctx.privCode,
        points: ctx.points,
        level: null,
        levelUpdatedAt: null,
        error:
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason),
      };
    });

    if (body.persistToCt) {
      await pushLevelsToCt(rows);
    }

    return NextResponse.json({
      ok: true,
      updated: rows.filter((r) => r.level && !r.error).length,
      rows,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}