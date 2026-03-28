import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const exams = await prisma.externalWritingExam.findMany({
      include: { student: true },
      orderBy: { submittedAt: "desc" }
    });

    const logs = await prisma.externalWritingLog.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({
      ok: true,
      exams,
      logs
    });

  } catch (error) {
    console.error("ADMIN DATA ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Error loading admin data" },
      { status: 500 }
    );
  }
}