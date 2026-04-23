// lib/missions/types.ts

export type MissionBlockType = "text" | "grid" | "checkbox_grid";

export type MissionBlock = {
  id: string;
  prompt: string;
  type: MissionBlockType;
  rows?: readonly string[];
  columns?: readonly string[];
  correct?:
    | string
    | readonly string[]
    | Record<string, string | readonly string[]>;
};

export type MissionVariantInput = {
  title: string;
  shortDescription: string;
  difficulty: number;
  bonusMxp?: number | null;
  blocks: readonly MissionBlock[];
};

export type MissionVariant = MissionVariantInput & {
  id: string;
};

export type LegacyMissionDefinition = {
  id: string;
  title: string;
  blocks: readonly MissionBlock[];
};

export type ParallelMissionDefinition = {
  id: string;
  title: string;
  variants: Record<string, MissionVariantInput | MissionVariant>;
};

export type MissionDefinition =
  | LegacyMissionDefinition
  | ParallelMissionDefinition;

export type MissionAccessSession = {
  missionId: string;
  missionTitle: string;
  curso: string;
  expiresAt: number;
  rowIndex: number;
  alumnoId: string;
  variants: MissionVariant[];
};