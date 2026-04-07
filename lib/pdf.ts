import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateConsentPDF(data: {
  name: string;
  workTitle?: string;
  workId: string;
  date: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lines = [
    "AUTORIZACIÓN DE PUBLICACIÓN",
    "",
    `Alumno: ${data.name}`,
    `Trabajo: ${data.workTitle || "Sin título"}`,
    `Work ID: ${data.workId}`,
    "",
    `Fecha de firma: ${data.date}`,
    "",
    "DECLARACIÓN:",
    "El alumno autoriza la publicación de este trabajo",
    "con fines exclusivamente educativos.",
    "",
    "No existe cesión de derechos.",
    "El autor conserva todos sus derechos.",
    "",
    "Puede solicitar eliminación en cualquier momento.",
  ];

  let y = 750;

  for (const line of lines) {
    page.drawText(line, {
      x: 50,
      y,
      size: line === "AUTORIZACIÓN DE PUBLICACIÓN" ? 16 : 11,
      font,
    });

    y -= line === "" ? 10 : 18;
  }

  page.drawText("Firma del alumno:", {
    x: 50,
    y: y - 30,
    size: 11,
    font,
  });

  page.drawText(data.name, {
    x: 50,
    y: y - 50,
    size: 12,
    font,
  });

  return await pdfDoc.save();
}