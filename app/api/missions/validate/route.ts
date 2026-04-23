import { NextResponse } from "next/server";
import { findPassword, getActiveMission } from "@/lib/sheets/passwords";
import { yaTieneCalificacionSheet } from "@/lib/sheets/calificaciones";
import { MISSIONS_BASICO_2 } from "@/config/missions/basico_2";
import { MISSIONS_BASICO_4 } from "@/config/missions/basico_4";
import { MISSIONS_INTERMEDIO_2 } from "@/config/missions/intermedio_2";
import { MISSION_CONFIGS } from "@/config/missions";

export async function POST(req: Request) {
  try {
    const { password, alumnoId } = await req.json();

    if (!password || !alumnoId) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const active = await getActiveMission();
    if (!active) {
      return NextResponse.json(
        { error: "No hay misión activa en este momento" },
        { status: 403 }
      );
    }

    const startedAt = new Date(active.startedAt).getTime();
    const now = Date.now();
    const elapsed = (now - startedAt) / 1000 / 60;

    if (elapsed > active.durationMin) {
      return NextResponse.json(
        { error: "El tiempo de esta misión ya terminó" },
        { status: 403 }
      );
    }

    const yaEntrego = await yaTieneCalificacionSheet({
      curso: active.curso,
      alumnoId: String(alumnoId),
      practica: active.missionId.toUpperCase(),
    });

    if (yaEntrego) {
      return NextResponse.json(
        { error: "Ya entregaste esta misión" },
        { status: 403 }
      );
    }

    const match = await findPassword(
      password,
      active.missionId,
      active.curso,
      String(alumnoId)
    );

    if (!match) {
      return NextResponse.json(
        { error: "Password incorrecto o ya utilizado" },
        { status: 401 }
      );
    }

    const esIndividual = match.alumnoId && match.alumnoId.trim() !== "";
    if (esIndividual && String(match.alumnoId) !== String(alumnoId)) {
      return NextResponse.json(
        { error: "Este password no corresponde a tu cuenta" },
        { status: 401 }
      );
    }

    const missionConfig = MISSION_CONFIGS[active.curso];
    const missionData = missionConfig?.[active.missionId.toUpperCase()];

    if (!missionData) {
      return NextResponse.json(
        { error: "Misión no configurada" },
        { status: 500 }
      );
    }

    const remainingSec = Math.floor(
      active.durationMin * 60 - (now - startedAt) / 1000
    );

    return NextResponse.json({
      ok: true,
      missionId: active.missionId,
      curso: active.curso,
      blocks: missionData.blocks,
      remainingSec,
      rowIndex: match.rowIndex,
    });
  } catch (err: any) {
    console.error("validate error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}