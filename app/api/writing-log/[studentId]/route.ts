import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ studentId: string }> }
) {
  const { studentId } = await context.params;
  const id = Number(studentId);

  if (isNaN(id))
    return NextResponse.json({ ok: false, error: "Invalid studentId" }, { status: 400 });

  const logs = await prisma.writingLog.findMany({
    where: { studentId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ ok: true, logs });
}
