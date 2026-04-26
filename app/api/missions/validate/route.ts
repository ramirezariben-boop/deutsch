import { NextResponse } from "next/server";
import { findPassword, getActiveMission } from "@/lib/sheets/passwords";
import {
  getMissionDefinition,
  getMissionVariants,
} from "@/lib/missions/resolve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const startedAtMs = new Date(active.startedAt).getTime();
    const nowMs = Date.now();
    const elapsedMin = (nowMs - startedAtMs) / 1000 / 60;

    if (elapsedMin > active.durationMin) {
      return NextResponse.json(
        { error: "El tiempo de esta misión ya terminó" },
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

    const missionDef = getMissionDefinition(active.curso, active.missionId);
    const variants = getMissionVariants(active.curso, active.missionId);

    const expiresAt = startedAtMs + active.durationMin * 60_000;

    return NextResponse.json({
      ok: true,
      missionId: String(active.missionId).toUpperCase(),
      missionTitle: missionDef.title,
      curso: active.curso,
      expiresAt,
      rowIndex: match.rowIndex,
      variants,
    });
  } catch (err: any) {
    console.error("validate error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}