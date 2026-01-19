import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { studentId, text, password } = await req.json();

    if (!studentId || typeof text !== "string" || !password) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos" },
        { status: 400 }
      );
    }

    // Validar la contraseña antes de guardar
    const user = await prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { ok: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Guardar examen final
    await prisma.writingExam.upsert({
      where: { studentId },
      update: { text },
      create: { studentId, text },
    });

    // Log
    await prisma.writingLog.create({
      data: { studentId, event: "final_submit", data: text },
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
