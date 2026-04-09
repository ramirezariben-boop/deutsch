// app/api/missions/start/route.ts
import { NextResponse } from "next/server";
import { writeMissionState } from "@/lib/sheets/passwords";

const ADMIN_SECRET = process.env.ADMIN_SECRET!;

export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { missionId, curso, durationMin = 30 } = await req.json();

  if (!missionId || !curso) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const startedAt = await writeMissionState({ missionId, curso, durationMin });

  return NextResponse.json({ ok: true, missionId, curso, startedAt, durationMin });
}