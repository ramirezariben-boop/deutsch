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

function getBarColor(
  pct: number,
  session: "A" | "B" | "C"
) {
  // estado crítico domina
  if (pct < 50) return "#ef4444";     // rojo
  if (pct < 80) return "#facc15";     // amarillo

  // estado OK → color por sesión
  if (session === "A") return "#60a5fa"; // azul
  if (session === "B") return "#a78bfa"; // violeta
  return "#22d3ee";                     // cyan
}


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
            cursor={{ fill: "rgba(255,255,255,0.06)" }}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: 8,
              fontSize: "12px",
            }}
            formatter={(_: any, __: any, ctx: any) => {
              const d = ctx.payload;
              return `${d.pct}% (${d.minutes} / ${d.max} min)`;
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
                fill={getBarColor(entry.pct, entry.session)}
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
