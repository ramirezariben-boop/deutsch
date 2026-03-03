import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GLOBAL_PASSWORD = process.env.EXTERNAL_EXAM_PASSWORD;

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    if (!id || !password) {
      return NextResponse.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
    }

    if (password !== GLOBAL_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
    }

    const student = await prisma.externalStudent.findUnique({
      where: { id }
    });

    if (!student) {
      return NextResponse.json({ ok: false, error: "Alumno no encontrado" }, { status: 404 });
    }

const exam = await prisma.externalWritingExam.findUnique({
  where: { studentId: id }
});

if (exam?.submittedAt) {
  return NextResponse.json(
    { ok: false, error: "Examen ya entregado." },
    { status: 403 }
  );
}

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}