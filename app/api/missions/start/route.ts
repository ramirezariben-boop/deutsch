import { NextResponse } from "next/server";
import { writeMissionState, generarPasswordGrupal } from "@/lib/sheets/passwords";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { missionId, curso, durationMin = 30 } = await req.json();
  if (!missionId || !curso) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const [startedAt, password] = await Promise.all([
    writeMissionState({ missionId, curso, durationMin }),
    generarPasswordGrupal({ missionId, curso }),
  ]);

  return NextResponse.json({ ok: true, missionId, curso, startedAt, durationMin, password });
}