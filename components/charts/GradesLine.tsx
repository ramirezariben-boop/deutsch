"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
    <div className="flex justify-center">
      <LineChart width={620} height={260} data={data}>
        <XAxis dataKey="key" />
        <YAxis domain={[0, 100]} />
        <Tooltip
          formatter={(v: any) =>
            v == null ? "Pendiente (no afecta promedio)" : `${v}%`
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
    </div>
  );
}
