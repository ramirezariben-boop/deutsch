import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const studentId = new URL(req.url).searchParams.get("studentId");

    const exams = await prisma.writingExam.findMany({
      where: studentId ? { studentId: Number(studentId) } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, exams });
  } catch (err) {
    console.error("Error en /api/exam/list:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
