import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await readSessionFromHeaders();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("student_id");

    if (!studentId) {
      return NextResponse.json({ error: "Missing student_id" }, { status: 400 });
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
      `?action=history` +
      `&student_id=${encodeURIComponent(studentId)}`;

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
      : Array.isArray(raw.history_records)
      ? raw.history_records
      : [];

    const out = rows.map((r) => ({
      student_id: Number(r.student_id),
      full_name: String(r.full_name || ""),
      course_id: String(r.course_id || ""),
      attendance_real_pct:
        r.attendance_real_pct == null ? null : Number(r.attendance_real_pct),
      minutes_attended_total:
        r.minutes_attended_total == null ? null : Number(r.minutes_attended_total),
      minutes_possible_total:
        r.minutes_possible_total == null ? null : Number(r.minutes_possible_total),
      institutional_attended:
        r.institutional_attended == null ? null : Number(r.institutional_attended),
      institutional_possible:
        r.institutional_possible == null ? null : Number(r.institutional_possible),
      absences: r.absences == null ? null : Number(r.absences),
      avg_late_minutes:
        r.avg_late_minutes == null ? null : Number(r.avg_late_minutes),
      measured_sessions_count:
        r.measured_sessions_count == null ? null : Number(r.measured_sessions_count),
      consolidated_at: String(r.consolidated_at || ""),
    }));

    return NextResponse.json(out);
  } catch (err) {
    console.error("ATTENDANCE HISTORY API ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}