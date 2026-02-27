"use client";

import { useState } from "react";
import FeedbackExamen from "./FeedbackExamen";

type Props = {
  studentId: number;
};

export default function Progreso({ studentId }: Props) {
  const [view, setView] =
    useState<"resumen" | "feedback">("resumen");

  return (
    <div className="space-y-6">

      <div className="flex gap-2">
        <button
          onClick={() => setView("resumen")}
          className="px-4 py-2 bg-neutral-800 rounded"
        >
          Resumen
        </button>

        <button
          onClick={() => setView("feedback")}
          className="px-4 py-2 bg-neutral-800 rounded"
        >
          Feedback
        </button>
      </div>

      {view === "resumen" && (
        <div className="bg-neutral-900 p-4 rounded">
          Aquí irá el resumen detallado.
        </div>
      )}

      {view === "feedback" && (
        <FeedbackExamen studentId={studentId} />
      )}

    </div>
  );
}