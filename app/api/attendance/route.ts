// app/api/attendance/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const courseId = searchParams.get("course_id");
    const studentId = searchParams.get("student_id");
    const classId = searchParams.get("class"); // opcional

    if (!courseId || !studentId) {
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
      `${SHEETS_ENDPOINT}` +
      `?course=${encodeURIComponent(courseId)}` +
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

    const rows: any[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.data)
      ? raw.data
      : Array.isArray(raw.attendance_records)
      ? raw.attendance_records
      : [];

    const out = rows.map((r) => ({
      student_id: Number(r.student_id),
      class_id: String(r.class_id),
      session_id: String(r.session_id).toUpperCase(),
      attendance_pct:
        r.attendance_pct == null ? null : Number(r.attendance_pct),
      minutes_attended:
        r.minutes_attended == null ? null : Number(r.minutes_attended),
      max_minutes:
        r.max_minutes == null ? null : Number(r.max_minutes),
    }));

    return NextResponse.json(out);
  } catch (err) {
    console.error("ATTENDANCE API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
