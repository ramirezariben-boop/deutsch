"use client";

import { useEffect, useState } from "react";
import NotesLineChart from "../charts/NotesLineChart";

type CourseExam = {
  course: string;
  exam: string;
};

export default function StudentNotes({ studentId }: { studentId: number }) {
  const [courses, setCourses] = useState<CourseExam[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "all">("single");

  useEffect(() => {
    fetch(`/api/student-courses-with-grades?studentId=${studentId}`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, [studentId]);

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* 🔹 BOTONES DE MODO */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setViewMode("single");
            setSelected(null);
          }}
          className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded transition"
        >
          Ver curso
        </button>

        <button
          onClick={() => {
            setViewMode("all");
            setSelected("ALL");
          }}
          className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded transition"
        >
          Todos los cursos
        </button>
      </div>

      {/* 🔹 MODO SINGLE */}
      {viewMode === "single" && !selected && (
        <>
          <h3 className="text-lg font-semibold">
            Cursos con evaluación
          </h3>

          {courses.length === 0 ? (
            <p className="text-neutral-500 text-sm">
              No hay cursos con calificación registrada.
            </p>
          ) : (
           <div className="grid grid-cols-2 gap-3">
  {courses.map(c => (
    <button
      key={`${c.course}_${c.exam}`}
      onClick={() => setSelected(`${c.course}_${c.exam}`)}
      className="
        bg-neutral-800
        hover:bg-neutral-700
        rounded
        px-3 py-2
        text-sm
        transition
      "
    >
      {c.course} {c.exam}
    </button>
  ))}
</div>
          )}
        </>
      )}

      {/* 🔹 RENDER GRÁFICA */}
      {selected && (
        <NotesLineChart
          studentId={studentId}
          course={selected}
        />
      )}
    </div>
  );
}