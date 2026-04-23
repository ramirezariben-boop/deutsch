import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";
import { postEmotionalCheckIn } from "@/lib/sheets/emotionalCheckins";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await readSessionFromHeaders();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { confidence, motivation, frustration, reflection, triggeredBy } = body;

    if (
      typeof confidence !== "number" ||
      typeof motivation !== "number" ||
      typeof frustration !== "number"
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await postEmotionalCheckIn({
      studentId: session.uid,
      courseId: session.resolvedCourseId ?? "",
      triggeredBy: triggeredBy ?? "manual",
      confidence,
      motivation,
      frustration,
      reflection: reflection ?? "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("EMOTIONAL CHECKIN ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
