"use client";

import { useEffect, useState } from "react";
import type { StudentMetricsResponse } from "@/lib/levels/types";
import AlumnoLevelTooltip from "./AlumnoLevelTooltip";

export default function AlumnoLevelBadge() {
  const [data, setData] = useState<StudentMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setFailed(false);

        const res = await fetch("/api/student-metrics", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("No se pudo cargar el nivel.");
        }

        const json: StudentMetricsResponse = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <span className="text-neutral-400">…</span>;
  if (failed || !data?.level) return <span className="text-neutral-400">—</span>;

  return (
    <span className="group relative inline-flex items-center">
      <span className="cursor-help underline decoration-dotted underline-offset-4 text-neutral-200">
        Nivel {data.level.currentLevel}
      </span>

      <AlumnoLevelTooltip level={data.level} />
    </span>
  );
}