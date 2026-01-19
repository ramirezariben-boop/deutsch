import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.writingExam.findMany();
    const logs = await prisma.writingLog.findMany();

    return NextResponse.json({ ok: true, exams, logs });
  } catch (err) {
    console.error("Error en panel profesor:", err);
    return NextResponse.json({ ok: false, error: "Error interno." });
  }
}
