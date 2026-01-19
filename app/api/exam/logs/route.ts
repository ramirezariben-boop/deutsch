import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const studentId = Number(new URL(req.url).searchParams.get("studentId"));
    if (!studentId) return NextResponse.json({ ok: false, error: "studentId requerido" }, { status: 400 });

    const logs = await prisma.writingLog.findMany({
      where: { studentId },
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ ok: true, logs });
  } catch (err) {
    console.error("ERROR /api/exam/logs:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
