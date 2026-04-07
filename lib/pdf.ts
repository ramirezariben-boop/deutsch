import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateConsentPDF(data: {
  name: string;
  workTitle?: string;
  workId: string;
  fileHash: string;
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
    `Hash del archivo:`,
    `${data.fileHash}`,
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
      size: 11,
      font,
    });
    y -= 18;
  }

  return await pdfDoc.save();
}