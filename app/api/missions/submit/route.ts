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
import { awardExtraMissionBonus } from "@/lib/missions/bonus";
import { prisma } from "@/lib/prisma";

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

    const variant = getMissionVariant(curso, normalizedMissionId, variantId);

    const yaEntregoVariante = await prisma.missionFeedback.findFirst({
      where: {
        alumnoId: String(alumnoId),
        missionId: normalizedMissionId,
        variantId: variant.id,
      },
      select: { id: true },
    });

    if (yaEntregoVariante) {
      return NextResponse.json(
        { error: "Ya entregaste esta variante. Elige una diferente." },
        { status: 409 }
      );
    }

    const { total, correctas, score, feedback } = gradeMissionVariant(variant, respuestas);

    const missionExpiresAt = new Date(
      new Date(active.startedAt).getTime() + active.durationMin * 60_000
    );
    const submissionId = crypto.randomUUID();

    if (feedback.length > 0) {
      await prisma.missionFeedback.createMany({
        data: feedback.map((f) => ({
          alumnoId: String(alumnoId),
          curso,
          missionId: normalizedMissionId,
          variantId: variant.id,
          submissionId,
          question: f.question,
          studentAnswer: f.studentAnswer,
          correctAnswer: f.correctAnswer,
          isCorrect: f.isCorrect,
          score,
          missionExpiresAt,
        })),
      });
    }

    const yaEntrego = await yaTieneCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: normalizedMissionId,
    });

    if (yaEntrego) {
      const bonusResult = await awardExtraMissionBonus({
        alumnoId: String(alumnoId),
        curso,
        missionId: normalizedMissionId,
        variant,
        score,
      });

      console.log(
        `⭐ EXTRA ${curso}/${normalizedMissionId}/${variant.id} alumno ${alumnoId}: ${correctas}/${total} → ${score} | +${bonusResult.bonusMxp} MXP`
      );

      return NextResponse.json({
        ok: true,
        isExtra: true,
        missionId: normalizedMissionId,
        variantId: variant.id,
        correctas,
        total,
        score,
        bonusMxp: bonusResult.bonusMxp,
      });
    }

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
      isExtra: false,
      missionId: normalizedMissionId,
      variantId: variant.id,
      correctas,
      total,
      score,
      bonusMxp: 0,
    });
  } catch (err: any) {
    console.error("submit error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
