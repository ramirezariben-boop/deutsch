// components/alumno/AlumnoCard.tsx
"use client";

import { useState } from "react";
import AlumnoTabs from "./AlumnoTabs";

type Alumno = {
  id: number;
  name: string;
  course: string;
  list_number: number;
};

export default function AlumnoCard({ alumno }: { alumno: Alumno }) {
  return (
    <div className="
  w-[360px]
  rounded-xl
  bg-neutral-900
  border border-neutral-700
  p-6
  shadow-xl
">

      <h2 className="text-xl font-semibold mb-1">{alumno.name}</h2>
      <div className="text-xs text-neutral-400 mb-4">
        Curso: {alumno.course} · Lista: {alumno.list_number} · ID: {alumno.id}
      </div>

<AlumnoTabs
  alumnoId={alumno.id}
  course={alumno.course}          // basico_4
  courseId="2026_1"                // por ahora puede ser hardcodeado mientras
/>


    </div>
  );
}
