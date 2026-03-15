import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {

    const exams = await prisma.externalWritingExam.findMany({
      include: {
        student: true
      },
      orderBy: {
        studentId: "asc"
      }
    });

    const result = exams.map(exam => {

      const text = exam.textFinal ?? "";

      const wordCount = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

      return {
        id: exam.studentId,
        name: exam.student?.name ?? "",
        wordCount,
        text
      };

    });

    return NextResponse.json(result);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );

  }
}