import { NextResponse } from "next/server";
import { readSheetJSON } from "@/lib/readSheet";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = Number(searchParams.get("studentId"));

  if (!studentId) {
    return NextResponse.json(
      { error: "Missing studentId" },
      { status: 400 }
    );
  }

  const endpoint = process.env.GS_GRADES_ENDPOINT;
  if (!endpoint) {
    throw new Error("GS_GRADES_ENDPOINT no definido");
  }

  const rows = await readSheetJSON(`${endpoint}?sheet=feedback_examen`);

  if (!Array.isArray(rows) || !rows.length) {
    return NextResponse.json({ feedback: [] });
  }

  const studentRow = rows.find((r) => {
    const id = r.studentId ?? r.id ?? r.ID;
    return Number(id) === studentId;
  });

  if (!studentRow) {
    return NextResponse.json({ feedback: [] });
  }

  const feedback = Object.keys(studentRow)
    .filter((k) => {
      if (k === "studentId" || k === "id" || k === "ID") return false;
      const v = studentRow[k];
      return v !== null && v !== undefined && String(v).trim() !== "";
    })
    .map((k) => ({
      curso: k,
      texto: String(studentRow[k]).trim(),
    }));

  return NextResponse.json({ feedback });
}