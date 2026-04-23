// lib/missions/resolve.ts

import { MISSION_CONFIGS } from "@/lib/missions/registry";
import type {
  LegacyMissionDefinition,
  MissionDefinition,
  MissionVariant,
  ParallelMissionDefinition,
} from "@/lib/missions/types";

export function normalizeMissionId(missionId: string): string {
  return String(missionId ?? "").trim().toUpperCase();
}

export function normalizeVariantId(variantId: string): string {
  return String(variantId ?? "").trim().toLowerCase();
}

function clampDifficulty(value: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(5, Math.round(n)));
}

function isParallelMission(
  value: MissionDefinition
): value is ParallelMissionDefinition {
  return "variants" in value && !!value.variants;
}

function buildDefaultVariant(mission: LegacyMissionDefinition): MissionVariant {
  return {
    id: "default",
    title: mission.title,
    shortDescription: "Variante principal de la misión.",
    difficulty: 1,
    bonusMxp: 0,
    blocks: mission.blocks,
  };
}

function normalizeVariantEntry(
  key: string,
  raw: any,
  fallbackMissionTitle: string
): MissionVariant {
  return {
    id: normalizeVariantId(raw?.id ?? key),
    title: String(raw?.title ?? `${fallbackMissionTitle} – ${key}`),
    shortDescription: String(
      raw?.shortDescription ?? "Variante alternativa."
    ),
    difficulty: clampDifficulty(raw?.difficulty ?? 1),
    bonusMxp: Number(raw?.bonusMxp ?? 0),
    blocks: Array.isArray(raw?.blocks) ? raw.blocks : [],
  };
}

export function getMissionDefinition(
  curso: string,
  missionId: string
): MissionDefinition {
  const cursoConfig = MISSION_CONFIGS[curso];
  if (!cursoConfig) {
    throw new Error(`Curso no configurado: ${curso}`);
  }

  const normalizedMissionId = normalizeMissionId(missionId);
  const mission = cursoConfig[normalizedMissionId];

  if (!mission) {
    throw new Error(
      `Misión no configurada: ${curso}/${normalizedMissionId}`
    );
  }

  return mission;
}

export function getMissionVariants(
  curso: string,
  missionId: string
): MissionVariant[] {
  const mission = getMissionDefinition(curso, missionId);

  if (!isParallelMission(mission)) {
    return [buildDefaultVariant(mission)];
  }

  return Object.entries(mission.variants).map(([key, value]) =>
    normalizeVariantEntry(key, value, mission.title)
  );
}

export function getMissionVariant(
  curso: string,
  missionId: string,
  variantId: string
): MissionVariant {
  const normalizedVariantId = normalizeVariantId(variantId);
  const variants = getMissionVariants(curso, missionId);
  const found = variants.find((v) => v.id === normalizedVariantId);

  if (!found) {
    throw new Error(
      `Variante no configurada: ${curso}/${normalizeMissionId(
        missionId
      )}/${normalizedVariantId}`
    );
  }

  return found;
}