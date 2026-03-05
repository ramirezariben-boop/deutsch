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
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const fontSize = 11;
  const lineHeight = 16;

  for (const exam of exams) {

    let page = pdfDoc.addPage([595, 842]);
    let { width, height } = page.getSize();

    let y = height - margin;

    const text = exam.textFinal ?? "";

    const wordCount = text.trim()
      ? text.trim().split(/\s+/).length
      : 0;

    const date = new Date(
      exam.submittedAt ?? exam.createdAt
    ).toLocaleString();

    // ===== TITLE =====

    const title = "Writing Exam";
    const titleWidth = fontBold.widthOfTextAtSize(title, 20);

    page.drawText(title, {
      x: (width - titleWidth) / 2,
      y,
      size: 20,
      font: fontBold
    });

    y -= 35;

    // ===== STUDENT DATA =====

    page.drawText(`Alumno: ${exam.student?.name ?? "Desconocido"}`, {
      x: margin,
      y,
      size: 12,
      font
    });

    page.drawText(`ID: ${exam.studentId}`, {
      x: width - 120,
      y,
      size: 12,
      font
    });

    y -= 20;

    page.drawText(`Fecha: ${date}`, {
      x: margin,
      y,
      size: 11,
      font
    });

    if (wordCount > 0) {
      page.drawText(`Palabras: ${wordCount}`, {
        x: width - 150,
        y,
        size: 11,
        font
      });
    }

    y -= 25;

    // ===== LINE =====

    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1
    });

    y -= 25;

    // ===== WORD WRAP =====

    const maxWidth = width - margin * 2;
    const paragraphs = text.split("\n");

    for (const paragraph of paragraphs) {

      const words = paragraph.split(" ");
      let line = "";

      for (const word of words) {

        const testLine = line ? line + " " + word : word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > maxWidth) {

          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font
          });

          y -= lineHeight;

          if (y < margin) {
            page = pdfDoc.addPage([595, 842]);
            ({ height } = page.getSize());
            y = height - margin;
          }

          line = word;

        } else {

          line = testLine;

        }
      }

      if (line) {

        page.drawText(line, {
          x: margin,
          y,
          size: fontSize,
          font
        });

        y -= lineHeight;

        if (y < margin) {
          page = pdfDoc.addPage([595, 842]);
          ({ height } = page.getSize());
          y = height - margin;
        }
      }

      y -= 6;
    }

    // ===== TEACHER EVALUATION =====

    y -= 30;

    if (y < 200) {
      page = pdfDoc.addPage([595, 842]);
      ({ height } = page.getSize());
      y = height - margin;
    }

    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1
    });

    y -= 20;

    page.drawText("Evaluación del profesor", {
      x: margin,
      y,
      size: 14,
      font: fontBold
    });

    y -= 25;

    page.drawText("Calificación: ____________________________", {
      x: margin,
      y,
      size: 12,
      font
    });

    y -= 25;

    page.drawText("Comentarios:", {
      x: margin,
      y,
      size: 12,
      font
    });

    y -= 20;

    for (let i = 0; i < 6; i++) {

      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 0.5
      });

      y -= 25;

    }

  }

  // ===== PAGE NUMBERS =====

  const pages = pdfDoc.getPages();

  pages.forEach((p, index) => {

    const { width } = p.getSize();

    p.drawText(`Page ${index + 1}`, {
      x: width - 80,
      y: 20,
      size: 10,
      font
    });

  });

  const pdfBytes = await pdfDoc.save();
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=writing_all.pdf",
    },
  });
}