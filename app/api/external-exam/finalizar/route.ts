import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { studentId, text } = await req.json();

    if (!studentId || !text) {
      return NextResponse.json(
        { ok: false, error: "Datos incompletos" },
        { status: 400 }
      );
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
        if (l.data && l.data.length > 50) longPaste++;
      }
      if (l.event === "blur") blurCount++;
    });

    const suspicionScore =
      pasteCount * 5 +
      longPaste * 15 +
      blurCount * 2;

    // 📊 Snapshot metrics
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;

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
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}