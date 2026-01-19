import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { studentId, event, text } = await req.json();

    if (!studentId || !event)
      return NextResponse.json({ ok: false, error: "Datos inválidos" }, { status: 400 });

    await prisma.writingLog.create({
      data: { studentId, event, data: text ?? "" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en /schreiben/admin/live/api:", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
