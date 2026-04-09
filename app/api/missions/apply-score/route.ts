import { NextResponse } from "next/server";
import { escribirCalificacionSheet } from "@/lib/sheets/calificaciones";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

export async function POST(req: Request) {
  if (req.headers.get("x-internal-secret") !== INTERNAL_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { alumnoId, missionId, curso, score } = await req.json();
  if (!alumnoId || !missionId || !curso || score === undefined) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  await escribirCalificacionSheet({
    curso,
    alumnoId: String(alumnoId),
    practica: missionId.toUpperCase(),
    score: Number(score),
  });

  return NextResponse.json({ ok: true });
}