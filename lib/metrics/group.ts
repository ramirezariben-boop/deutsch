import { buildStudentMetrics } from "./student";
import type {
  GradeMetricSet,
  GroupGradeMetricSet,
  GroupMetricsAverage,
  GroupMetricsStudentRow,
  GroupNamedScalarMetric,
  GroupScalarMetric,
  MetricsMode,
  StudentMetricContext,
  StudentMetricsWindows,
  StudentNamedValue,
} from "./types";

const DEFAULT_WINDOWS: StudentMetricsWindows = {
  attendanceLastN: 3,
  punctualityLastN: 3,
  practicesLastN: 9,
};

function avg(nums: Array<number | null | undefined>): number | null {
  const clean = nums.filter(
    (n): n is number => typeof n === "number" && Number.isFinite(n)
  );
  if (!clean.length) return null;
  return clean.reduce((a, b) => a + b, 0) / clean.length;
}

function countPresent(nums: Array<number | null | undefined>): number {
  return nums.filter(
    (n): n is number => typeof n === "number" && Number.isFinite(n)
  ).length;
}

function summarize(nums: Array<number | null | undefined>): GroupScalarMetric {
  return {
    avg: avg(nums),
    count: countPresent(nums),
  };
}

function resolveMetric(args: {
  rawValue: number | null;
  historyValue: number | null;
  mode: MetricsMode;
}): number | null {
  if (args.mode === "raw_only") {
    return args.rawValue;
  }

  return args.rawValue ?? args.historyValue;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

function normalizeBucketKey(label: string): string {
  const clean = String(label ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return clean || "sin_nombre";
}

function addNamedValue(
  target: Record<string, StudentNamedValue>,
  label: string,
  value: number | null | undefined
) {
  const key = normalizeBucketKey(label);

  if (!target[key]) {
    target[key] = { label, value: null };
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const prev = target[key].value ?? 0;
    target[key].value = prev + value;
  }
}

function summarizeNamedMetricMap(
  rows: GroupMetricsStudentRow[],
  selector: (row: GroupMetricsStudentRow) => Record<string, StudentNamedValue>
): Record<string, GroupNamedScalarMetric> {
  const labels = new Map<string, string>();

  for (const row of rows) {
    const bucket = selector(row);
    for (const [key, entry] of Object.entries(bucket)) {
      if (!labels.has(key)) {
        labels.set(key, entry.label);
      }
    }
  }

  const out: Record<string, GroupNamedScalarMetric> = {};

  for (const [key, label] of labels.entries()) {
    const values = rows.map((row) => selector(row)[key]?.value ?? null);
    out[key] = {
      label,
      ...summarize(values),
    };
  }

  return out;
}

function summarizeGradeMetricSet(
  sets: Array<GradeMetricSet | undefined>
): GroupGradeMetricSet {
  return {
    continua: summarize(sets.map((s) => s?.continua ?? null)),
    sprechen: summarize(sets.map((s) => s?.sprechen ?? null)),
    schreiben: summarize(sets.map((s) => s?.schreiben ?? null)),
    horen: summarize(sets.map((s) => s?.horen ?? null)),
    lesen: summarize(sets.map((s) => s?.lesen ?? null)),
    grammatik: summarize(sets.map((s) => s?.grammatik ?? null)),
    integrador: summarize(sets.map((s) => s?.integrador ?? null)),
    total: summarize(sets.map((s) => s?.total ?? null)),
    overall: summarize(sets.map((s) => s?.overall ?? null)),
  };
}

export async function buildGroupMetricsAverage(args: {
  students: StudentMetricContext[];
  windows?: Partial<StudentMetricsWindows>;
  context?: {
    nivelActual?: string | null;
    day?: "SAM" | "SON" | "PRIV" | null;
    privCode?: string | null;
  };
  mode?: MetricsMode;
}): Promise<GroupMetricsAverage> {
  const windows: StudentMetricsWindows = {
    ...DEFAULT_WINDOWS,
    ...args.windows,
  };

  const mode: MetricsMode = args.mode ?? "raw_only";

  const filtered = args.students.filter((s) => {
    if (s.isCurrent !== true) return false;

    if (args.context?.nivelActual && s.nivelActual !== args.context.nivelActual) {
      return false;
    }

    if (args.context?.day && s.day !== args.context.day) {
      return false;
    }

    if ((args.context?.day === "PRIV" || s.day === "PRIV") && args.context?.privCode) {
      return s.privCode === args.context.privCode;
    }

    return true;
  });

  const chunks = chunkArray(filtered, 5);

  const metrics: Awaited<ReturnType<typeof buildStudentMetrics>>[] = [];
  const errors: Array<{ id: number; error: string }> = [];

  for (const chunk of chunks) {
    const settled = await Promise.allSettled(
      chunk.map((s) => buildStudentMetrics(s, windows))
    );

    settled.forEach((result, index) => {
      const student = chunk[index];

      if (result.status === "fulfilled") {
        metrics.push(result.value);

        if (result.value.sourceErrors?.length) {
          errors.push(
            ...result.value.sourceErrors.map((msg) => ({
              id: student.id,
              error: msg,
            }))
          );
        }
      } else {
        errors.push({
          id: student.id,
          error:
            result.reason instanceof Error
              ? result.reason.message
              : String(result.reason),
        });
      }
    });
  }

  const rows: GroupMetricsStudentRow[] = metrics.map((m) => {
    const historyAttendance =
      m.attendance.historyCurrentCourse?.attendance_real_pct ?? null;

    const historyLate =
      m.punctuality.historyCurrentCourse?.avg_late_minutes ?? null;

    const attendancePctLastN = resolveMetric({
      rawValue: m.attendance.avgPctLastN,
      historyValue: historyAttendance,
      mode,
    });

    const lateMinutesLastN = resolveMetric({
      rawValue: m.punctuality.avgLateLastN,
      historyValue: historyLate,
      mode,
    });

    const byCategory: Record<string, StudentNamedValue> = {};
    const bySubcategory: Record<string, StudentNamedValue> = {};

    for (const category of m.points?.categories ?? []) {
      addNamedValue(byCategory, category.name, category.points);

      for (const sub of category.subcategories ?? []) {
        addNamedValue(bySubcategory, sub.name, sub.points);
      }
    }

    return {
      id: m.meta.id,

      attendancePctLastN,
      lateMinutesLastN,
      practicesAvgLastN: m.practices.avgLastN,
      gradesContinua: m.formalGrades?.rollup.continua ?? null,
      gradesTotal: m.formalGrades?.rollup.total ?? null,
      gradesOverall: m.formalGrades?.rollup.overall ?? null,
      pointsTotal: m.points?.summary.total ?? null,
      pointsClass: m.points?.summary.claseTotal ?? null,
      pointsExtra: m.points?.summary.extraTotal ?? null,

      core: {
        attendancePctLastN,
        lateMinutesLastN,
        practicesAvgLastN: m.practices.avgLastN,
      },

      grades: {
        currentLevel: {
          continua: m.formalGrades?.rollup.continua ?? null,
          sprechen: m.formalGrades?.rollup.sprechen ?? null,
          schreiben: m.formalGrades?.rollup.schreiben ?? null,
          horen: m.formalGrades?.rollup.horen ?? null,
          lesen: m.formalGrades?.rollup.lesen ?? null,
          grammatik: m.formalGrades?.rollup.grammatik ?? null,
          integrador: m.formalGrades?.rollup.integrador ?? null,
          total: m.formalGrades?.rollup.total ?? null,
          overall: m.formalGrades?.rollup.overall ?? null,
          evaluations: m.formalGrades?.evaluations ?? {},
        },
      },

      points: {
        total: m.points?.summary.total ?? null,
        class: m.points?.summary.claseTotal ?? null,
        extra: m.points?.summary.extraTotal ?? null,
        byCategory,
        bySubcategory,
      },
    };
  });

  const core = {
    attendancePctLastN: summarize(rows.map((r) => r.core.attendancePctLastN)),
    lateMinutesLastN: summarize(rows.map((r) => r.core.lateMinutesLastN)),
    practicesAvgLastN: summarize(rows.map((r) => r.core.practicesAvgLastN)),
  };

  const gradesCurrentLevel = summarizeGradeMetricSet(
    rows.map((r) => ({
      continua: r.grades.currentLevel.continua,
      sprechen: r.grades.currentLevel.sprechen,
      schreiben: r.grades.currentLevel.schreiben,
      horen: r.grades.currentLevel.horen,
      lesen: r.grades.currentLevel.lesen,
      grammatik: r.grades.currentLevel.grammatik,
      integrador: r.grades.currentLevel.integrador,
      total: r.grades.currentLevel.total,
      overall: r.grades.currentLevel.overall,
    }))
  );

  const evaluationKeys = Array.from(
    new Set(
      rows.flatMap((r) => Object.keys(r.grades.currentLevel.evaluations ?? {}))
    )
  );

  const evaluationSummaries = Object.fromEntries(
    evaluationKeys.map((evaluationKey) => [
      evaluationKey,
      summarizeGradeMetricSet(
        rows.map((r) => r.grades.currentLevel.evaluations[evaluationKey])
      ),
    ])
  );

  const points = {
    total: summarize(rows.map((r) => r.points.total)),
    class: summarize(rows.map((r) => r.points.class)),
    extra: summarize(rows.map((r) => r.points.extra)),
    byCategory: summarizeNamedMetricMap(rows, (row) => row.points.byCategory),
    bySubcategory: summarizeNamedMetricMap(rows, (row) => row.points.bySubcategory),
  };

  return {
    group: {
      nivelActual: args.context?.nivelActual ?? null,
      day: args.context?.day ?? null,
      privCode: args.context?.privCode ?? null,
      size: rows.length,
    },

    windows,
    mode,

    averages: {
      attendancePctLastN: core.attendancePctLastN.avg,
      lateMinutesLastN: core.lateMinutesLastN.avg,
      practicesAvgLastN: core.practicesAvgLastN.avg,
      gradesContinua: gradesCurrentLevel.continua.avg,
      gradesTotal: gradesCurrentLevel.total.avg,
      gradesOverall: gradesCurrentLevel.overall.avg,
      pointsTotal: points.total.avg,
      pointsClass: points.class.avg,
      pointsExtra: points.extra.avg,
    },

    counts: {
      attendancePctLastN: core.attendancePctLastN.count,
      lateMinutesLastN: core.lateMinutesLastN.count,
      practicesAvgLastN: core.practicesAvgLastN.count,
      gradesContinua: gradesCurrentLevel.continua.count,
      gradesTotal: gradesCurrentLevel.total.count,
      gradesOverall: gradesCurrentLevel.overall.count,
      pointsTotal: points.total.count,
      pointsClass: points.class.count,
      pointsExtra: points.extra.count,
    },

    core,

    grades: {
      currentLevel: {
        ...gradesCurrentLevel,
        evaluations: evaluationSummaries,
      },
    },

    points,

    students: rows,
    errors,
  };
}