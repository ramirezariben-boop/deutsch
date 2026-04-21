export type DayCode = "SAM" | "SON" | "PRIV";

export type StudentMetricContext = {
  id: number;
  nivelActual?: string | null;
  resolvedCourseId?: string | null;
  isCurrent?: boolean;
  day?: DayCode | null;
  privCode?: string | null;
};

export type AttendanceRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  attendance_pct: number | null;
  minutes_attended: number | null;
  max_minutes: number | null;
};

export type PunctualityRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  late_minutes: number | null;
  attendance_pct: number | null;
  minutes_attended: number | null;
  max_minutes: number | null;
};

export type GradePoint = {
  key: string;
  value: number | null;
};

export type StudentPointsPayload = {
  summary: {
    total: number;
    claseTotal: number;
    extraTotal: number;
  };
  timeline: {
    day: Array<{ label: string; points: number }>;
    week: Array<{ label: string; points: number }>;
    month: Array<{ label: string; points: number }>;
  };
  timelineByCategory?: {
    day: Array<Record<string, string | number>>;
    week: Array<Record<string, string | number>>;
    month: Array<Record<string, string | number>>;
  };
  categories: Array<{
    name: string;
    points: number;
    subcategories: Array<{
      name: string;
      points: number;
    }>;
  }>;
  recent: Array<{
    id: string;
    source: "clase" | "extra";
    ts: string;
    displayTs: string;
    points: number;
    group: string | null;
    category: string;
    subcategory: string;
  }>;
};

export type StudentMetricsWindows = {
  attendanceLastN: number;
  punctualityLastN: number;
  practicesLastN: number;
};

export type AttendanceHistoryRow = {
  student_id: number;
  full_name: string;
  course_id: string;
  attendance_real_pct: number | null;
  minutes_attended_total: number | null;
  minutes_possible_total: number | null;
  institutional_attended: number | null;
  institutional_possible: number | null;
  absences: number | null;
  avg_late_minutes: number | null;
  measured_sessions_count: number | null;
  consolidated_at: string;
};

export type GradeMetricSet = {
  continua: number | null;
  sprechen: number | null;
  schreiben: number | null;
  horen: number | null;
  lesen: number | null;
  grammatik: number | null;
  integrador: number | null;
  total: number | null;
  overall: number | null;
};

export type NormalizedWideGrades = {
  currentLevelKey: string | null;
  evaluations: Record<string, GradeMetricSet>;
  rollup: GradeMetricSet;
};

export type StudentMetrics = {
  meta: StudentMetricContext;
  attendance: {
    rows: AttendanceRow[];
    lastN: AttendanceRow[];
    avgPctAll: number | null;
    avgPctLastN: number | null;
    historyRows: AttendanceHistoryRow[];
    historyCurrentCourse: AttendanceHistoryRow | null;
  };
  punctuality: {
    rows: PunctualityRow[];
    lastN: PunctualityRow[];
    avgLateAll: number | null;
    avgLateLastN: number | null;
    historyRows: AttendanceHistoryRow[];
    historyCurrentCourse: AttendanceHistoryRow | null;
  };
  practices: {
    grades: GradePoint[];
    gradedOnly: GradePoint[];
    lastN: GradePoint[];
    avgAll: number | null;
    avgLastN: number | null;
    countAll: number;
    countLastN: number;
  };
  points: StudentPointsPayload | null;
  wideGrades: Record<string, unknown> | null;
  formalGrades: NormalizedWideGrades | null;
  sourceErrors?: string[];
};

export type MetricsMode = "raw_only" | "history_fallback";

export type GroupScalarMetric = {
  avg: number | null;
  count: number;
};

export type GroupNamedScalarMetric = GroupScalarMetric & {
  label: string;
};

export type StudentNamedValue = {
  label: string;
  value: number | null;
};

export type GroupGradeMetricSet = {
  continua: GroupScalarMetric;
  sprechen: GroupScalarMetric;
  schreiben: GroupScalarMetric;
  horen: GroupScalarMetric;
  lesen: GroupScalarMetric;
  grammatik: GroupScalarMetric;
  integrador: GroupScalarMetric;
  total: GroupScalarMetric;
  overall: GroupScalarMetric;
};

export type GroupMetricsStudentRow = {
  id: number;

  // compat / acceso rápido
  attendancePctLastN: number | null;
  lateMinutesLastN: number | null;
  practicesAvgLastN: number | null;
  gradesContinua: number | null;
  gradesTotal: number | null;
  gradesOverall: number | null;
  pointsTotal: number | null;
  pointsClass: number | null;
  pointsExtra: number | null;

  core: {
    attendancePctLastN: number | null;
    lateMinutesLastN: number | null;
    practicesAvgLastN: number | null;
  };

  grades: {
    currentLevel: {
      continua: number | null;
      sprechen: number | null;
      schreiben: number | null;
      horen: number | null;
      lesen: number | null;
      grammatik: number | null;
      integrador: number | null;
      total: number | null;
      overall: number | null;
      evaluations: Record<string, GradeMetricSet>;
    };
  };

  points: {
    total: number | null;
    class: number | null;
    extra: number | null;
    byCategory: Record<string, StudentNamedValue>;
    bySubcategory: Record<string, StudentNamedValue>;
  };
};

export type GroupMetricsAverage = {
  group: {
    nivelActual?: string | null;
    day?: DayCode | null;
    privCode?: string | null;
    size: number;
  };

  windows: StudentMetricsWindows;
  mode: MetricsMode;

  // compat con la versión anterior
  averages: {
    attendancePctLastN: number | null;
    lateMinutesLastN: number | null;
    practicesAvgLastN: number | null;
    gradesContinua: number | null;
    gradesTotal: number | null;
    gradesOverall: number | null;
    pointsTotal: number | null;
    pointsClass: number | null;
    pointsExtra: number | null;
  };

  counts: {
    attendancePctLastN: number;
    lateMinutesLastN: number;
    practicesAvgLastN: number;
    gradesContinua: number;
    gradesTotal: number;
    gradesOverall: number;
    pointsTotal: number;
    pointsClass: number;
    pointsExtra: number;
  };

  core: {
    attendancePctLastN: GroupScalarMetric;
    lateMinutesLastN: GroupScalarMetric;
    practicesAvgLastN: GroupScalarMetric;
  };

  grades: {
    currentLevel: GroupGradeMetricSet & {
      evaluations: Record<string, GroupGradeMetricSet>;
    };
  };

  points: {
    total: GroupScalarMetric;
    class: GroupScalarMetric;
    extra: GroupScalarMetric;
    byCategory: Record<string, GroupNamedScalarMetric>;
    bySubcategory: Record<string, GroupNamedScalarMetric>;
  };

  students: GroupMetricsStudentRow[];

  errors?: Array<{
    id: number;
    error: string;
  }>;
};