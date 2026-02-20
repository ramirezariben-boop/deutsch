// components/alumno/AlumnoTabs.tsx
"use client";

import { useState } from "react";
import MetricModal from "./MetricModal";
import AttendanceBar from "../charts/AttendanceBar";
import GradesLine from "../charts/GradesLine";
import StudentNotes from "./StudentNotes";

type Props = {
  alumnoId: number;
  course: string;
  courseId: string; 
};


export default function AlumnoTabs({ alumnoId, course, courseId }: Props) {
  const [open, setOpen] =
    useState<null | "attendance" | "grades" | "notas">(null);

  return (
    <>
      <div className="flex gap-2 text-sm">
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

      </div>

      {open && (
        <MetricModal onClose={() => setOpen(null)}>
          {open === "attendance" && (
            <AttendanceBar
  studentId={alumnoId}
  courseId={courseId}
/>
	
          )}

          {open === "grades" && (
            <GradesLine
              studentId={alumnoId}
              course={course}
            />
          )}

          {open === "notas" && (
            <StudentNotes
              studentId={alumnoId}
            />
          )}

        </MetricModal>
      )}
    </>
  );
}
