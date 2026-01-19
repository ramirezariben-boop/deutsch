import { prisma } from "@/lib/prisma";

const lastSnapshot = new Map<number, number>();
const SNAPSHOT_LIMIT_MS = 10_000;

const ALWAYS_ALLOW = new Set([
  "paste",
  "blur",
  "focus",
  "visibilitychange",
  "visibility",
  "window-blur",
  "window-focus",
]);

export async function POST(req: Request) {
  try {
    const { studentId, event, text } = await req.json();
    if (!studentId || !event) return Response.json({ ok: false, error: "Datos inválidos." }, { status: 400 });

    const now = Date.now();

    if (ALWAYS_ALLOW.has(event)) {
      await prisma.writingLog.create({
        data: { studentId, event, data: text ?? null },
      });
      return Response.json({ ok: true });
    }

    if (event === "snapshot") {
      const last = lastSnapshot.get(studentId) ?? 0;

      if (now - last < SNAPSHOT_LIMIT_MS)
        return Response.json({ ok: true, skipped: true });

      lastSnapshot.set(studentId, now);

      await prisma.writingLog.create({
        data: { studentId, event: "snapshot", data: text ?? null },
      });

      return Response.json({ ok: true });
    }

    await prisma.writingLog.create({
      data: { studentId, event, data: text ?? null },
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error en /api/exam/submit:", err);
    return Response.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
