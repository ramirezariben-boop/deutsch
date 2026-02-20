"use client";

import { useState } from "react";
import AlumnoCard from "@/components/alumno/AlumnoCard";

type Alumno = {
  id: number;
  name: string;
  course: string;
  list_number: number | null;
};

export default function SchuelerClient({ alumno }: { alumno: Alumno }) {
  const [showAlumno, setShowAlumno] = useState(true);

  return (
    <div className="p-10 text-white relative">
      <div className="text-sm text-gray-400 mb-4">Versión Beta</div>

      <h1 className="text-3xl font-bold mb-10">Willkommen!</h1>

      {/* ===== CONTENIDO NORMAL (NO SE MUEVE) ===== */}
      <div className="flex justify-between px-12 gap-12">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
          <a
            href="https://classroom-trading.ariiben.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            📈 Trading 📊
          </a>

          <a
            href="https://classroom.google.com/c/NzkyODQ5MTgyOTkx"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤑 Extra MXP 💰
          </a>

          <a
            href="https://lyrickahoot.ariiben.com/game/player.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🎶 Lyrickahoot! 🧩
          </a>

          <a
            href="https://race-panel.onrender.com/student.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            ✋ Nimm teil! 🏆
          </a>

          <a
            href="https://grammatik.ariiben.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤓 Grammatik 📚
          </a>

{/* */}
          <a
            href="https://deutsch.ariiben.com/schreiben"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🧾 Schreiben
          </a>

        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          <a
            href="https://spaces.ariiben.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🏙️ Spaces 🏫
          </a>

          <a
            href="https://www.roblox.com/users/2979430065/profile#!#creations"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤖 Roblox 🌎
          </a>

          <a
            href="https://www.youtube.com/@AriiBen"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            ▶️ YouTube 🎥
          </a>

          <a
            href="https://class.ariiben.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            📚 Privatunterricht 📖
          </a>
        </div>
      </div>

      {/* ===== PANEL CENTRAL FLOTANTE (NO BLOQUEA LOS BOTONES) ===== */}
      {showAlumno && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <AlumnoCard alumno={alumno} />
          </div>
        </div>
      )}

      {/* (opcional) botón para ocultar/mostrar el panel sin afectar nada */}
      {/* <button onClick={() => setShowAlumno((s) => !s)} className="mt-8 text-xs text-neutral-400 underline">
        Toggle panel
      </button> */}
    </div>
  );
}
