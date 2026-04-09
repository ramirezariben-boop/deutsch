// lib/sheets/passwords.ts
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

// ── PASSWORDS ──────────────────────────────────────────────

export async function findPassword(pwd: string, missionId: string) {
  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "passwords!A:F",
  });

  const rows = res.data.values ?? [];
  // columnas: alumno_id | password | mission_id | curso | used | created_at
  for (let i = 1; i < rows.length; i++) {
    const [alumnoId, password, missionId_row, curso, used] = rows[i];
    if (
      password === pwd &&
      missionId_row === missionId &&
      used !== "true"
    ) {
      return { alumnoId, curso, rowIndex: i + 1 }; // rowIndex es 1-based
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