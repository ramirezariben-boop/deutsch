import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const lastLog = await prisma.externalWritingLog.findFirst({
      where: {
        studentId,
        event: "typing"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!lastLog) {
      return NextResponse.json({ ok: true, text: "" });
    }

    const parsed =
      typeof lastLog.data === "string"
        ? JSON.parse(lastLog.data)
        : lastLog.data;

    return NextResponse.json({
      ok: true,
      text: parsed?.text || ""
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}