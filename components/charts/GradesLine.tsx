"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

type GradePoint = {
  key: string;
  value: number | null;
};

type GradesResponse = {
  student_id: number;
  course: string | null;
  hasCurrentCourseData: boolean;
  grades: GradePoint[];
};

export default function GradesLine({
  studentId,
}: {
  studentId: number;
}) {
  const [data, setData] = useState<GradePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCurrentCourseData, setHasCurrentCourseData] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/grades?student_id=${studentId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setData([]);
          setHasCurrentCourseData(false);
          return;
        }

        const json: GradesResponse = await res.json();

        setHasCurrentCourseData(Boolean(json.hasCurrentCourseData));
        setData(Array.isArray(json.grades) ? json.grades : []);
      } catch (err) {
        console.error("Error cargando calificaciones:", err);
        setData([]);
        setHasCurrentCourseData(false);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!hasCurrentCourseData || !data.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay prácticas del curso actual.
      </div>
    );
  }

  const graded = data.filter((d) => d.value != null);

  const avgPractices = graded.length
    ? graded.reduce((s, d) => s + (d.value ?? 0), 0) / graded.length
    : 0;

  const finalContribution = avgPractices * 0.1;

  return (
    <div className="w-full min-w-0">
      <div className="w-full h-[260px] min-w-0">
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
            />

            <ReferenceLine
              y={avgPractices}
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeOpacity={0.35}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={2}
              isAnimationActive
              connectNulls={false}
              dot={({ cx, cy, payload }) =>
                payload.value == null ? null : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#60a5fa"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(96,165,250,0.6))",
                    }}
                  />
                )
              }
              activeDot={{
                r: 6,
                fill: "#93c5fd",
                style: {
                  filter: "drop-shadow(0 0 8px rgba(147,197,253,0.9))",
                },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-400 space-y-1">
        <div>
          Promedio de prácticas:
          <span className="ml-1 text-sky-400 font-semibold">
            {avgPractices.toFixed(1)}
          </span>
        </div>

        <div className="text-emerald-400">
          Aporta al curso:
          <strong className="ml-1">
            {finalContribution.toFixed(1)}
          </strong>
          / 10 puntos
        </div>
      </div>
    </div>
  );
}