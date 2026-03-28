import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONFIRM_PASSWORD = "entregar";

export async function POST(req: Request) {
  try {
    const { studentId, text, password } = await req.json();

    if (!studentId || typeof text !== "string" || !password) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    if (password !== CONFIRM_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    await prisma.writingExam.upsert({
      where: { studentId: Number(studentId) },
      update: { text },
      create: { studentId: Number(studentId), text },
    });

    await prisma.writingLog.create({
      data: { studentId: Number(studentId), event: "final_submit", data: text },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en /api/schreiben/finalizar:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}