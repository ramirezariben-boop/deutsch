// app/api/attendance/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const course = searchParams.get("course");
  const classId = searchParams.get("class");

  if (!course || !classId) {
    return NextResponse.json(
      { error: "Missing course or class" },
      { status: 400 }
    );
  }

  const SHEETS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwJam0sU8yFZ6myTJL3yGbcnkx2Ft8HXcvyXU1Ij_3ArNtivRT3sP-FSrMsz-y2YeGBMw/exec";

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

  const data = await res.json();
  return NextResponse.json(data);
}
