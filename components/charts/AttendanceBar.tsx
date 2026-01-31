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

  // 🔥 confirmación de montaje
  console.log("AttendanceBar mounted", { studentId, course });

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching attendance...");

        const res = await fetch(
  `/api/attendance?student_id=${studentId}&course=2026_2&class=2026_2_01`,

          { cache: "no-store" }
        );

        if (!res.ok) {
          console.error("Attendance fetch failed", res.status);
          return;
        }

        const json = await res.json();

        // 🔥 LOG 1: respuesta cruda
        console.log("ATTENDANCE RAW JSON:", json);

        const attendance = json.attendance ?? {};

        // 🔥 LOG 2: objeto attendance
        console.log("ATTENDANCE OBJECT:", attendance);

        const parsed: Row[] = Object.entries(attendance)
          .filter(([, pct]) => pct !== null)
          .map(([session, pct]) => ({
            session,
            pct: Number(pct),
          }));

        // 🔥 LOG 3: datos finales para el chart
        console.log("PARSED ATTENDANCE DATA:", parsed);

        setData(parsed);
      } catch (err) {
        console.error("Error cargando asistencia:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId, course]);

  // =========================
  // RENDER
  // =========================

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando…</div>;
  }

  if (!data.length) {
    console.warn("AttendanceBar: data vacío tras parseo");
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
