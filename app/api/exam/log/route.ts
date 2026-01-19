import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { studentId, event, data } = await request.json();

  if (!studentId || !event)
    return NextResponse.json({ ok: false, error: "Missing studentId or event" }, { status: 400 });

  await prisma.writingLog.create({
    data: {
      studentId: Number(studentId),
      event,
      data: data ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
