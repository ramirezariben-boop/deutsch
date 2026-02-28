import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const exams = await prisma.externalWritingExam.findMany({
    include: { student: true },
    orderBy: { submittedAt: "asc" }
  });

  return NextResponse.json(exams);
}