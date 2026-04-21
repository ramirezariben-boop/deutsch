import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GS_GRADES_ENDPOINT = process.env.GS_GRADES_ENDPOINT;

export async function GET(req: Request) {
  try {
    const session = await readSessionFromHeaders();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = Number(searchParams.get("studentId"));

    if (!Number.isFinite(studentId)) {
      return NextResponse.json({ error: "studentId inválido" }, { status: 400 });
    }

    if (Number(session.uid) !== studentId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!GS_GRADES_ENDPOINT) {
      return NextResponse.json(
        { error: "Falta GS_GRADES_ENDPOINT" },
        { status: 500 }
      );
    }

    const url =
      `${GS_GRADES_ENDPOINT}?mode=studentPoints&studentId=${studentId}`;

    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}