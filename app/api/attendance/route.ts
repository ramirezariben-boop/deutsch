// app/api/attendance/route.ts
import { NextResponse } from "next/server";

const SESSIONS = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(n =>
  ["A", "B", "C"].map(p => `${n}${p}`)
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const course = searchParams.get("course");
  const classId = searchParams.get("class");
  const studentId = searchParams.get("student_id");

  if (!course || !classId || !studentId) {
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    );
  }

  const SHEETS_ENDPOINT = process.env.GS_ATTENDANCE_ENDPOINT!;

  const res = await fetch(
    `${SHEETS_ENDPOINT}?course=${course}&class=${classId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Sheets fetch failed" },
      { status: 500 }
    );
  }

  const rows = await res.json();

  // 👇 mapa base: todo en null
  const attendance: Record<string, number | null> = {};
  for (const s of SESSIONS) attendance[s] = null;

  // 👇 rellenamos solo lo que exista para el alumno
  for (const r of rows) {
    if (Number(r.student_id) === Number(studentId)) {
      const key = `${r.session_id}`; // ej. "1A"
      attendance[key] = Number(r.attendance_pct);
    }
  }

  return NextResponse.json({ attendance });
}
