// lib/levels/types.ts

import type { StudentMetrics } from "@/lib/metrics/types";
import type { ResolvedStudentLevel } from "./studentLevel";

export type StudentMetricsResponse = StudentMetrics & {
  level: ResolvedStudentLevel;
};

export type AdminStudentLevelRow = {
  id: number;
  name: string | null;
  nivelActual: string | null;
  resolvedCourseId: string | null;
  isCurrent: boolean;
  day: "SAM" | "SON" | "PRIV" | null;
  privCode: string | null;
  points: number | null;
  level: ResolvedStudentLevel | null;
  levelUpdatedAt: string | null;
  error?: string;
};

export type AdminStudentLevelsResponse = {
  ok: boolean;
  updated: number;
  rows: AdminStudentLevelRow[];
};