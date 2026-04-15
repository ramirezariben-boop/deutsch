"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type HistoryRow = {
  student_id: number;
  full_name: string;
  course_id: string;
  attendance_real_pct: number | null;
  minutes_attended_total: number | null;
  minutes_possible_total: number | null;
  institutional_attended: number | null;
  institutional_possible: number | null;
  absences: number | null;
  avg_late_minutes: number | null;
  measured_sessions_count: number | null;
  consolidated_at: string;
};

type ChartRow = {
  label: string;
  pct: number;
  course_id: string;
  minutes_attended_total: number;
  minutes_possible_total: number;
  institutional_attended: number;
  institutional_possible: number;
  absences: number;
  avg_late_minutes: number | null;
  measured_sessions_count: number;
};

export default function AttendanceHistoryBar({
  studentId,
}: {
  studentId: number;
}) {
  const [raw, setRaw] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<ChartRow | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `/api/attendance-history?student_id=${studentId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Fetch failed");

        const json = await res.json();

        if (!cancelled) {
          setRaw(Array.isArray(json) ? json : []);
        }
      } catch (err) {
        console.error("AttendanceHistory fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const chartData: ChartRow[] = useMemo(() => {
    return raw
      .map((r) => ({
        label: r.course_id,
        pct: r.attendance_real_pct ?? 0,
        course_id: r.course_id,
        minutes_attended_total: r.minutes_attended_total ?? 0,
        minutes_possible_total: r.minutes_possible_total ?? 0,
        institutional_attended: r.institutional_attended ?? 0,
        institutional_possible: r.institutional_possible ?? 0,
        absences: r.absences ?? 0,
        avg_late_minutes: r.avg_late_minutes,
        measured_sessions_count: r.measured_sessions_count ?? 0,
      }))
      .sort((a, b) => a.course_id.localeCompare(b.course_id));
  }, [raw]);

  useEffect(() => {
    if (!hovered && chartData.length) {
      setHovered(chartData[chartData.length - 1]);
    }
  }, [chartData, hovered]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!chartData.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay historial de asistencia
      </div>
    );
  }

  function colorByPct(pct: number) {
    if (pct >= 90) return "rgba(34,197,94,0.85)";
    if (pct >= 80) return "rgba(59,130,246,0.82)";
    if (pct >= 70) return "rgba(250,204,21,0.86)";
    return "rgba(239,68,68,0.88)";
  }

  function summaryColor(absences: number) {
    if (absences >= 2) return "text-red-400";
    if (absences > 0) return "text-yellow-400";
    return "text-emerald-400";
  }

  const selected = hovered ?? chartData[chartData.length - 1];

  return (
    <div className="w-full">
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            onMouseMove={(state: any) => {
              const row = state?.activePayload?.[0]?.payload;
              if (row) setHovered(row);
            }}
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
              content={() => null}
            />

            <Bar
              dataKey="pct"
              radius={[6, 6, 0, 0]}
              activeBar={{
                stroke: "#e5e7eb",
                strokeWidth: 1.5,
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorByPct(entry.pct)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-400 space-y-1">
        <div className="text-sky-300 font-semibold">
          {selected.course_id}
        </div>

        <div className="text-neutral-300">
          Asistencia real:
          <span className="ml-1 text-sky-400 font-semibold">
            {selected.pct.toFixed(2)}%
          </span>
        </div>

        <div className={summaryColor(selected.absences)}>
          Institucional: <strong>{selected.institutional_attended}</strong> / {selected.institutional_possible}
          {" · "}
          Faltas: <strong>{selected.absences}</strong> / 2
        </div>

        <div className="text-neutral-400">
          Retraso promedio:
          <span className="ml-1 text-sky-400 font-semibold">
            {selected.avg_late_minutes == null ? "—" : `${selected.avg_late_minutes} min`}
          </span>
        </div>

        <div className="text-[11px] text-neutral-500">
          Una barra por curso consolidado
        </div>
      </div>
    </div>
  );
}