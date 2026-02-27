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
  if (!endpoint)
    throw new Error("GS_GRADES_ENDPOINT no definido");

  const rows = await readSheetJSON(
    `${endpoint}?sheet=feedback_examen`
  );

  if (!rows.length)
    return NextResponse.json({ feedback: [] });

  const studentRow = rows.find(
    r => Number(r.studentId) === studentId
  );

  if (!studentRow)
    return NextResponse.json({ feedback: [] });

  const feedback = Object.keys(studentRow)
    .filter(k => k !== "studentId" && studentRow[k])
    .map(k => ({
      curso: k,
      texto: studentRow[k]
    }));

  return NextResponse.json({ feedback });
}