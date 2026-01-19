// app/api/writing-log/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const studentId = Number(new URL(req.url).searchParams.get("studentId"));
  const since = Number(new URL(req.url).searchParams.get("since") ?? 0);

  if (!studentId)
    return NextResponse.json({ ok: false }, { status: 400 });

  const logs = await prisma.writingLog.findMany({
    where: {
      studentId,
      id: { gt: since },
    },
    orderBy: { id: "asc" },
  });

  return NextResponse.json({ ok: true, logs });
}
