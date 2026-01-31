"use client";

import { useEffect, useState } from "react";
import AlumnoCard from "./AlumnoCard";

type Alumno = {
  id: number;
  name: string;
  course: string;
  list_number: number;
};

export default function AlumnoGate() {
  const [alumno, setAlumno] = useState<Alumno | null>(null);

  useEffect(() => {
    // 🔐 login temporal (luego lo cambias)
    const raw = localStorage.getItem("alumnoLogueado");
    if (!raw) return;

    try {
      setAlumno(JSON.parse(raw));
    } catch {}
  }, []);

  if (!alumno) return null;

  return <AlumnoCard alumno={alumno} />;
}
