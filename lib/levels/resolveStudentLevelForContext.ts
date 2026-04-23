// lib/levels/resolveStudentLevelForContext.ts

import { buildStudentMetrics } from "@/lib/metrics/student";
import type {
  StudentMetricContext,
  StudentMetricsWindows,
} from "@/lib/metrics/types";
import { toStudentLevelInput } from "./fromStudentMetrics";
import {
  resolveStudentLevel,
  type ResolvedStudentLevel,
} from "./studentLevel";

export type StudentMetricsWithLevel = Awaited<
  ReturnType<typeof buildStudentMetrics>
> & {
  level: ResolvedStudentLevel;
};

export async function resolveStudentLevelForContext(
  ctx: StudentMetricContext,
  windows?: Partial<StudentMetricsWindows>
): Promise<StudentMetricsWithLevel> {
  const metrics = await buildStudentMetrics(ctx, windows);
  const levelInput = toStudentLevelInput(metrics);
  const level = resolveStudentLevel(levelInput);

  return {
    ...metrics,
    level,
  };
}