import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const wordCount = text.trim().split(/\s+/).length;
const charCount = text.length;

const GLOBAL_PASSWORD = process.env.EXTERNAL_EXAM_PASSWORD;

export async function POST(req: Request) {
  try {
    const { studentId, text, password } = await req.json();

    if (!studentId || !text || !password) {
      return NextResponse.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
    }

    if (password !== GLOBAL_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
    }

    const student = await prisma.externalStudent.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return NextResponse.json({ ok: false, error: "Alumno no encontrado" }, { status: 404 });
    }

const logs = await prisma.externalWritingLog.findMany({
  where: { studentId }
});

let pasteCount = 0;
let blurCount = 0;
let longPaste = 0;

logs.forEach(l => {
  if (l.event === "paste") {
    pasteCount++;
    if (l.data && l.data.length > 50) longPaste++;
  }
  if (l.event === "blur") blurCount++;
});

let suspicionScore =
  pasteCount * 5 +
  longPaste * 15 +
  blurCount * 2;

await prisma.externalWritingExam.create({
  data: {
    studentId,
    textFinal: text,
    wordCount,
    charCount,
    suspicionScore
  }
});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}