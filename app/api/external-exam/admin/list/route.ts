import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const exams = await prisma.externalWritingExam.findMany({
      include: {
        student: true,
      },
      orderBy: { submittedAt: "asc" }
    });

    const logs = await prisma.externalWritingLog.findMany();

    return NextResponse.json({ exams, logs });

  } catch (err) {
    console.error("ADMIN LIST ERROR:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}