"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GradePoint = {
  key: string;
  value: number | null;
};

export default function GradesLine({
  studentId,
  course,
}: {
  studentId: number;
  course: string;
}) {
  const [data, setData] = useState<GradePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/grades?student_id=${studentId}&course=${course}`,
          { cache: "no-store" }
        );
        if (!res.ok) return;

        const json = await res.json();
        setData(json.grades ?? []);
      } catch (err) {
        console.error("Error cargando calificaciones:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId, course]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!data.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay calificaciones registradas
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <XAxis
              dataKey="key"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 8,
                color: "#ffffff",
              }}
              labelStyle={{ color: "#e5e7eb" }}
              itemStyle={{ color: "#ffffff" }}
              formatter={(v: any) =>
                v == null
                  ? "Pendiente (no afecta promedio)"
                  : `${v}%`
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              connectNulls={false}
              dot={({ cx, cy, payload }) =>
                payload.value == null ? null : (
                  <circle cx={cx} cy={cy} r={4} fill="#60a5fa" />
                )
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
