// app/api/attendance/route.ts
import { NextResponse } from "next/server";

const SESSIONS = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(n =>
  ["A", "B", "C"].map(p => `${n}${p}`)
);

export async function GET(req: Request) {
  try {
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

    const SHEETS_ENDPOINT = process.env.GS_ATTENDANCE_ENDPOINT;
    if (!SHEETS_ENDPOINT) {
      return NextResponse.json(
        { error: "Missing GS_ATTENDANCE_ENDPOINT" },
        { status: 500 }
      );
    }

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

    const raw = await res.json();

    // 🔑 AQUÍ ESTABA EL PROBLEMA
    const rows: any[] =
      Array.isArray(raw) ? raw :
      Array.isArray(raw.attendance_records) ? raw.attendance_records :
      Array.isArray(raw.data) ? raw.data :
      [];

    // 🧱 Mapa base: todo null
    const attendance: Record<string, number | null> = {};
    for (const s of SESSIONS) attendance[s] = null;

    // 🧠 Rellenamos solo lo que exista para el alumno
    for (const r of rows) {
      if (Number(r.student_id) === Number(studentId)) {
        const key = String(r.session_id); // ej "1A"
        attendance[key] =
          r.attendance_pct === null ? null : Number(r.attendance_pct);
      }
    }

    return NextResponse.json({ attendance });

  } catch (err) {
    console.error("ATTENDANCE API ERROR:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
