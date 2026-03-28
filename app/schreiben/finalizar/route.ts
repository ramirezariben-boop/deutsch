import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONFIRM_PASSWORD = "entregar";

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
    console.error("Error en /schreiben/finalizar:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}