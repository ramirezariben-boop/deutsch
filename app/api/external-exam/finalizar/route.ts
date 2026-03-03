import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { studentId, text } = await req.json();

    if (!studentId || typeof text !== "string") {
      return NextResponse.json(
        { ok: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const exam = await prisma.externalWritingExam.findFirst({
      where: { studentId }
    });

    if (!exam) {
      return NextResponse.json(
        { ok: false, error: "Examen no iniciado" },
        { status: 400 }
      );
    }

    if (exam.submittedAt) {
      return NextResponse.json(
        { ok: false, error: "Examen ya entregado" },
        { status: 400 }
      );
    }

    // 🔐 VALIDACIÓN REAL DE TIEMPO
    const elapsedSeconds =
      (Date.now() - new Date(exam.startedAt).getTime()) / 1000;

    const remaining =
      exam.durationMinutes * 60 - Math.floor(elapsedSeconds);

    if (remaining <= 0) {
      // Marcar como expirado
      await prisma.externalWritingExam.update({
        where: { id: exam.id },
        data: {
          submittedAt: new Date(),
          textFinal: text // opcional: guardar lo último que llegó
        }
      });

      return NextResponse.json({
        ok: false,
        error: "Tiempo expirado"
      });
    }

    // 🔎 Obtener logs
    const logs = await prisma.externalWritingLog.findMany({
      where: { studentId }
    });

    let pasteCount = 0;
    let blurCount = 0;
    let longPaste = 0;

    logs.forEach(l => {
      if (l.event === "paste") {
        pasteCount++;
      }

      if (l.event === "blur_duration") {
        blurCount++;
      }

      if (l.event === "jump_detected") {
        longPaste++;
      }
    });

    const suspicionScore =
      pasteCount * 5 +
      longPaste * 15 +
      blurCount * 2;

    const wordCount =
      text.trim().length > 0
        ? text.trim().split(/\s+/).length
        : 0;

    const charCount = text.length;

    await prisma.externalWritingExam.update({
      where: { id: exam.id },
      data: {
        textFinal: text,
        wordCount,
        charCount,
        suspicionScore,
        submittedAt: new Date(),
	expired: false,
   	submittedBy: "manual",
      }
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}