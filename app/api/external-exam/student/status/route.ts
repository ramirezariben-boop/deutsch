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

    const exam = await prisma.externalWritingExam.findFirst({
      where: { studentId }
    });

    return NextResponse.json({
      ok: true,
      submitted: !!exam
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}