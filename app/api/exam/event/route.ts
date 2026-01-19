import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const event = await prisma.cheatingEvent.create({
      data: {
        examId: data.examId,
        eventType: data.eventType,
        metadata: data.metadata ?? {},
      },
    });

    return NextResponse.json({ ok: true, event });
  } catch (err) {
    console.error("Error en /api/exam/event:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
