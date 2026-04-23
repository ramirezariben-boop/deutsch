type RecomputeArgs = {
  students: StudentMetricContext[];
  windows?: Partial<StudentMetricsWindows>;
};

type ResolvedLevelRow = {
  id: number;
  level: number;
  levelMeta: {
    attendancePct: number | null;
    punctualityAvgLateMinutes: number | null;
    practicesPct: number | null;
    gradesPct: number | null;
    points: number | null;
    nextLevel: number | null;
    missing: string[];
  };
  levelUpdatedAt: string;
};