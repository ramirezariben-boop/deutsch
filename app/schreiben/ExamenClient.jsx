"use client";

import { useState } from "react";

export default function ExamenClient() {
  const [texto, setTexto] = useState("");
  const [sent, setSent] = useState(false);

function handleSubmit() {
  console.log("Texto enviado:", texto);
  setSent(true);
}


  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-full max-w-4xl space-y-6">

        <div className="border-4 border-white rounded-xl p-4 bg-black w-full h-[70vh]">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full h-full bg-black text-white resize-none outline-none text-lg leading-relaxed caret-white"
            placeholder="Escribe aquí..."
          ></textarea>
        </div>

        {!sent ? (
          <button
  onClick={() => {
    const ok = confirm(
      "Solo puedes enviar tu examen una vez. ¿Deseas continuar?"
    );
    if (ok) handleSubmit();
  }}
  className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded text-white text-xl font-semibold"
>
  Enviar examen
</button>

        ) : (
          <p className="text-green-400 text-center text-xl font-semibold">
            ¡Tu examen ha sido enviado!
          </p>
        )}
      </div>
    </div>
  );
}
