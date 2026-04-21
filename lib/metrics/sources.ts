import { getAllGradesForStudent } from "@/lib/grades";

import type {
  AttendanceHistoryRow,
  AttendanceRow,
  GradePoint,
  PunctualityRow,
  StudentMetricContext,
  StudentPointsPayload,
} from "./types";

const GS_GRADES_ENDPOINT = process.env.GS_GRADES_ENDPOINT;
const GS_ATTENDANCE_ENDPOINT = process.env.GS_ATTENDANCE_ENDPOINT;

async function fetchJson<T>(url: string): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err) {
    throw new Error(
      `fetch failed :: ${url} :: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} :: ${url}${
        text ? ` :: ${text.slice(0, 300)}` : ""
      }`
    );
  }

  try {
    return (await res.json()) as T;
  } catch (err) {
    throw new Error(
      `invalid JSON :: ${url} :: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}

function toNumberOrNull(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toStringSafe(value: unknown): string {
  if (value == null) return "";
  return String(value);
}

function normalizeSessionId(value: unknown): "A" | "B" | "C" {
  const s = String(value ?? "").trim().toUpperCase();
  if (s === "B") return "B";
  if (s === "C") return "C";
  return "A";
}

function extractArrayPayload(raw: unknown, keys: string[]): unknown[] {
  if (Array.isArray(raw)) return raw;

  if (raw && typeof raw === "object") {
    for (const key of keys) {
      const candidate = (raw as Record<string, unknown>)[key];
      if (Array.isArray(candidate)) return candidate;
    }
  }

  return [];
}

/* =========================================================
   WIDE GRADES
   ========================================================= */

const wideGradesCache = new Map<string, Promise<Record<string, unknown> | null>>();

export async function getWideGradesForStudent(
  studentId: number
): Promise<Record<string, unknown> | null> {
  if (!GS_GRADES_ENDPOINT) {
    throw new Error("GS_GRADES_ENDPOINT no definido");
  }

  const key = String(studentId);
  let promise = wideGradesCache.get(key);

  if (!promise) {
    promise = (async () => {
      const row = await fetchJson<Record<string, unknown>>(
        `${GS_GRADES_ENDPOINT}?studentId=${encodeURIComponent(String(studentId))}`
      );

      if (!row || (row as { error?: string }).error) {
        return null;
      }

      return row;
    })();

    wideGradesCache.set(key, promise);
    promise.finally(() => {
      wideGradesCache.delete(key);
    });
  }

  return promise;
}

/* =========================================================
   STUDENT POINTS
   ========================================================= */

const studentPointsCache = new Map<string, Promise<StudentPointsPayload | null>>();

export async function getStudentPointsForStudent(
  studentId: number
): Promise<StudentPointsPayload | null> {
  if (!GS_GRADES_ENDPOINT) {
    throw new Error("GS_GRADES_ENDPOINT no definido");
  }

  const key = String(studentId);
  let promise = studentPointsCache.get(key);

  if (!promise) {
    promise = (async () => {
      const data = await fetchJson<StudentPointsPayload>(
        `${GS_GRADES_ENDPOINT}?mode=studentPoints&studentId=${encodeURIComponent(
          String(studentId)
        )}`
      );

      return data ?? null;
    })();

    studentPointsCache.set(key, promise);
    promise.finally(() => {
      studentPointsCache.delete(key);
    });
  }

  return promise;
}

/* =========================================================
   PRACTICE GRADES
   ========================================================= */

export async function getPracticeGradesForStudent(
  ctx: StudentMetricContext
): Promise<GradePoint[]> {
  if (ctx.isCurrent !== true) return [];
  if (!ctx.nivelActual) return [];

  const grades = await getAllGradesForStudent(ctx.nivelActual, ctx.id);
  return Array.isArray(grades) ? grades : [];
}

/* =========================================================
   ATTENDANCE / PUNCTUALITY
   ========================================================= */

type RawAttendanceLikeRow = {
  student_id?: unknown;
  class_id?: unknown;
  session_id?: unknown;
  attendance_pct?: unknown;
  minutes_attended?: unknown;
  max_minutes?: unknown;
  late_minutes?: unknown;
};

const attendanceBundleCache = new Map<string, Promise<RawAttendanceLikeRow[]>>();

function attendanceCacheKey(ctx: StudentMetricContext) {
  return `${ctx.id}__${ctx.resolvedCourseId ?? ""}`;
}

async function getRawAttendanceBundleForStudent(
  ctx: StudentMetricContext
): Promise<RawAttendanceLikeRow[]> {
  if (ctx.isCurrent !== true) return [];
  if (!ctx.resolvedCourseId) return [];

  if (!GS_ATTENDANCE_ENDPOINT) {
    throw new Error("GS_ATTENDANCE_ENDPOINT no definido");
  }

  const key = attendanceCacheKey(ctx);
  let promise = attendanceBundleCache.get(key);

  if (!promise) {
    promise = (async () => {
      const url =
        `${GS_ATTENDANCE_ENDPOINT}` +
        `?course=${encodeURIComponent(String(ctx.resolvedCourseId))}` +
        `&student_id=${encodeURIComponent(String(ctx.id))}`;

      const raw = await fetchJson<unknown>(url);

      const rows = extractArrayPayload(raw, ["data", "attendance_records"]);
      return rows as RawAttendanceLikeRow[];
    })();

    attendanceBundleCache.set(key, promise);
    promise.finally(() => {
      attendanceBundleCache.delete(key);
    });
  }

  return promise;
}

export async function getAttendanceRowsForStudent(
  ctx: StudentMetricContext
): Promise<AttendanceRow[]> {
  const rows = await getRawAttendanceBundleForStudent(ctx);

  return rows.map((r) => ({
    class_id: toStringSafe(r.class_id),
    session_id: normalizeSessionId(r.session_id),
    attendance_pct: toNumberOrNull(r.attendance_pct),
    minutes_attended: toNumberOrNull(r.minutes_attended),
    max_minutes: toNumberOrNull(r.max_minutes),
  }));
}

export async function getPunctualityRowsForStudent(
  ctx: StudentMetricContext
): Promise<PunctualityRow[]> {
  const rows = await getRawAttendanceBundleForStudent(ctx);

  return rows.map((r) => ({
    class_id: toStringSafe(r.class_id),
    session_id: normalizeSessionId(r.session_id),
    late_minutes: toNumberOrNull(r.late_minutes),
    attendance_pct: toNumberOrNull(r.attendance_pct),
    minutes_attended: toNumberOrNull(r.minutes_attended),
    max_minutes: toNumberOrNull(r.max_minutes),
  }));
}

/* =========================================================
   ATTENDANCE HISTORY
   ========================================================= */

const attendanceHistoryCache = new Map<string, Promise<AttendanceHistoryRow[]>>();

export async function getAttendanceHistoryRowsForStudent(
  studentId: number
): Promise<AttendanceHistoryRow[]> {
  if (!GS_ATTENDANCE_ENDPOINT) {
    throw new Error("GS_ATTENDANCE_ENDPOINT no definido");
  }

  const key = String(studentId);
  let promise = attendanceHistoryCache.get(key);

  if (!promise) {
    promise = (async () => {
      const raw = await fetchJson<unknown>(
        `${GS_ATTENDANCE_ENDPOINT}?action=history&student_id=${encodeURIComponent(
          String(studentId)
        )}`
      );

      const rows = extractArrayPayload(raw, ["data", "history_records"]);

      return (rows as Record<string, unknown>[]).map((r) => ({
        student_id: Number(r.student_id),
        full_name: toStringSafe(r.full_name),
        course_id: toStringSafe(r.course_id),
        attendance_real_pct: toNumberOrNull(r.attendance_real_pct),
        minutes_attended_total: toNumberOrNull(r.minutes_attended_total),
        minutes_possible_total: toNumberOrNull(r.minutes_possible_total),
        institutional_attended: toNumberOrNull(r.institutional_attended),
        institutional_possible: toNumberOrNull(r.institutional_possible),
        absences: toNumberOrNull(r.absences),
        avg_late_minutes: toNumberOrNull(r.avg_late_minutes),
        measured_sessions_count: toNumberOrNull(r.measured_sessions_count),
        consolidated_at: toStringSafe(r.consolidated_at),
      }));
    })();

    attendanceHistoryCache.set(key, promise);
    promise.finally(() => {
      attendanceHistoryCache.delete(key);
    });
  }

  return promise;
}