"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Row = {
  session: string;
  pct: number | null;
};

export default function AttendanceBar({
  studentId,
  course,
}: {
  studentId: number;
  course: string;
}) {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/attendance?student_id=${studentId}&course=${course}&class=2026_2_01`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const json = await res.json();
        const attendance = json.attendance ?? {};

        const parsed = Object.entries(attendance).map(
          ([session, pct]) => ({
            session,
            pct,
          })
        );

        setData(parsed);
      } catch (err) {
        console.error("Error cargando asistencia:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId, course]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!data.some(d => d.pct !== null)) {
    return (
      <div className="text-sm text-neutral-400">
        No hay registros de asistencia
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="session" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(v: any) => v === null ? "—" : `${v}%`} />
          <Bar dataKey="pct" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
