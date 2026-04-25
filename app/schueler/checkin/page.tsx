"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const METRICS = [
  {
    id: "confidence" as const,
    label: "Confianza",
    low: "Me siento perdido",
    high: "Lo entiendo bien",
  },
  {
    id: "motivation" as const,
    label: "Motivación",
    low: "Me aburre mucho",
    high: "Me entusiasma",
  },
  {
    id: "frustration" as const,
    label: "Frustración",
    low: "Para nada frustrado",
    high: "Muy frustrado",
  },
];

type MetricId = "confidence" | "motivation" | "frustration";

function CheckInForm() {
  const searchParams = useSearchParams();
  const triggeredBy = searchParams.get("from") ?? "manual";

  const [values, setValues] = useState<Record<MetricId, number>>({
    confidence: 3,
    motivation: 3,
    frustration: 1,
  });
  const [reflection, setReflection] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const r = await fetch("/api/emotional-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, reflection, triggeredBy }),
      });
      if (!r.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Error al enviar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl text-white/80 mb-2">¡Gracias!</p>
          <p className="text-sm text-white/40">Tu respuesta fue registrada.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 max-w-lg mx-auto">
      <h1 className="text-lg font-semibold text-white/90 mb-1">
        ¿Cómo te sientes hoy?
      </h1>
      <p className="text-sm text-white/45 mb-6">
        Tus respuestas son anónimas para el grupo.
      </p>

      <div className="space-y-4">
        {METRICS.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white/80">
                {m.label}
              </span>
              <span className="text-xs text-white/35">{values[m.id]} / 5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={values[m.id]}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [m.id]: Number(e.target.value),
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-white/30">{m.low}</span>
              <span className="text-xs text-white/30">{m.high}</span>
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-sm font-medium text-white/80 block mb-2">
            Reflexión libre{" "}
            <span className="text-white/30 font-normal">(opcional)</span>
          </span>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="¿Algo que quieras compartir sobre la clase?"
            className="w-full min-h-[80px] rounded-lg border border-white/10 bg-black/30 p-2 text-sm text-white/80 placeholder:text-white/30 outline-none focus:border-white/20 resize-none"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <button
        onClick={submit}
        disabled={sending}
        className="mt-6 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-700 disabled:text-neutral-500 px-4 py-2.5 text-sm font-medium text-white transition"
      >
        {sending ? "Enviando..." : "Enviar"}
      </button>
    </main>
  );
}

export default function CheckInPage() {
  return (
    <Suspense>
      <CheckInForm />
    </Suspense>
  );
}
