"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function WritingAdmin() {
  const [exams, setExams] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // =========================
  // LOAD DATA (auto refresh)
  // =========================
  async function loadData() {
    const res = await fetch("/api/external-exam/admin/data");
    const json = await res.json();
    setExams(json.exams || []);
    setLogs(json.logs || []);
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 3000); // 🔥 refresco en vivo

    return () => clearInterval(interval);
  }, []);

  // =========================
  // STUDENTS WITH LOGS
  // =========================
  const studentsWithLogs = [
    ...new Set(logs.map((l) => l.studentId))
  ];

  // =========================
  // FILTRO ENTREGAS
  // =========================
  const filteredExams = exams.filter((e) => {
    if (!search) return true;
    return (
      e.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.studentId?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // =========================
  // LOGS SOSPECHOSOS
  // =========================
  const filteredLogs = logs.filter(
    (l) =>
      l.suspected === true &&
      (!selectedId || l.studentId === selectedId)
  );

  function suspiciousLogs(studentId: string) {
    return logs.filter(
      (l) => l.studentId === studentId && l.suspected === true
    );
  }

  function riskLevel(studentId: string) {
    const count = suspiciousLogs(studentId).length;

    if (count === 0)
      return <span className="text-green-400 font-semibold">🟢 Bajo</span>;
    if (count <= 2)
      return <span className="text-yellow-400 font-semibold">🟡 Medio</span>;
    return <span className="text-red-500 font-semibold">🔴 Alto</span>;
  }

  // =========================
  // HELPERS
  // =========================
  function formatDuration(ms: number) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return min > 0 ? `${min} min ${sec} seg` : `${sec} seg`;
  }

  function formatEventLabel(event: string) {
    if (event === "blur_duration") return "Cambio de pestaña";
    if (event === "paste") return "Copiar / pegar";
    if (event === "jump_detected") return "Salto brusco de texto";
    return event;
  }

  function formatLog(log: any) {
    if (!log.data) return "";

    try {
      const parsed =
        typeof log.data === "string"
          ? JSON.parse(log.data)
          : log.data;

      if (log.event === "blur_duration" && parsed?.durationMs) {
        return (
          <span>
            🟡 Cambio de pestaña durante{" "}
            <strong>{formatDuration(parsed.durationMs)}</strong>
          </span>
        );
      }

      if (log.event === "paste") {
        return "🔴 Se detectó acción de copiar/pegar";
      }

      if (log.event === "jump_detected") {
        return `⚠️ Se añadieron ${parsed.addedWords} palabras en pocos segundos`;
      }

      return "";
    } catch {
      return "";
    }
  }

  function totalBlurTime(studentId: string) {
    const blurLogs = logs.filter(
      (l) =>
        l.studentId === studentId &&
        l.event === "blur_duration"
    );

    let total = 0;

    blurLogs.forEach((log) => {
      try {
        const parsed = JSON.parse(log.data);
        if (parsed?.durationMs) {
          total += parsed.durationMs;
        }
      } catch {}
    });

    return total;
  }

  // =========================
  // BUILD TIMELINE
  // =========================
  function buildWordTimeline(studentId: string) {
    const typingLogs = logs
      .filter(
        (l) =>
          l.studentId === studentId &&
          l.event === "typing"
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      );

    return typingLogs
      .map((log) => {
        try {
          let parsed;

          if (typeof log.data === "string") {
            try {
              parsed = JSON.parse(log.data);
            } catch {
              const words = log.data.trim()
                ? log.data.trim().split(/\s+/).length
                : 0;

              return {
                time: new Date(log.createdAt).toLocaleTimeString(),
                words
              };
            }
          } else {
            parsed = log.data;
          }

          return {
            time: new Date(log.createdAt).toLocaleTimeString(),
            words: parsed?.wordCount || 0
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="p-10 text-white space-y-8">
      <h1 className="text-3xl font-bold">
        📝 Panel de Entregas – Writing
      </h1>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por nombre o ID..."
        className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded w-80"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ========================= */}
      {/* SELECTOR SIEMPRE VISIBLE */}
      {/* ========================= */}
      <div className="mt-6">
        <label className="mr-2 font-semibold">
          Monitorear alumno:
        </label>
        <select
          className="bg-neutral-800 p-2 border border-neutral-700"
          value={selectedId || ""}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">-- Elegir --</option>
          {studentsWithLogs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {/* ========================= */}
      {/* GRÁFICO EN VIVO */}
      {/* ========================= */}
      {selectedId && (
        <div className="mt-6 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          <h3 className="mb-4 font-semibold text-lg">
            Evolución de palabras en el tiempo
          </h3>

          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={buildWordTimeline(selectedId)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="words"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 text-sm text-neutral-400">
            Total fuera de pestaña:{" "}
            {formatDuration(totalBlurTime(selectedId))}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* LOGS SOSPECHOSOS */}
      {/* ========================= */}
      <div>
        <h2 className="text-xl font-semibold mt-8">
          🚨 Eventos sospechosos
        </h2>

        <table className="w-full text-left border border-neutral-700 mt-3">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Evento</th>
              <th className="p-3">Detalle</th>
              <th className="p-3">Hora</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-neutral-700 bg-red-900/30"
              >
                <td className="p-3">{log.studentId}</td>
                <td className="p-3">
                  {formatEventLabel(log.event)}
                </td>
                <td className="p-3">
                  {formatLog(log)}
                </td>
                <td className="p-3">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}