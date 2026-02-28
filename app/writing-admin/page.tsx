"use client";

import { useEffect, useState } from "react";

const [filter, setFilter] = useState("");

export default function WritingAdmin() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/external-exam/admin/list")
      .then(res => res.json())
      .then(setExams);
  }, []);

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-xl mb-6">Exámenes Writing</h1>

<button
  className="mb-6 bg-purple-600 px-4 py-2 rounded"
  onClick={() => window.open("/api/external-exam/admin/pdf-all")}
>
  Exportar todos en PDF
</button>

<input
  placeholder="Filtrar por nombre..."
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="mb-6 p-2 bg-black border border-white"
/>

{exams
  .filter(e =>
    e.student.name.toLowerCase().includes(filter.toLowerCase())
  )
  .map((e) => (
        <div key={e.id} className="mb-8 border border-gray-600 p-4 rounded">
          <h2 className="font-semibold">
            {e.student.name} ({e.studentId})
          </h2>

          <p className="text-sm text-gray-400">
            Palabras: {e.wordCount} | Caracteres: {e.charCount}
          </p>

          <pre className="whitespace-pre-wrap mt-3 text-sm">
            {e.textFinal}
          </pre>

          <button
            className="mt-3 bg-blue-600 px-4 py-1 rounded"
            onClick={() => window.open(`/api/external-exam/admin/pdf/${e.id}`)}
          >
            Exportar PDF
          </button>
        </div>
      ))}
    </div>
  );
}