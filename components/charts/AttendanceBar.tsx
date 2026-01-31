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

type AttendanceRow = {
  session_id: string;
  attendance_pct: number | string | null;
};

type Row = {
  session: string;
  pct: number;
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

        const rows: AttendanceRow[] = json.attendance ?? [];

        const parsed: Row[] = rows
          .filter(r => r.attendance_pct !== null) // null ≠ 0
          .map(r => ({
            session: `Sesión ${r.session_id}`,
            pct: Number(r.attendance_pct),
          }));

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

  if (!data.length) {
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
          <Tooltip formatter={(v: any) => `${v}%`} />
          <Bar dataKey="pct" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
