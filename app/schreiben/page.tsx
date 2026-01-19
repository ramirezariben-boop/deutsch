"use client";

if (typeof window !== "undefined") console.log("SCHREIBEN CARGÓ");

import { useState, useEffect, useRef } from "react";

function getStudentId() {
  const c = document.cookie.split("; ").find((x) => x.startsWith("session="));
  return Number(c?.split("=")[1] ?? 0);
}

export default function Schreiben() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // ✅ AQUÍ va el hook

  const pendingText = useRef("");
  const lastSavedText = useRef("");

  // ============================================
  // LOG helper
  // ============================================
  async function log(event: string, data?: any) {
    const studentId = getStudentId();
    if (!studentId) return;

    await fetch("/api/exam/log", {
      method: "POST",
      body: JSON.stringify({ studentId, event, data }),
    });
  }

  // ============================================
  // typing cada 5s
  // ============================================
  useEffect(() => {
    const interval = setInterval(() => {
      if (submitted) return;

      if (pendingText.current !== lastSavedText.current) {
        log("typing", pendingText.current);
        lastSavedText.current = pendingText.current;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [submitted]);

  // ============================================
  // blur / focus
  // ============================================
  useEffect(() => {
    const onBlur = () => log("blur");
    const onFocus = () => log("focus");

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  function handleTyping(v: string) {
    if (submitted) return;
    setText(v);
    pendingText.current = v;
  }

  function handlePaste(e: any) {
    if (submitted) return;

    const pastedText = e.clipboardData?.getData("text") ?? "";
    log("paste", pastedText);
  }

  // ============================================
  // SUBMIT
  // ============================================
  const handleSubmit = async () => {
    if (submitted) return;

    const ok = confirm("Solo puedes entregar el examen una vez.\n¿Deseas continuar?");
    if (!ok) return;

    const password = prompt("Ingresa tu contraseña para confirmar:");
    if (!password || password.trim() === "") {
      alert("Contraseña requerida.");
      return;
    }

    const studentId = getStudentId();

    try {
      const res = await fetch("/api/schreiben/finalizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, text, password }),
      });

      const json = await res.json();
      if (!json.ok) {
        alert(json.error || "Hubo un error al entregar el examen.");
        return;
      }

      setSubmitted(true);
      alert("Examen entregado correctamente.");

      log("submitted", { length: text.length });
    } catch (err) {
      console.error(err);
      alert("Error de conexión.");
    }
  };

  // ============================================
  // UI
  // ============================================
  return (
    <div className="p-10 text-white">
      {/* ---------------------------------------- */}
      {/*             IMAGEN DESPLEGABLE           */}
      {/* ---------------------------------------- */}
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={() => setShowImage(!showImage)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white mb-3"
        >
          {showImage ? "Ocultar imagen" : "Mostrar imagen"}
        </button>

        {showImage && (
          <img
            src="/imagen-ejemplo.png" // cambia esta ruta
            alt="Imagen de referencia"
            className="max-w-[600px] w-full rounded border border-gray-500 shadow-lg"
          />
        )}
      </div>

      {/* ---------------------------------------- */}
      {/*                 TEXTAREA                 */}
      {/* ---------------------------------------- */}
      <textarea
        className="w-full h-[70vh] bg-black border border-white p-4"
        value={text}
        disabled={submitted}
        onChange={(e) => handleTyping(e.target.value)}
        onPaste={handlePaste}
      />

      <div className="flex justify-center">
        <button
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded text-center"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Entregar examen
        </button>
      </div>
    </div>
  );
}
