"use client";

import type { ResolvedStudentLevel } from "@/lib/levels/studentLevel";

export default function AlumnoLevelTooltip({
  level,
}: {
  level: ResolvedStudentLevel;
}) {
  return (
    <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-[340px] rounded-xl border border-neutral-700 bg-neutral-950/95 p-3 text-xs shadow-2xl group-hover:block">
      <div className="mb-1 text-sm font-semibold text-white">
        Nivel {level.currentLevel}
      </div>

      <div className="mb-3 text-neutral-400">
        Se obtiene con {level.requiredToPass} de 5 métricas.
      </div>

      <div className="mb-2 text-[11px] uppercase tracking-wide text-neutral-500">
        Estado actual
      </div>

      {level.current.conditions.length === 0 ? (
        <div className="text-neutral-400">
          Aún no hay suficientes métricas para asignar un nivel.
        </div>
      ) : (
        <div className="space-y-1.5">
          {level.current.conditions.map((m) => (
            <div
              key={`current-${m.key}`}
              className="flex items-center justify-between gap-3"
            >
              <span className={m.passed ? "text-emerald-300" : "text-rose-300"}>
                {m.passed ? "✓" : "✕"} {m.label}
              </span>
              <span className="text-neutral-300">{m.valueLabel}</span>
            </div>
          ))}
        </div>
      )}

      {level.next && (
        <>
          <div className="my-3 h-px bg-neutral-800" />

          <div className="mb-2 text-[11px] uppercase tracking-wide text-neutral-500">
            Para nivel {level.next.level} faltan
          </div>

          <div className="space-y-1.5">
            {level.next.missing.length === 0 ? (
              <div className="text-emerald-300">Ya cumple todo.</div>
            ) : (
              level.next.missing.map((m) => (
                <div
                  key={`next-${m.key}`}
                  className="flex items-start justify-between gap-3"
                >
                  <span className="text-amber-300">{m.label}</span>
                  <span className="text-right text-neutral-400">
                    actual {m.valueLabel} · meta {m.targetLabel}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}