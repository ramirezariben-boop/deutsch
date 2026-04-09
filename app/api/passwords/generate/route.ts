import { NextResponse } from "next/server";
import { generarPasswordIndividual } from "@/lib/sheets/passwords";

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

export async function POST(req: Request) {
  const secret = req.headers.get("x-internal-secret");
  if (secret !== INTERNAL_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { alumnoId, missionId, curso } = await req.json();
  if (!alumnoId || !missionId || !curso) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const password = await generarPasswordIndividual({ alumnoId, missionId, curso });
  return NextResponse.json({ ok: true, password });
}