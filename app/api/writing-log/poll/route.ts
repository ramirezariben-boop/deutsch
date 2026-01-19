import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const studentId = Number(url.searchParams.get("studentId"));
    const after = Number(url.searchParams.get("after") ?? 0);

    if (!studentId || isNaN(studentId)) {
      return NextResponse.json(
        { ok: false, error: "studentId inválido" },
        { status: 400 }
      );
    }

    const logs = await prisma.writingLog.findMany({
      where: {
        studentId,
        id: { gt: after },
      },
      orderBy: { id: "asc" },
      take: 50, // protección
    });

    const lastId = logs.length > 0 ? logs.at(-1)!.id : after;

    return NextResponse.json({
      ok: true,
      logs,
      lastId,
    });
  } catch (err) {
    console.error("Error en /api/writing-log/poll:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
