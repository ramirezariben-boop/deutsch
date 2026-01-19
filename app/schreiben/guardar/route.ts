import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { studentId, text, log } = await req.json();

    if (!studentId)
      return Response.json({ ok: false, error: "studentId faltante" }, { status: 400 });

    await prisma.writingExam.upsert({
      where: { studentId },
      update: { text },
      create: { studentId, text },
    });

    if (log) {
      await prisma.writingLog.create({
        data: { studentId, event: "save", data: log },
      });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error en guardar examen:", err);
    return Response.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
