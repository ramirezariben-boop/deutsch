//app/api/attendance/route.ts
import { NextResponse } from "next/server";

const SESSIONS = Array.from({ length: 8 }, (_, i) => i + 1).flatMap((n) =>
  ["A", "B", "C"].map((p) => `${n}${p}`)
);

function classToSessionNumber(classId: string): number | null {
  // "2026_2_01" -> 1
  const m = classId.match(/_(\d{2})$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n < 1 || n > 8) return null;
  return n;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const course = searchParams.get("course");
    const classId = searchParams.get("class");
    const studentId = searchParams.get("student_id");

    if (!course || !classId || !studentId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const sessionNum = classToSessionNumber(classId);
    if (!sessionNum) {
      return NextResponse.json(
        { error: "Invalid class format (expected ..._01 to ..._08)" },
        { status: 400 }
      );
    }

    const SHEETS_ENDPOINT = process.env.GS_ATTENDANCE_ENDPOINT;
    if (!SHEETS_ENDPOINT) {
      return NextResponse.json(
        { error: "Missing GS_ATTENDANCE_ENDPOINT" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `${SHEETS_ENDPOINT}?course=${encodeURIComponent(course)}&class=${encodeURIComponent(classId)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Sheets fetch failed" }, { status: 500 });
    }

    const raw = await res.json();

    // normaliza formato de respuesta
    const rows: any[] =
      Array.isArray(raw)
        ? raw
        : Array.isArray(raw.attendance_records)
        ? raw.attendance_records
        : Array.isArray(raw.data)
        ? raw.data
        : [];

    // mapa base: 1A..8C en null
    const attendance: Record<string, number | null> = {};
    for (const s of SESSIONS) attendance[s] = null;

    // rellena SOLO la sesión que corresponde a esa class (01->1, 02->2, etc.)
    for (const r of rows) {
      if (Number(r.student_id) !== Number(studentId)) continue;

      // en tu GS: r.session_id es "A" | "B" | "C"
      const part = String(r.session_id).toUpperCase(); // "A"
      if (part !== "A" && part !== "B" && part !== "C") continue;

      const key = `${sessionNum}${part}`; // "1A"
      const pct =
        r.attendance_pct === null || r.attendance_pct === undefined
          ? null
          : Number(r.attendance_pct);

      attendance[key] = Number.isFinite(pct as number) ? (pct as number) : null;
    }

    return NextResponse.json({ attendance, meta: { course, classId, sessionNum } });
  } catch (err) {
    console.error("ATTENDANCE API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
