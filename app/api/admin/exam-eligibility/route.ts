import { NextResponse } from "next/server";

const COURSE_ID = "2026_1";

const students = [
  81, 82, 83, 84, 85, 41, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  54, 101, 102, 103, 104, 105, 57, 107, 59, 111, 112, 113, 114, 115, 116, 7,
  63, 119, 120, 121, 122, 123, 23, 125, 126, 127, 128, 129, 130, 131,
];

function weight(session: "A" | "B" | "C") {
  return session === "A" ? 0.5 : 0.25;
}

function attended(r: any) {
  const pct =
    r.attendance_pct ??
    (r.max_minutes > 0 && r.minutes_attended != null
      ? (Number(r.minutes_attended) / Number(r.max_minutes)) * 100
      : 0);

  return Number(pct) >= 50;
}

export async function GET(req: Request) {
  try {
    const origin = new URL(req.url).origin;

    const promises = students.map(async (studentId) => {
      const url =
        `${origin}/api/attendance` +
        `?course_id=${encodeURIComponent(COURSE_ID)}` +
        `&student_id=${encodeURIComponent(String(studentId))}`;

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        console.error(`attendance failed for ${studentId}:`, res.status);
        return null;
      }

      const rows = await res.json();

      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      let instAttended = 0;
      let instPossible = 0;

      for (const r of rows) {
        const session = String(r.session_id).toUpperCase() as "A" | "B" | "C";
        const w = weight(session);
        instPossible += w;
        if (attended(r)) instAttended += w;
      }

      instAttended = +instAttended.toFixed(2);
      instPossible = +instPossible.toFixed(2);

      const absences = +(instPossible - instAttended).toFixed(2);

      return {
        studentId,
        absences,
        eligible: absences <= 2
      };

    });

    const result = (await Promise.all(promises)).filter(Boolean);

    return NextResponse.json(result);
  } catch (err) {
    console.error("EXAM ELIGIBILITY ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}