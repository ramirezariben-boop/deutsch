import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const studentId = Number(new URL(req.url).searchParams.get("studentId"));
    if (!studentId) return NextResponse.json({ ok: false, error: "studentId requerido" }, { status: 400 });

    const exam = await prisma.writingExam.findFirst({
      where: { studentId },
      select: { id: true },
    });

    if (!exam) return NextResponse.json({ ok: false, error: "Examen no encontrado" }, { status: 404 });

    const events = await prisma.cheatingEvent.findMany({
      where: { examId: exam.id },
      orderBy: { timestamp: "asc" },
    });

    return NextResponse.json({ ok: true, events });
  } catch (err) {
    console.error("ERROR /api/exam/events:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
