"use client";

import { useState, useEffect, useRef } from "react";

export default function WritingPage() {
  const [logged, setLogged] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const pendingText = useRef("");
  const lastSavedText = useRef("");

  // ============================================
  // LOGIN
  // ============================================

  async function handleLogin() {
    const res = await fetch("/api/external-exam/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: studentId, password })
    });

    const json = await res.json();

    if (!json.ok) {
      setError(json.error);
      return;
    }

    document.cookie = `external_session=${studentId}; path=/`;
    setLogged(true);
  }

  // ============================================
  // LOG helper
  // ============================================

  async function log(event: string, data?: any) {
    const c = document.cookie.split("; ").find((x) => x.startsWith("external_session="));
    const id = c?.split("=")[1];

    if (!id) return;

    await fetch("/api/external-exam/log", {
      method: "POST",
      body: JSON.stringify({ studentId: id, event, data }),
    });
  }

  // ============================================
  // typing cada 5s
  // ============================================

  useEffect(() => {
    if (!logged) return;

    const interval = setInterval(() => {
      if (submitted) return;

      if (pendingText.current !== lastSavedText.current) {
        log("typing", pendingText.current);
        lastSavedText.current = pendingText.current;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [logged, submitted]);

  // ============================================
  // SUBMIT
  // ============================================

  async function handleSubmit() {
    if (submitted) return;

    const ok = confirm("Solo puedes entregar una vez. ¿Deseas continuar?");
    if (!ok) return;

    const c = document.cookie.split("; ").find((x) => x.startsWith("external_session="));
    const id = c?.split("=")[1];

    const res = await fetch("/api/external-exam/finalizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: id, text }),
    });

    const json = await res.json();

    if (!json.ok) {
      alert(json.error || "Error.");
      return;
    }

    setSubmitted(true);
    log("submitted", { length: text.length });
    alert("Examen entregado.");
  }

  // ============================================
  // UI
  // ============================================

  if (!logged) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-neutral-900 p-8 rounded w-[350px]">
          <h2 className="mb-4 text-lg font-semibold">Acceso examen</h2>

          <input
            placeholder="ID (ej. n3)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full mb-3 p-2 bg-black border border-white"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 bg-black border border-white"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-green-600 py-2"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <textarea
        className="w-full h-[70vh] bg-black border border-white p-4"
        value={text}
        disabled={submitted}
        onChange={(e) => {
          setText(e.target.value);
          pendingText.current = e.target.value;
        }}
      />

      <div className="flex justify-center">
        <button
          className="mt-4 px-6 py-3 bg-green-600"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Entregar examen
        </button>
      </div>
    </div>
  );
}