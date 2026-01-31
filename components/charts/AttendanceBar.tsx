"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Row = {
  session: string;
  pct: number;
};

export default function AttendanceBar({ studentId }: { studentId: number }) {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/attendance?student_id=${studentId}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const json = await res.json();
        const rows = Array.isArray(json)
          ? json
          : json.attendance ?? [];

        setData(
          rows.map((r: any) => ({
            session: `Sesión ${r.session_id}`,
            pct: Number(Number(r.attendance_pct).toFixed(2)),
          }))
        );
      } catch (err) {
        console.error("Error cargando asistencia:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!data.length) {
    return (
      <div className="text-sm text-neutral-400">
        No hay registros de asistencia
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <BarChart width={620} height={260} data={data}>
        <XAxis dataKey="session" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(v: any) => `${v}%`} />
        <Bar dataKey="pct" fill="#60a5fa" />
      </BarChart>
    </div>
  );
}
