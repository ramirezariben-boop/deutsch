// app/api/exam/all/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.writingExam.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, exams });
  } catch (err) {
    console.error("Error /api/exam/all:", err);

    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
