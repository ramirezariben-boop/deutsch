// lib/sheets/calificaciones.ts
import { google } from "googleapis";
import path from "path";

const SPREADSHEET_ID = "1rnpzil7N_2GocQ5l29btCrYCmsr9axWrv07vAbNQXa4";

async function getSheets() {
  let auth;

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } else {
    auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "service-account.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

export async function escribirCalificacionSheet(params: {
  curso: string;
  alumnoId: string;
  practica: string;
  score: number;
}) {
  const { curso, alumnoId, practica, score } = params;
  const sheets = await getSheets();

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

  const rowIndex = rows.findIndex(
    (row, i) => i > 0 && String(row[idxId]).trim() === String(alumnoId).trim()
  );

  if (rowIndex === -1) throw new Error(`Alumno ${alumnoId} no encontrado en ${curso}`);

  const sheetRow = rowIndex + 1;
  const col = columnLetter(idxPractica + 1);
  const scoreRedondeado = Math.round(score * 100) / 100;

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREA