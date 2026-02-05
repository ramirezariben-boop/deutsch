"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AttendanceRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  attendance_pct: number;
  minutes_attended: number;
  max_minutes: number;
};

type ChartRow = {
  label: string; // 1A, 1B, 2C...
  pct: number;
  minutes: number;
  max: number;
};

export default function AttendanceBar({
  studentId,
  courseId,
}: {
  studentId: number;
  courseId: string;
}) {
  const [raw, setRaw] = useState<AttendanceRow[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let cancelled = false;


  async function load() {
    try {

      const res = await fetch(
        `/api/attendance?student_id=${studentId}&course_id=${courseId}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Fetch failed");

      const json = await res.json();

      if (!cancelled) {
        setRaw(json);
      }
    } catch (err) {
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, [studentId, courseId]);



  // =========================
  // TRANSFORMACIÓN PARA GRÁFICO
  // =========================

const chartData: ChartRow[] = useMemo(() => {
  return raw
    .map((r, i) => {
      const m = r.class_id.match(/_(\d{2})$/);
      const classNum = m ? Number(m[1]) : i + 1;

      return {
        label: `${classNum}${r.session_id}`,
        pct: r.attendance_pct,
        minutes: r.minutes_attended,
        max: r.max_minutes,
      };
    })
    .sort((a, b) => {
      const nA = Number(a.label.match(/\d+/)?.[0] ?? 0);
      const nB = Number(b.label.match(/\d+/)?.[0] ?? 0);
      return nA - nB || a.label.localeCompare(b.label);
    });
}, [raw]);


  // =========================
  // CÁLCULOS DE RESUMEN
  // =========================

  // --- asistencia real (minutos)
  const totalMinutes = raw.reduce((s, r) => s + r.minutes_attended, 0);
  const totalPossible = raw.reduce((s, r) => s + r.max_minutes, 0);

  const realPct =
    totalPossible > 0
      ? +(totalMinutes / totalPossible * 100).toFixed(1)
      : 0;

  // --- asistencia institucional
  function weight(session: "A" | "B" | "C") {
    return session === "A" ? 0.5 : 0.25;
  }

  function attended(r: AttendanceRow) {
    return r.minutes_attended >= r.max_minutes * 0.5;
  }

  let instAttended = 0;
  let instPossible = 0;

  raw.forEach((r) => {
    const w = weight(r.session_id);
    instPossible += w;
    if (attended(r)) instAttended += w;
  });

  instAttended = +instAttended.toFixed(2);
  instPossible = +instPossible.toFixed(2);

  const absences = +(instPossible - instAttended).toFixed(2);

  const status =
    absences >= 2 ? "danger" : absences >= 1 ? "warning" : "ok";

  // =========================
  // RENDER
  // =========================

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!chartData.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay registros de asistencia
      </div>
    );
  }

  return (
<div className="w-full h-72 min-h-[280px]">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <XAxis dataKey="label" />
      <YAxis domain={[0, 100]} />
      <Tooltip
        formatter={(_: any, __: any, ctx: any) => {
          const d = ctx?.payload;
          if (!d) return "";
          return `${d.pct}% (${d.minutes} / ${d.max} min)`;
        }}
      />
      <Bar dataKey="pct" fill="#60a5fa" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>


      {/* Resúmenes */}
<div className="mt-3 text-center text-xs text-neutral-400">
  Asistencia real del curso:
  <span className="ml-1 text-sky-400 font-semibold">
    {realPct} %
  </span>
</div>

<div className={`mt-1 text-center text-xs attendance-${status}`}>
  Institucional: <strong>{instAttended}</strong> / {instPossible}
  · Faltas: <strong>{absences}</strong> / 2
</div>

    </div>
  );
}
