import { NextResponse } from "next/server";
import { writeMissionState } from "@/lib/sheets/passwords";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  // Verificar sesión de admin en lugar de header secreto
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { missionId, curso, durationMin = 30 } = await req.json();

  if (!missionId || !curso) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const startedAt = await writeMissionState({ missionId, curso, durationMin });
  return NextResponse.json({ ok: true, missionId, curso, startedAt, durationMin });
}