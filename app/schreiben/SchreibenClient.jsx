"use client";

import { useState } from "react";

export default function SchreibenClient({ studentId }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nip, setNip] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendExam() {
    setLoading(true);

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, nip }),
      });

      if (res.status === 409) {
        setMessage("Ya habías enviado tu examen.");
        setSent(true);
      } else if (!res.ok) {
        const txt = await res.text();
        setMessage("Error: " + txt);
      } else {
        setSent(true);
        setMessage("¡Tu examen ha sido enviado!");
      }
    } catch (e) {
      setMessage("Error de red.");
    }

    setLoading(false);
    setShowModal(false);
  }

  function handleSubmit() {
    if (!text.trim()) {
      setMessage("No puedes enviar un examen vacío.");
      return;
    }

    // Mostrar advertencia + abrir modal del NIP
    alert("Solo puedes enviar este examen una vez.");
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">

        <div className="border-4 border-white rounded-xl p-4 h-[70vh]">
          <textarea
            disabled={sent}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full bg-black text-white resize-none outline-none text-lg"
            placeholder="Escribe aquí..."
          />
        </div>

        {message && (
          <p className="text-center text-xl text-green-400">{message}</p>
        )}

        {!sent && (
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-600 hover:bg-gray-700 p-3 rounded-lg text-xl"
          >
            Enviar examen
          </button>
        )}
      </div>

      {/* === Modal de NIP === */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl w-80 space-y-4">
            <h2 className="text-xl font-bold text-center">
              Ingresa tu NIP para confirmar
            </h2>

            <input
              type="password"
              maxLength={4}
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-500 text-center text-white text-lg"
            />

            <div className="flex gap-3">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded"
                disabled={loading}
                onClick={sendExam}
              >
                Confirmar
              </button>

              <button
                className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded"
                disabled={loading}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
