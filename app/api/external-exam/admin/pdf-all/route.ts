import { prisma } from "@/lib/prisma";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";

export async function GET() {
  const exams = await prisma.externalWritingExam.findMany({
    include: { student: true },
    orderBy: { submittedAt: "asc" }
  });

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const exam of exams) {
    const page = pdfDoc.addPage([595, 842]);
    const { height } = page.getSize();

    page.drawText(`Writing Exam`, { x: 50, y: height - 50, size: 18, font });
    page.drawText(`Alumno: ${exam.student.name}`, { x: 50, y: height - 80, size: 12, font });
    page.drawText(`Palabras: ${exam.wordCount}`, { x: 50, y: height - 100, size: 12, font });
    page.drawText(`Sospecha: ${exam.suspicionScore}`, { x: 50, y: height - 120, size: 12, font });

    let y = height - 150;
    const lines = exam.textFinal.match(/.{1,90}/g) || [];

    lines.forEach((line) => {
      page.drawText(line, { x: 50, y, size: 11, font });
      y -= 14;
    });
  }

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=writing_all.pdf",
    },
  });
}