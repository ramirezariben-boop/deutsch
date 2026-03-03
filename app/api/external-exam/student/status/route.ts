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

    const DURATION_MINUTES = 30;

let exam = await prisma.externalWritingExam.findUnique({
  where: { studentId }
});

    // 🆕 Si no existe, crear sesión
    if (!exam) {
      exam = await prisma.externalWritingExam.create({
        data: {
          studentId,
          startedAt: new Date(),
          durationMinutes: DURATION_MINUTES
        }
      });

      return NextResponse.json({
        ok: true,
        submitted: false,
        remainingSeconds: DURATION_MINUTES * 60
      });
    }

    // 🛑 Si ya fue entregado
    if (exam.submittedAt) {
      return NextResponse.json({
        ok: true,
        submitted: true,
        remainingSeconds: 0
      });
    }

    // 🔐 Cálculo real de tiempo
    const elapsedSeconds =
      (Date.now() - new Date(exam.startedAt).getTime()) / 1000;

    const remaining =
      exam.durationMinutes * 60 - Math.floor(elapsedSeconds);

    // ⏰ Si el tiempo ya expiró
    if (remaining <= 0 && !exam.submittedAt) {

      // 🔎 Recuperar último writing log (opcional)
      const lastTypingLog = await prisma.externalWritingLog.findFirst({
        where: {
          studentId,
          event: "typing"
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      let recoveredText = "";

      if (lastTypingLog?.data) {
        try {
          const parsed =
            typeof lastTypingLog.data === "string"
              ? JSON.parse(lastTypingLog.data)
              : lastTypingLog.data;

          recoveredText = parsed?.text || "";
        } catch {}
      }

      await prisma.externalWritingExam.update({
        where: { id: exam.id },
        data: {
          submittedAt: new Date(),
	  expired: true,
	  submittedBy: "auto",
          textFinal: recoveredText || exam.textFinal
        }
      });

      return NextResponse.json({
        ok: true,
        submitted: true,
        remainingSeconds: 0
      });
    }

    return NextResponse.json({
      ok: true,
      submitted: false,
      remainingSeconds: remaining
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}