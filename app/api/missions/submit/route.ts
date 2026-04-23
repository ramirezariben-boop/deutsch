import { NextResponse } from "next/server";
import {
  markPasswordUsedIfIndividual,
  getActiveMission,
} from "@/lib/sheets/passwords";
import {
  escribirCalificacionSheet,
  yaTieneCalificacionSheet,
} from "@/lib/sheets/calificaciones";
import {
  getMissionVariant,
  normalizeMissionId,
} from "@/lib/missions/resolve";
import { gradeMissionVariant } from "@/lib/missions/grading";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { alumnoId, rowIndex, respuestas, missionId, variantId, curso } =
      await req.json();

    if (
      !alumnoId ||
      rowIndex == null ||
      !respuestas ||
      !missionId ||
      !variantId ||
      !curso
    ) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const normalizedMissionId = normalizeMissionId(missionId);

    const active = await getActiveMission();
    if (
      !active ||
      normalizeMissionId(active.missionId) !== normalizedMissionId ||
      active.curso !== curso
    ) {
      return NextResponse.json(
        { error: "La misión ya no está activa" },
        { status: 403 }
      );
    }

    const elapsedMin =
      (Date.now() - new Date(active.startedAt).getTime()) / 1000 / 60;

    if (elapsedMin > active.durationMin) {
      return NextResponse.json({ error: "Tiempo agotado" }, { status: 403 });
    }

    const yaEntrego = await yaTieneCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: normalizedMissionId,
    });

    if (yaEntrego) {
      return NextResponse.json(
        { error: "Ya entregaste esta misión" },
        { status: 409 }
      );
    }

    const variant = getMissionVariant(curso, normalizedMissionId, variantId);
    const { total, correctas, score } = gradeMissionVariant(variant, respuestas);

    await escribirCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: normalizedMissionId,
      score,
    });

    await markPasswordUsedIfIndividual(Number(rowIndex));

    console.log(
      `✅ ${curso}/${normalizedMissionId}/${variant.id} alumno ${alumnoId}: ${correctas}/${total} → ${score}`
    );

    return NextResponse.json({
      ok: true,
      missionId: normalizedMissionId,
      variantId: variant.id,
      correctas,
      total,
      score,
    });
  } catch (err: any) {
    console.error("submit error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}