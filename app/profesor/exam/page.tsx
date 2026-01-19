"use client";

import { useEffect, useState } from "react";

export default function ExamPanel() {
  const [exams, setExams] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  async function loadData() {
    const res = await fetch("/api/profesor/exam/data");
    const json = await res.json();
    setExams(json.exams);
    setLogs(json.logs);
  }

  useEffect(() => {
    loadData();
  }, []);

  // ==============================
  // Filtros
  // ==============================
  const filteredLogs = logs.filter((l: any) => {
    if (selectedStudent && l.studentId !== selectedStudent) return false;
    if (search && !String(l.studentId).includes(search)) return false;
    return true;
  });

  // ==============================
  // Links útiles
  // ==============================
  const apiLinks = [
    { label: "API Exam Data", url: "/api/profesor/exam/data" },
    { label: "API Writing Logs (todos)", url: "/api/writing-log" },
    { label: "API Events (todos)", url: "/api/exam/event" },
    { label: "API Exámenes (solo escritos)", url: "/api/exam/all" },
  ];

  const studentLinks = (id: number) => [
    { label: "Ver escritura en vivo", url: `/schreiben/admin/live/${id}` },
    { label: "Ver admin/ID", url: `/schreiben/admin/${id}` },
    { label: "API Logs del alumno", url: `/api/writing-log/${id}` },
    { label: "API Stream SSE", url: `/api/exam/stream?studentId=${id}` },
    { label: "API Lista de eventos", url: `/api/exam/list?studentId=${id}` },
    { label: "API Logs sospechosos", url: `/api/exam/log?studentId=${id}` },
  ];

  // =================================
  // Exportar JSON
  // =================================
  function exportJson() {
    const blob = new Blob([JSON.stringify({ exams, logs }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exam-dump.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 text-white space-y-10">
      <h1 className="text-3xl font-bold mb-4">📘 Panel de Examen</h1>

      {/* ===================== */}
      {/* TOOLS */}
      {/* ===================== */}
      <div className="border border-gray-700 p-4 rounded-xl bg-black/40 space-y-4">
        <h2 className="text-xl font-bold">🔧 Herramientas del Profesor</h2>

        <div className="flex gap-4 flex-wrap">
          {apiLinks.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              className="px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              {l.label}
            </a>
          ))}

          <button
            onClick={exportJson}
            className="px-3 py-2 bg-green-700 rounded hover:bg-green-600"
          >
            Exportar JSON
          </button>

          <button
            onClick={loadData}
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600"
          >
            Recargar datos
          </button>
        </div>
      </div>

      {/* ===================== */}
      {/* SEARCH */}
      {/* ===================== */}
      <div>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar alumno por ID..."
          className="px-3 py-2 bg-gray-900 border border-gray-700 rounded w-64"
        />
      </div>

      {/* ===================== */}
      {/* ENTREGAS */}
      {/* ===================== */}
      <h2 className="text-xl font-semibold mt-6 mb-2">📝 Entregas</h2>

      <table className="w-full text-left border">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Alumno</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Texto</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam: any) => {
            const countSuspicious = logs.filter(
              (l: any) => l.studentId === exam.studentId && l.suspected
            ).length;

            return (
              <tr
                key={exam.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="p-2">
                  {exam.studentId}
                  {countSuspicious > 0 && (
                    <span className="text-red-400 text-sm ml-2">
                      ({countSuspicious} ⚠️)
                    </span>
                  )}
                </td>
                <td className="p-2">
                  {new Date(exam.createdAt).toLocaleString()}
                </td>
                <td className="p-2 truncate max-w-md">{exam.text}</td>

                <td className="p-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-700 rounded hover:bg-blue-600"
                    onClick={() => setSelectedStudent(exam.studentId)}
                  >
                    Ver logs
                  </button>

                  <details className="inline-block">
                    <summary className="cursor-pointer px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
                      Más
                    </summary>
                    <div className="mt-2 p-2 bg-gray-900 rounded space-y-1">
                      {studentLinks(exam.studentId).map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          className="block text-blue-300 hover:text-blue-500 text-sm"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </details>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ===================== */}
      {/* LOGS */}
      {/* ===================== */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        🚨 Logs sospechosos {selectedStudent && `(Alumno ${selectedStudent})`}
      </h2>

      {selectedStudent && (
        <div className="flex gap-4 mb-4 flex-wrap">
          {studentLinks(selectedStudent).map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <table className="w-full text-left border">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Alumno</th>
            <th className="p-2">Evento</th>
            <th className="p-2">Data</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log: any) => (
            <tr
              key={log.id}
              className={`border-b border-gray-700 ${
                log.suspected ? "bg-red-900/40" : ""
              }`}
            >
              <td className="p-2">{log.studentId}</td>
              <td className="p-2">{log.event}</td>
              <td className="p-2 max-w-sm truncate">{log.data}</td>
              <td className="p-2">
                {new Date(log.createdAt).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600"
        onClick={() => setSelectedStudent(null)}
      >
        Ver todos los alumnos
      </button>
    </div>
  );
}
