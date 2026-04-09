// lib/sheets/passwords.ts
import { google } from "googleapis";
import path from "path";

const SPREADSHEET_ID = "1rnpzil7N_2GocQ5l29btCrYCmsr9axWrv07vAbNQXa4";

async function getSheets() {
  let auth;

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // Producción: credenciales desde variable de entorno
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } else {
    // Local: archivo en disco
    auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "service-account.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

// ── PASSWORDS ──────────────────────────────────────────────

export async function findPassword(pwd: string, missionId: string, alumnoId?: string) {
  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "passwords!A:F",
  });

  const rows = res.data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    const [rowAlumnoId, password, missionId_row, curso, used] = rows[i];
    if (password !== pwd) continue;
    if (missionId_row !== missionId) continue;
    if (used === "true") continue;

    // Password grupal (alumno_id vacío) → acepta cualquier alumno
    const esGrupal = !rowAlumnoId || rowAlumnoId.trim() === "";
    // Password individual → solo acepta ese alumno
    const esDelAlumno = alumnoId && String(rowAlumnoId).trim() === String(alumnoId).trim();

    if (esGrupal || esDelAlumno) {
      return { alumnoId: rowAlumnoId, curso, rowIndex: i + 1 };
    }
  }
  return null;
}

export async function markPasswordUsed(rowIndex: number) {
  const sheets = await getSheets();
  // columna E = índice 5 = "used"
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `passwords!E${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [["true"]] },
  });
}

// ── MISSIONS STATE ─────────────────────────────────────────

export async function getActiveMission(): Promise<{
  missionId: string;
  curso: string;
  startedAt: string;
  durationMin: number;
} | null> {
  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "missions_state!A:D",
  });

  const rows = res.data.values ?? [];
  // columnas: mission_id | curso | started_at | duration_min
  // La última fila con started_at válido es la activa
  const dataRows = rows.slice(1).filter(r => r[2]); // tiene started_at
  if (dataRows.length === 0) return null;

  const last = dataRows[dataRows.length - 1];
  return {
    missionId: last[0],
    curso: last[1],
    startedAt: last[2],
    durationMin: Number(last[3]) || 30,
  };
}

export async function writeMissionState(params: {
  missionId: string;
  curso: string;
  durationMin: number;
}) {
  const sheets = await getSheets();
  const startedAt = new Date().toISOString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "missions_state!A:D",
    valueInputOption: "RAW",
    requestBody: {
      values: [[params.missionId, params.curso, startedAt, params.durationMin]],
    },
  });
  return startedAt;
}


function generarPassword(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function generarPasswordGrupal(params: {
  missionId: string;
  curso: string;
}): Promise<string> {
  const sheets = await getSheets();
  const password = generarPassword();
  const createdAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "passwords!A:F",
    valueInputOption: "RAW",
    requestBody: {
      // alumno_id vacío = password grupal
      values: [["", password, params.missionId, params.curso, "false", createdAt]],
    },
  });

  return password;
}

export async function generarPasswordIndividual(params: {
  alumnoId: string;
  missionId: string;
  curso: string;
}): Promise<string> {
  const sheets = await getSheets();
  const password = generarPassword();
  const createdAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "passwords!A:F",
    valueInputOption: "RAW",
    requestBody: {
      values: [[params.alumnoId, password, params.missionId, params.curso, "false", createdAt]],
    },
  });

  return password;
}