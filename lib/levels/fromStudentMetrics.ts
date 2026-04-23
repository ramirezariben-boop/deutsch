// lib/levels/fromStudentMetrics.ts

import type { StudentMetrics } from "@/lib/metrics/types";
import type { StudentLevelInput } from "./studentLevel";

export function toStudentLevelInput(metrics: StudentMetrics): StudentLevelInput {
  return {
    attendancePct:
      metrics.attendance.avgPctLastN ??
      metrics.attendance.historyCurrentCourse?.attendance_real_pct ??
      metrics.attendance.avgPctAll ??
      null,

    punctualityAvgLateMinutes:
      metrics.punctuality.avgLateLastN ??
      metrics.punctuality.historyCurrentCourse?.avg_late_minutes ??
      metrics.punctuality.avgLateAll ??
      null,

    practicesPct:
      metrics.practices.avgLastN ??
      metrics.practices.avgAll ??
      null,

    gradesPct:
      metrics.formalGrades?.rollup.overall ??
      metrics.formalGrades?.rollup.total ??
      null,

    points:
      metrics.points?.summary.total ?? null,
  };
}