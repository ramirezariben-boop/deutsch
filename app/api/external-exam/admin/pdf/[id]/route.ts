import { prisma } from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const exam = await prisma.externalWritingExam.findUnique({
    where: { id: Number(params.id) },
    include: { student: true }
  });

  if (!exam) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { width, height } = page.getSize();

  page.drawText(`Writing Exam`, {
    x: 50,
    y: height - 50,
    size: 18,
    font,
  });

  page.drawText(`Alumno: ${exam.student.name}`, {
    x: 50,
    y: height - 80,
    size: 12,
    font,
  });

  page.drawText(`Palabras: ${exam.wordCount}`, {
    x: 50,
    y: height - 100,
    size: 12,
    font,
  });

  let y = height - 130;
  const lines = exam.textFinal.match(/.{1,90}/g) || [];

  lines.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y,
      size: 11,
      font,
    });
    y -= 14;
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${exam.studentId}.pdf`,
    },
  });
}