"use client";

import { useState } from "react";
import AlumnoCard from "@/components/alumno/AlumnoCard";
import { SpieleDrop } from "@/components/SpieleDrop";

type Alumno = {
  id: number | string;
  name: string;

  points?: number | null;
  isCurrent?: boolean;
  listNumber?: number | null;

  course?: string | null;
  courseId?: string | null;
  resolvedCourseId?: string | null;

  nivelActual?: string | null;
  day?: "SAM" | "SON" | "PRIV" | null;
  privCode?: string | null;
};

export default function SchuelerClient({ alumno }: { alumno: Alumno }) {
  const isAdmin = Number(alumno.id) === 64;
  const [cardVisible, setCardVisible] = useState(true);

  return (
    <div className="p-10 text-white relative">
      <div className="text-sm text-gray-400 mb-4">Versión Beta</div>

      <h1 className="text-3xl font-bold mb-10">Willkommen!</h1>

      <div className="flex justify-between px-12 gap-12">
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
            href="https://classroom.google.com/c/NzkyODQ5MTgyOTkx?hl=es&cjc=yuqnyyqw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤑 Extra MXP 💰
          </a>

          <SpieleDrop />

          <a
            href="https://race-panel.onrender.com/student.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            ✋ Nimm teil! 🏆
          </a>

          <a
            href="https://deutsch.ariiben.com/missions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            ⏱️ Missionen 👨‍💻
          </a>

          <a
            href="https://grammatik.ariiben.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤓 Grammatik 📚
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="https://deutsch.ariiben.com/schueler/checkin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            💫 CheckIn ✨
          </a>
          <a
            href="https://house-three-ochre.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            💬 Sprechhaus 🏠
          </a>

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

          {isAdmin && (
            <button
              onClick={() => window.open("/api/admin/exam-eligibility", "_blank")}
              className="px-6 py-2 bg-red-700 hover:bg-red-800 rounded text-center w-56"
            >
              🚫 Bajas por faltas
            </button>
          )}
        </div>
      </div>

      {cardVisible ? (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <AlumnoCard alumno={alumno} onMinimize={() => setCardVisible(false)} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCardVisible(true)}
          title="Mostrar mi tarjeta"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-neutral-400 hover:text-neutral-200 text-sm shadow-lg backdrop-blur-sm transition-colors"
        >
          👤
        </button>
      )}

      <footer className="mt-16 mb-6 text-center text-sm text-neutral-500">
        <p className="text-xs text-neutral-500 max-w-xl mx-auto mb-3 leading-relaxed">
          La información mostrada en este panel tiene fines informativos y de
          retroalimentación académica y no sustituye los registros oficiales
          de la institución.
        </p>

        AriiBen © · Deutsch mit AriiBen ·{" "}
        <a
          href="https://legal.ariiben.com/es/privacy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300"
        >
          Privacy
        </a>{" "}
        ·{" "}
        <a
          href="https://legal.ariiben.com/es/terms.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300"
        >
          Terms
        </a>{" "}
        ·{" "}
        <a
          href="https://legal.ariiben.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300"
        >
          Legal
        </a>
      </footer>
    </div>
  );
}