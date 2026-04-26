import type { MissionVariant } from "@/lib/missions/types";

const CLASSROOM_TRADING_URL = process.env.CLASSROOM_TRADING_URL;
const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

const EXTRA_MISSION_BONUS_MXP = 4;

type AwardMissionBonusParams = {
  alumnoId: string;
  curso: string;
  missionId: string;
  variant: MissionVariant;
  score: number;
};

export function calculateMissionBonus(params: AwardMissionBonusParams): number {
  const base = Number(params.variant.bonusMxp ?? 0);

  if (!Number.isFinite(base) || base <= 0) return 0;

  if (params.score >= 0.95) return Math.round(base);
  if (params.score >= 0.85) return Math.max(1, Math.round(base * 0.7));
  if (params.score >= 0.75) return Math.max(1, Math.round(base * 0.4));

  return 0;
}

export async function awardMissionBonusIfNeeded(
  params: AwardMissionBonusParams
) {
  const bonusMxp = calculateMissionBonus(params);

  const externalRef = [
    "mission_bonus",
    "deutsch",
    params.curso,
    params.missionId,
    params.variant.id,
    params.alumnoId,
  ].join(":");

  if (bonusMxp <= 0) {
    return {
      attempted: false,
      awarded: false,
      bonusMxp: 0,
      externalRef,
      reason: "bonus_zero",
    };
  }

  if (!CLASSROOM_TRADING_URL || !INTERNAL_SECRET) {
    console.warn(
      "[missions bonus] faltan CLASSROOM_TRADING_URL o INTERNAL_API_SECRET"
    );

    return {
      attempted: false,
      awarded: false,
      bonusMxp: 0,
      externalRef,
      reason: "missing_env",
    };
  }

  const pct = Math.round(params.score * 100);
  const traceNote =
    `Mission bonus | ${params.curso}/${params.missionId}/${params.variant.id}` +
    ` | ${params.variant.title} | score=${pct}% | difficulty=${params.variant.difficulty}`;

  try {
    const res = await fetch(`${CLASSROOM_TRADING_URL}/api/internal/missions/process-bonus-mxp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": INTERNAL_SECRET,
        },
        body: JSON.stringify({
          alumnoId: params.alumnoId,
          curso: params.curso,
          missionId: params.missionId,
          variantId: params.variant.id,
          variantTitle: params.variant.title,
          difficulty: params.variant.difficulty,
          score: params.score,
          bonusMxp,
          externalRef,
          traceNote,
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      console.error("[missions bonus] error CT:", data);
      return {
        attempted: true,
        awarded: false,
        bonusMxp: 0,
        externalRef,
        reason: data?.error ?? `HTTP ${res.status}`,
      };
    }

    return {
      attempted: true,
      awarded: !!data.created,
      bonusMxp: data.created ? bonusMxp : 0,
      externalRef,
      reason: data.created ? "awarded" : "already_exists",
    };
  } catch (err) {
    console.error("[missions bonus] error de red:", err);
    return {
      attempted: true,
      awarded: false,
      bonusMxp: 0,
      externalRef,
      reason: "network_error",
    };
  }
}

export async function awardExtraMissionBonus(params: {
  alumnoId: string;
  curso: string;
  missionId: string;
  variant: MissionVariant;
}): Promise<{ awarded: boolean; bonusMxp: number }> {
  if (!CLASSROOM_TRADING_URL || !INTERNAL_SECRET) {
    console.warn("[missions extra bonus] faltan CLASSROOM_TRADING_URL o INTERNAL_API_SECRET");
    return { awarded: false, bonusMxp: 0 };
  }

  const externalRef = [
    "mission_bonus_extra",
    "deutsch",
    params.curso,
    params.missionId,
    params.variant.id,
    params.alumnoId,
    Date.now(),
  ].join(":");

  const traceNote =
    `Extra mission bonus | ${params.curso}/${params.missionId}/${params.variant.id}` +
    ` | ${params.variant.title}`;

  try {
    const res = await fetch(`${CLASSROOM_TRADING_URL}/api/internal/missions/process-bonus-mxp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": INTERNAL_SECRET,
      },
      body: JSON.stringify({
        alumnoId: params.alumnoId,
        curso: params.curso,
        missionId: params.missionId,
        variantId: params.variant.id,
        variantTitle: params.variant.title,
        difficulty: params.variant.difficulty,
        score: 1,
        bonusMxp: EXTRA_MISSION_BONUS_MXP,
        externalRef,
        traceNote,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      console.error("[missions extra bonus] error CT:", data);
      return { awarded: false, bonusMxp: 0 };
    }

    return {
      awarded: !!data.created,
      bonusMxp: data.created ? EXTRA_MISSION_BONUS_MXP : 0,
    };
  } catch (err) {
    console.error("[missions extra bonus] error de red:", err);
    return { awarded: false, bonusMxp: 0 };
  }
}