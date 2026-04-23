// lib/levels/studentLevel.ts

export type StudentLevelInput = {
  attendancePct: number | null; // 0-100
  punctualityAvgLateMinutes: number | null; // menor es mejor
  practicesPct: number | null; // 0-100
  gradesPct: number | null; // 0-100
  points: number | null; // acumulado curso
};

export type LevelMetricKey =
  | "attendance"
  | "punctuality"
  | "practices"
  | "grades"
  | "points";

export type LevelMetricStatus = {
  key: LevelMetricKey;
  label: string;
  passed: boolean;
  value: number | null;
  valueLabel: string;
  targetLabel: string;
};

type Rule = {
  level: 1 | 2 | 3 | 4 | 5;
  thresholds: {
    attendancePct: number;
    punctualityMaxLateMinutes: number;
    practicesPct: number;
    gradesPct: number;
    points: number;
  };
};

export type ResolvedStudentLevel = {
  currentLevel: number;
  requiredToPass: number;
  hasAnyData: boolean;
  resolvedInput: StudentLevelInput;
  current: {
    level: number;
    passedCount: number;
    conditions: LevelMetricStatus[];
  };
  next: null | {
    level: number;
    passedCount: number;
    missing: LevelMetricStatus[];
    conditions: LevelMetricStatus[];
  };
};

const REQUIRED_TO_PASS = 4;

const RULES: Rule[] = [
  {
    level: 1,
    thresholds: {
      attendancePct: 60,
      punctualityMaxLateMinutes: 8,
      practicesPct: 55,
      gradesPct: 60,
      points: 10,
    },
  },
  {
    level: 2,
    thresholds: {
      attendancePct: 70,
      punctualityMaxLateMinutes: 5,
      practicesPct: 70,
      gradesPct: 70,
      points: 25,
    },
  },
  {
    level: 3,
    thresholds: {
      attendancePct: 80,
      punctualityMaxLateMinutes: 3,
      practicesPct: 80,
      gradesPct: 80,
      points: 45,
    },
  },
  {
    level: 4,
    thresholds: {
      attendancePct: 85,
      punctualityMaxLateMinutes: 2,
      practicesPct: 88,
      gradesPct: 88,
      points: 60,
    },
  },
  {
    level: 5,
    thresholds: {
      attendancePct: 90,
      punctualityMaxLateMinutes: 1,
      practicesPct: 94,
      gradesPct: 94,
      points: 80,
    },
  },
];

function fmtPct(v: number | null): string {
  return v == null ? "—" : `${v.toFixed(1)}%`;
}

function fmtMin(v: number | null): string {
  return v == null ? "—" : `${v.toFixed(1)} min`;
}

function fmtGrade(v: number | null): string {
  return v == null ? "—" : v.toFixed(1);
}

function fmtPoints(v: number | null): string {
  return v == null ? "—" : `${Number(v).toFixed(2)}`;
}

function evaluateRule(
  input: StudentLevelInput,
  rule: Rule
): {
  level: number;
  passedCount: number;
  achieved: boolean;
  conditions: LevelMetricStatus[];
} {
  const conditions: LevelMetricStatus[] = [
    {
      key: "attendance",
      label: "Asistencia",
      passed:
        input.attendancePct != null &&
        input.attendancePct >= rule.thresholds.attendancePct,
      value: input.attendancePct,
      valueLabel: fmtPct(input.attendancePct),
      targetLabel: `≥ ${rule.thresholds.attendancePct}%`,
    },
    {
      key: "punctuality",
      label: "Puntualidad",
      passed:
        input.punctualityAvgLateMinutes != null &&
        input.punctualityAvgLateMinutes <=
          rule.thresholds.punctualityMaxLateMinutes,
      value: input.punctualityAvgLateMinutes,
      valueLabel: fmtMin(input.punctualityAvgLateMinutes),
      targetLabel: `≤ ${rule.thresholds.punctualityMaxLateMinutes} min`,
    },
    {
      key: "practices",
      label: "Prácticas",
      passed:
        input.practicesPct != null &&
        input.practicesPct >= rule.thresholds.practicesPct,
      value: input.practicesPct,
      valueLabel: fmtPct(input.practicesPct),
      targetLabel: `≥ ${rule.thresholds.practicesPct}%`,
    },
    {
      key: "grades",
      label: "Calificación",
      passed:
        input.gradesPct != null && input.gradesPct >= rule.thresholds.gradesPct,
      value: input.gradesPct,
      valueLabel: fmtGrade(input.gradesPct),
      targetLabel: `≥ ${rule.thresholds.gradesPct}`,
    },
    {
      key: "points",
      label: "Puntos",
      passed: input.points != null && input.points >= rule.thresholds.points,
      value: input.points,
      valueLabel: fmtPoints(input.points),
      targetLabel: `≥ ${rule.thresholds.points}`,
    },
  ];

  const passedCount = conditions.filter((c) => c.passed).length;

  return {
    level: rule.level,
    passedCount,
    achieved: passedCount >= REQUIRED_TO_PASS,
    conditions,
  };
}

export function resolveStudentLevel(
  input: StudentLevelInput
): ResolvedStudentLevel {
  const hasAnyData = Object.values(input).some(
    (v) => typeof v === "number" && Number.isFinite(v)
  );

  const evaluations = RULES.map((rule) => evaluateRule(input, rule));
  const achieved = evaluations.filter((e) => e.achieved);
  const currentEval = achieved.at(-1) ?? null;

  const currentLevel = currentEval?.level ?? 0;
  const nextLevel = currentLevel < 5 ? currentLevel + 1 : null;
  const nextEval =
    nextLevel == null
      ? null
      : evaluations.find((e) => e.level === nextLevel) ?? null;

  return {
    currentLevel,
    requiredToPass: REQUIRED_TO_PASS,
    hasAnyData,
    resolvedInput: input,
    current: currentEval ?? {
      level: 0,
      passedCount: 0,
      conditions: [],
    },
    next:
      nextEval == null
        ? null
        : {
            level: nextEval.level,
            passedCount: nextEval.passedCount,
            missing: nextEval.conditions.filter((c) => !c.passed),
            conditions: nextEval.conditions,
          },
  };
}