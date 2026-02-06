"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type AttendanceRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  attendance_pct: number;
  minutes_attended: number;
  max_minutes: number;
};

type ChartRow = {
  label: string;
  pct: number;
  minutes: number;
  max: number;
  session: "A" | "B" | "C";
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
console.log(
  "RAW attendance (debug)",
  json
    .filter((r: any) => String(r.student_id) === "7")
    .map(r => ({
      student_id: r.student_id,
      typeof_student_id: typeof r.student_id,
      class_id: r.class_id,
      session_id: r.session_id,
      minutes: r.minutes_attended,
    }))
);


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

const minutes =
  r.minutes_attended != null
    ? r.minutes_attended
    : r.attendance_pct != null && r.max_minutes
    ? +(r.attendance_pct / 100 * r.max_minutes).toFixed(2)
    : 0;

const max = r.max_minutes ?? 0;

const pct =
  max > 0 ? +(minutes / max * 100).toFixed(2) : 0;


      return {
        label: `${classNum}${r.session_id}`,
        pct,                 // ✅ SIEMPRE número
        minutes,
        max,
        session: r.session_id,
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
  const totalMinutes = raw.reduce(
  (s, r) => s + (r.minutes_attended ?? 0),
  0
);

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
  const pct =
    r.attendance_pct ??
    (r.max_minutes > 0 && r.minutes_attended != null
      ? (r.minutes_attended / r.max_minutes) * 100
      : 0);

  return pct >= 50;
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

const SESSION_COLORS = {
  A: [96, 165, 250],  // azul
  B: [167, 139, 250], // violeta
  C: [34, 211, 238],  // cyan
};


function colorByPct(
  pct: number,
  session: "A" | "B" | "C"
) {
  const [r, g, b] = SESSION_COLORS[session];

  // clamp 40–100 → 0.4–1
  const intensity = Math.max(0.4, Math.min(1, pct / 100));

  return `rgba(${r}, ${g}, ${b}, ${intensity})`;
}


return (
  <div className="w-full">
    {/* ===== CHART ===== */}
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

<Tooltip
  cursor={{ fill: "rgba(255,255,255,0.05)" }}
  contentStyle={{
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: 8,
    color: "#ffffff",          // 👈 TEXTO BLANCO
  }}
  labelStyle={{
    color: "#e5e7eb",          // 👈 label (1A, 2B…) claro
    fontWeight: 500,
  }}
  itemStyle={{
    color: "#ffffff",          // 👈 valor pct / minutos
  }}
formatter={(_: any, __: any, ctx: any) => {
  const d = ctx.payload;
  const mins = d.minutes ?? 0;
  const max = d.max ?? 0;
  return `${d.pct}% (${mins} / ${max} min)`;
}}
/>

          <Bar
            dataKey="pct"
            radius={[6, 6, 0, 0]}
            activeBar={{
              fill: "#e0f2fe",
              stroke: "#38bdf8",
              strokeWidth: 2,
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorByPct(entry.pct, entry.session)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* ===== RESUMEN ===== */}
    <div className="mt-4 text-center text-xs text-neutral-400 space-y-1">
      <div>
        Asistencia real del curso:
        <span className="ml-1 text-sky-400 font-semibold">
          {realPct} %
        </span>
      </div>

      <div
        className={
          status === "danger"
            ? "text-red-400"
            : status === "warning"
            ? "text-yellow-400"
            : "text-emerald-400"
        }
      >
        Institucional: <strong>{instAttended}</strong> / {instPossible}
        · Faltas: <strong>{absences}</strong> / 2
      </div>
    </div>
  </div>
);

}
