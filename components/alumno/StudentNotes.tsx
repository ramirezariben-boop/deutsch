"use client";

import { useEffect, useState } from "react";
import NotesLineChart from "../charts/NotesLineChart";

type Course = {
  course: string;
};

export default function StudentNotes({ studentId }: { studentId: number }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "all">("single");

  useEffect(() => {
    fetch(`/api/student-courses-with-grades?studentId=${studentId}`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, [studentId]);

  return (
    <div className="flex flex-col gap-4">

      {/* 🔹 BOTONES DE MODO */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setViewMode("single");
            setSelected(null);
          }}
          className="bg-neutral-800 px-3 py-1 rounded"
        >
          Ver curso
        </button>

        <button
          onClick={() => {
            setViewMode("all");
            setSelected("ALL");
          }}
          className="bg-neutral-800 px-3 py-1 rounded"
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

          {courses.map(c => (
            <button
              key={c.course}
              onClick={() => setSelected(c.course)}
              className="bg-neutral-800 hover:bg-neutral-700 rounded p-2"
            >
              {c.course}
            </button>
          ))}
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