"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceDot,
} from "recharts";

type PunctualityRow = {
  class_id: string;
  session_id: "A" | "B" | "C";
  late_minutes: number | null;
  attendance_pct: number | null;
  minutes_attended: number | null;
  max_minutes: number | null;
};

type ChartStatus = "late" | "on_time" | "absent" | "unmeasured";

type ChartRow = {
  label: string;
  value: number;
  late: number | null;
  session: "A" | "B" | "C";
  status: ChartStatus;
};

export default function PunctualityBar({
  raw,
}: {
  raw: PunctualityRow[];
}) {
  const chartData: ChartRow[] = useMemo(() => {
    return raw
      .map((r, i) => {
        const m = r.class_id.match(/_(\d{2})$/);
        const classNum = m ? Number(m[1]) : i + 1;

        const late =
          r.late_minutes == null || r.late_minutes === ""
            ? null
            : Number(r.late_minutes);

        const attended =
          (r.minutes_attended != null && r.minutes_attended > 0) ||
          (r.attendance_pct != null && r.attendance_pct > 0);

        let status: ChartStatus;

        if (late != null) {
          status = late <= 0 ? "on_time" : "late";
        } else if (attended) {
          status = "unmeasured";
        } else {
          status = "absent";
        }

        return {
          label: `${classNum}${r.session_id}`,
          value: late != null && late > 0 ? late : 0,
          late,
          session: r.session_id,
          status,
        };
      })
      .sort((a, b) => {
        const nA = Number(a.label.match(/\d+/)?.[0] ?? 0);
        const nB = Number(b.label.match(/\d+/)?.[0] ?? 0);
        return nA - nB || a.label.localeCompare(b.label);
      });
  }, [raw]);

  const lateCount = chartData.filter((r) => r.status === "late").length;
  const onTimeCount = chartData.filter((r) => r.status === "on_time").length;
  const absentCount = chartData.filter((r) => r.status === "absent").length;
  const unmeasuredCount = chartData.filter((r) => r.status === "unmeasured").length;

  const avgLate = (() => {
    const lateRows = chartData.filter((r) => r.status === "late" && r.late != null);
    if (!lateRows.length) return 0;
    return +(
      lateRows.reduce((sum, r) => sum + (r.late ?? 0), 0) / lateRows.length
    ).toFixed(1);
  })();

  const maxLate = Math.max(...chartData.map((r) => r.value), 0);
  const yMax = Math.max(5, Math.ceil(maxLate + 2));

  if (!chartData.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay registros de puntualidad
      </div>
    );
  }

  function colorByLate(minutes: number) {
    if (minutes <= 0) return "rgba(34,197,94,0.78)";      // verde
    if (minutes <= 3) return "rgba(132,204,22,0.82)";     // verde-amarillo
    if (minutes <= 6) return "rgba(250,204,21,0.88)";     // amarillo
    if (minutes < 10) return "rgba(249,115,22,0.9)";      // naranja
    return "rgba(239,68,68,0.95)";                        // rojo
  }

  return (
    <div className="w-full">
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <YAxis
              domain={[0, yMax]}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              label={{
                value: "min tarde",
                angle: -90,
                position: "insideLeft",
                fill: "#9ca3af",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 8,
                color: "#ffffff",
              }}
              labelStyle={{ color: "#e5e7eb", fontWeight: 500 }}
	      itemStyle={{ color: "#ffffff" }}
              formatter={(_: any, __: any, ctx: any) => {
                const d = ctx?.payload;
                if (!d) return "";
                if (d.status === "absent") return "Sin asistencia";
                if (d.status === "unmeasured") return "Sin medición de puntualidad";
                if (d.status === "on_time") return "Puntual (0 min tarde)";
                return `${d.late} min tarde`;
              }}
            />

            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorByLate(entry.value)}
                />
              ))}
            </Bar>

            {chartData.map((entry, index) => {
              if (entry.status === "on_time") {
                return (
                  <ReferenceDot
                    key={`dot-on-time-${index}`}
                    x={entry.label}
                    y={0.6}
                    r={4}
                    fill="#22c55e"
                    stroke="none"
                  />
                );
              }

              if (entry.status === "absent") {
                return (
                  <ReferenceDot
                    key={`dot-absent-${index}`}
                    x={entry.label}
                    y={0.6}
                    r={4}
                    fill="#6b7280"
                    stroke="#9ca3af"
                  />
                );
              }

              if (entry.status === "unmeasured") {
                return (
                  <ReferenceDot
                    key={`dot-unmeasured-${index}`}
                    x={entry.label}
                    y={0.6}
                    r={4}
                    fill="#38bdf8"
                    stroke="none"
                  />
                );
              }

              return null;
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-400 space-y-1">
        <div>
          Puntual:
          <span className="ml-1 text-emerald-400 font-semibold">{onTimeCount}</span>
          {" · "}Tarde:
          <span className="ml-1 text-amber-400 font-semibold">{lateCount}</span>
          {" · "}Sin medición:
          <span className="ml-1 text-sky-400 font-semibold">{unmeasuredCount}</span>
          {" · "}Sin asistencia:
          <span className="ml-1 text-neutral-400 font-semibold">{absentCount}</span>
        </div>

        <div>
          Promedio de retraso
          <span className="ml-1 text-sky-400 font-semibold">{avgLate} min</span>
          <span className="ml-1 text-neutral-500"> (solo sesiones con retraso)</span>
        </div>

        <div className="text-[11px] text-neutral-500">
          Verde = puntual · barra = minutos tarde · azul = sin medición · gris = sin asistencia
        </div>
      </div>
    </div>
  );
}