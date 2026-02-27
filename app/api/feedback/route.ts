import { NextResponse } from "next/server";
import { google } from "googleapis";
import { authorize } from "@/lib/google/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SPREADSHEET_ID = "1rnpzil7N_2GocQ5l29btCrYCmsr9axWrv07vAbNQXa4";
const SHEET_NAME = "feedback_examen";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId)
      return NextResponse.json({ error: "Missing studentId" }, { status: 400 });

    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:ZZ`,
    });

    const rows = res.data.values;
    if (!rows || rows.length < 2)
      return NextResponse.json({ feedback: [] });

    const headers = rows[0];
    const dataRows = rows.slice(1);

    const row = dataRows.find(r => r[0] === studentId);

    if (!row) return NextResponse.json({ feedback: [] });

    const feedback = [];

    for (let i = 1; i < headers.length; i++) {
      if (row[i] && row[i].trim() !== "") {
        feedback.push({
          curso: headers[i],
          texto: row[i]
        });
      }
    }

    return NextResponse.json({ feedback });

  } catch (e: any) {
    console.error("FEEDBACK ERROR:", e);
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}