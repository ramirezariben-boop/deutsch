import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Formato no es JSON" },
        { status: 400 }
      );
    }

    const { studentId, text, password } = data;

    if (!studentId || !text || !password) {
      return NextResponse.json(
        { ok: false, error: "Datos inválidos — faltan campos" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(studentId) },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Alumno no encontrado" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { ok: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    await prisma.writingExam.upsert({
      where: { studentId },
      update: { text },
      create: { studentId, text },
    });

    await prisma.writingLog.create({
      data: { studentId, event: "final_submit", data: text },
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Error en /schreiben/finalizar:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
