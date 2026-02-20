import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxGlJJlOHEVKiMsCxuZd4Ct28G0q6scNa9VeCYTjYKXX65VtOkhRJrBM2BOSu36jzs/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return NextResponse.json([]);
  }

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);

  if (!res.ok) {
    console.error("GAS error");
    return NextResponse.json([]);
  }

  const row = await res.json();
  if (!row || row.error) return NextResponse.json([]);

  const results: { course: string; exam: string }[] = [];
  const seen = new Set<string>();

  Object.keys(row).forEach((key) => {
    const match = key.match(/^(basico_\d+|intermedio_\d+)_E(1|2)_(.+)$/);
    if (!match) return;

    const courseName = match[1];
    const exam = `E${match[2]}`;
    const value = Number(row[key] || 0);

    if (value > 0) {
      const id = `${courseName}_${exam}`;

      if (!seen.has(id)) {
        seen.add(id);
        results.push({ course: courseName, exam });
      }
    }
  });

  return NextResponse.json(
    results.sort((a, b) =>
      `${a.course}_${a.exam}`.localeCompare(`${b.course}_${b.exam}`)
    )
  );
}