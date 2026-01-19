"use client";

import React from "react";

export default function ExamTimeline({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) return null;

  // ordenar por fecha por si acaso
  logs = [...logs].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const start = new Date(logs[0].createdAt).getTime();

  const fmt = (ms: number) => {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  function renderEvent(log: any) {
    const t = new Date(log.createdAt).getTime();
    const time = fmt(t - start);

    switch (log.event) {
      case "snapshot":
        return (
          <Event time={time} icon="✏️" color="text-green-300">
            Snapshot ({log.data?.length ?? 0} caracteres)
          </Event>
        );

      case "paste":
        return (
          <Event time={time} icon="📋" color="text-yellow-300">
            Pegó texto ({log.data?.length ?? 0} chars)
          </Event>
        );

      case "blur":
      case "window-blur":
        return (
          <Event time={time} icon="🚪" color="text-orange-300">
            Salió de la ventana
          </Event>
        );

      case "focus":
      case "window-focus":
        return (
          <Event time={time} icon="🔙" color="text-blue-300">
            Regresó a la ventana
          </Event>
        );

      case "final_submit":
        return (
          <Event time={time} icon="✅" color="text-green-400">
            Envío final del examen
          </Event>
        );

      default:
        return (
          <Event time={time} icon="❓" color="text-neutral-400">
            {log.event}
          </Event>
        );
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <h2 className="text-neutral-200 text-lg mb-4">Timeline del proceso</h2>

      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i}>{renderEvent(log)}</div>
        ))}
      </div>
    </div>
  );
}

function Event({
  time,
  icon,
  color,
  children,
}: {
  time: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-neutral-500 w-14 text-sm">{time}</div>
      <div className={`text-xl ${color}`}>{icon}</div>
      <div className="text-neutral-200 text-sm">{children}</div>
    </div>
  );
}
