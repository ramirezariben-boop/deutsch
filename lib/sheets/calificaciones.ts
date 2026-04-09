// lib/sheets/calificaciones.ts
import { google } from "googleapis";
import path from "path";

const SPREADSHEET_ID = "1rnpzil7N_2GocQ5l29btCrYCmsr9axWrv07vAbNQXa4";

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "service-account.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

export async function escribirCalificacionSheet(params: {
  curso: string;       // "basico_2"
  alumnoId: string;    // "7"
  practica: string;    // "1A"
  score: number;       // 0..1
}) {
  const { curso, alumnoId, practica, score } = params;
  const sheets = await getSheets();

  // 1. Leer la hoja completa del curso
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${curso}!A:ZZ`,
  });

  const rows = res.data.values ?? [];
  if (rows.length === 0) throw new Error(`Hoja ${curso} vacía`);

  const headers = rows[0];
  const idxId = headers.indexOf("ID");
  const idxPractica = headers.indexOf(practica);

  if (idxId === -1) throw new Error(`No existe columna ID en ${curso}`);
  if (idxPractica === -1) throw new Error(`No existe columna ${practica} en ${curso}`);

  // 2. Encontrar la fila del alumno
  const rowIndex = rows.findIndex(
    (row, i) => i > 0 && String(row[idxId]).trim() === String(alumnoId).trim()
  );

  if (rowIndex === -1) throw new Error(`Alumno ${alumnoId} no encontrado en ${curso}`);

  // 3. Escribir el score (rowIndex es 0-based en el array, +1 para Sheets)
  const sheetRow = rowIndex + 1;
  const col = columnLetter(idxPractica + 1);

  const scoreRedondeado = Math.round(score * 100) / 100;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${curso}!${col}${sheetRow}`,
    valueInputOption: "RAW",
    requestBody: { values: [[scoreRedondeado]] },
  });
}

function columnLetter(n: number): string {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - m) / 26);
  }
  return s;
}