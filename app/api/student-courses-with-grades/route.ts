import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/TU_WEB_APP_ID/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

const res = await fetch(`${GAS_URL}?studentId=${studentId}`);

if (!res.ok) {
  const text = await res.text();
  console.error("GAS ERROR:", text);
  return NextResponse.json([]);
}

const row = await res.json();

  if (!row || row.error) {
    return NextResponse.json([]);
  }

  // Detectar cursos dinámicamente
  const courses = new Set<string>();

  Object.keys(row).forEach((key) => {
    const match = key.match(/(basico_|intermedio_)\d+/);
    if (match) {
      courses.add(match[0]);
    }
  });

  return NextResponse.json(
    Array.from(courses).map((course) => ({ course }))
  );
}