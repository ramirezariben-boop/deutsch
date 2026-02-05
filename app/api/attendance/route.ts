// app/api/attendance/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const course = searchParams.get("course");
    const studentId = searchParams.get("student_id");
    // class es opcional: si viene, filtra; si no, trae todo el curso
    const classId = searchParams.get("class");

    if (!course || !studentId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const SHEETS_ENDPOINT = process.env.GS_ATTENDANCE_ENDPOINT;
    if (!SHEETS_ENDPOINT) {
      return NextResponse.json(
        { error: "Missing GS_ATTENDANCE_ENDPOINT" },
        { status: 500 }
      );
    }

    const url =
      `${SHEETS_ENDPOINT}?course=${encodeURIComponent(course)}` +
      `&student_id=${encodeURIComponent(studentId)}` +
      (classId ? `&class=${encodeURIComponent(classId)}` : "");

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Sheets fetch failed" },
        { status: 500 }
      );
    }

    const raw = await res.json();

    // raw debe ser array según el apps script (si no, normalizamos)
    const rows: any[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.data)
      ? raw.data
      : Array.isArray(raw.attendance_records)
      ? raw.attendance_records
      : [];

    // Normaliza tipos
const out = rows.map((r) => ({
  student_id: Number(r.student_id),
  class_id: String(r.class_id),
  session_id: String(r.session_id).toUpperCase(),
  attendance_pct:
    r.attendance_pct === null || r.attendance_pct === undefined
      ? null
      : Number(r.attendance_pct),
  minutes_attended:
    r.minutes_attended === null || r.minutes_attended === undefined
      ? null
      : Number(r.minutes_attended),
  max_minutes:
    r.max_minutes === null || r.max_minutes === undefined
      ? null
      : Number(r.max_minutes),
}));


    return NextResponse.json(out);
  } catch (err) {
    console.error("ATTENDANCE API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
