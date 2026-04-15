"use client";

import { useEffect, useState } from "react";
import MetricModal from "./MetricModal";
import AttendanceBar from "../charts/AttendanceBar";
import PunctualityBar from "../charts/PunctualityBar";
import AttendanceHistoryBar from "../charts/AttendanceHistoryBar";
import GradesLine from "../charts/GradesLine";
import StudentNotes from "./StudentNotes";
import Progreso from "./Progreso";

type Props = {
  alumnoId: number;
  course: string;
  courseId: string;
};

type MainTab = "attendance" | "grades" | "notas" | "progreso";
type AttendanceView = "attendance" | "punctuality" | "history";

type AttendanceRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  attendance_pct: number | null;
  minutes_attended: number | null;
  max_minutes: number | null;
};

type PunctualityRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  late_minutes: number | null;
  attendance_pct: number | null;
  minutes_attended: number | null;
  max_minutes: number | null;
};

function AttendancePanel({
  alumnoId,
  courseId,
}: {
  alumnoId: number;
  courseId: string;
}) {
  const [attendanceView, setAttendanceView] =
    useState<AttendanceView>("attendance");
  const [loading, setLoading] = useState(true);
  const [attendanceRows, setAttendanceRows] = useState<AttendanceRow[]>([]);
  const [punctualityRows, setPunctualityRows] = useState<PunctualityRow[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadBoth() {
      try {
        const [attRes, punRes] = await Promise.all([
          fetch(`/api/attendance?student_id=${alumnoId}&course_id=${courseId}`, {
            cache: "no-store",
          }),
          fetch(`/api/punctuality?student_id=${alumnoId}&course_id=${courseId}`, {
            cache: "no-store",
          }),
        ]);

        if (!attRes.ok) throw new Error("Attendance fetch failed");
        if (!punRes.ok) throw new Error("Punctuality fetch failed");

        const [attJson, punJson] = await Promise.all([
          attRes.json(),
          punRes.json(),
        ]);

        if (!cancelled) {
          setAttendanceRows(Array.isArray(attJson) ? attJson : []);
          setPunctualityRows(Array.isArray(punJson) ? punJson : []);
        }
      } catch (err) {
        console.error("AttendancePanel load error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBoth();

    return () => {
      cancelled = true;
    };
  }, [alumnoId, courseId]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  const hasCurrentData =
    attendanceRows.length > 0 || punctualityRows.length > 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-center">
        <div className="inline-flex rounded-lg border border-neutral-700 bg-neutral-900 p-1">
          <button
            onClick={() => setAttendanceView("attendance")}
            className={
              attendanceView === "attendance"
                ? "rounded-md px-3 py-1.5 text-xs bg-sky-600 text-white"
                : "rounded-md px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            }
          >
            Asistencia
          </button>

          <button
            onClick={() => setAttendanceView("punctuality")}
            className={
              attendanceView === "punctuality"
                ? "rounded-md px-3 py-1.5 text-xs bg-amber-600 text-white"
                : "rounded-md px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            }
          >
            Puntualidad
          </button>

          <button
            onClick={() => setAttendanceView("history")}
            className={
              attendanceView === "history"
                ? "rounded-md px-3 py-1.5 text-xs bg-violet-600 text-white"
                : "rounded-md px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800"
            }
          >
            Histórico
          </button>
        </div>
      </div>

      {attendanceView === "attendance" &&
        (hasCurrentData ? (
          <AttendanceBar raw={attendanceRows} />
        ) : (
          <div className="text-sm text-neutral-400">
            No hay registros de asistencia del curso actual
          </div>
        ))}

      {attendanceView === "punctuality" &&
        (hasCurrentData ? (
          <PunctualityBar raw={punctualityRows} />
        ) : (
          <div className="text-sm text-neutral-400">
            No hay registros de puntualidad del curso actual
          </div>
        ))}

      {attendanceView === "history" && (
        <AttendanceHistoryBar studentId={alumnoId} />
      )}
    </div>
  );
}

export default function AlumnoTabs({ alumnoId, course, courseId }: Props) {
  const [open, setOpen] = useState<null | MainTab>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button
          onClick={() => setOpen("attendance")}
          className="flex-1 rounded bg-neutral-800 hover:bg-neutral-700 py-2"
        >
          Asistencia
        </button>

        <button
          onClick={() => setOpen("grades")}
          className="flex-1 rounded bg-neutral-800 hover:bg-neutral-700 py-2"
        >
          Práctica
        </button>

        <button
          onClick={() => setOpen("notas")}
          className="flex-1 rounded bg-neutral-800 hover:bg-neutral-700 py-2"
        >
          Notas
        </button>

        <button
          onClick={() => setOpen("progreso")}
          className="flex-1 rounded bg-neutral-800 hover:bg-neutral-700 py-2"
        >
          Progreso
        </button>
      </div>

      {open && (
        <MetricModal onClose={() => setOpen(null)}>
          {open === "attendance" && (
            <AttendancePanel alumnoId={alumnoId} courseId={courseId} />
          )}

          {open === "grades" && (
            <GradesLine studentId={alumnoId} course={course} />
          )}

          {open === "notas" && <StudentNotes studentId={alumnoId} />}

          {open === "progreso" && <Progreso studentId={alumnoId} />}
        </MetricModal>
      )}
    </>
  );
}