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

  const blurStart = useRef<number | null>(null);

  const blurStartRef = useRef<number | null>(null);

  const [showExamImage, setShowExamImage] = useState(false);
  const [recovered, setRecovered] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const wordCount =
  text.trim().length > 0
    ? text.trim().split(/\s+/).length
    : 0;

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
      headers: { "Content-Type": "application/json" },
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
  const words = pendingText.current.trim()
    ? pendingText.current.trim().split(/\s+/).length
    : 0;

  log("typing", {
    text: pendingText.current,
    wordCount: words,
    charCount: pendingText.current.length,
    timestamp: Date.now()
  });

  lastSavedText.current = pendingText.current;
}
    }, 5000);

    return () => clearInterval(interval);
  }, [logged, submitted]);

useEffect(() => {
  if (!logged || submitted) return;

  const onBlur = () => {
    blurStartRef.current = Date.now();
  };

  const onFocus = () => {
    if (!blurStartRef.current) return;

    const durationMs = Date.now() - blurStartRef.current;

    log("blur_duration", {
      durationMs,
      startedAt: blurStartRef.current,
      endedAt: Date.now(),
    });

    blurStartRef.current = null;
  };

  window.addEventListener("blur", onBlur);
  window.addEventListener("focus", onFocus);

  return () => {
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("focus", onFocus);
  };
}, [logged, submitted]);

useEffect(() => {
  if (!logged) return;

  async function initializeExam() {

    const statusRes = await fetch(
      `/api/external-exam/student/status?studentId=${studentId}`
    );

    const statusJson = await statusRes.json();

    if (statusJson.submitted) {
      setSubmitted(true);
      setTimeLeft(0);
      return;
    }

    setTimeLeft(statusJson.remainingSeconds);

    const res = await fetch(
      `/api/external-exam/student/last-writing?studentId=${studentId}`
    );

    const json = await res.json();

    if (json.ok && json.text) {
      setText(json.text);
      pendingText.current = json.text;
      lastSavedText.current = json.text;
      setRecovered(true);
    }
  }

  initializeExam();
}, [logged, studentId]);

useEffect(() => {
  if (!logged || submitted) return;
  if (timeLeft === null) return;

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev === null) return null;

      if (prev <= 1) {
        clearInterval(interval);
        autoSubmit();
        return 0;
      }

      if (prev === 300) {
        alert("Quedan 5 minutos.");
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [logged, submitted, timeLeft]);

  // ============================================
  // SUBMIT
  // ============================================

async function handleSubmit() {
  if (submitted) return;

  const confirmPassword = prompt("Confirma la contraseña para enviar el examen:");

  if (!confirmPassword) return;

  // validar password contra backend
  const check = await fetch("/api/external-exam/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: studentId,
      password: confirmPassword
    })
  });

  const checkJson = await check.json();

  if (!checkJson.ok) {
    alert("Contraseña incorrecta.");
    return;
  }

  const ok = confirm("Solo puedes entregar una vez. ¿Deseas continuar?");
  if (!ok) return;

  const res = await fetch("/api/external-exam/finalizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, text }),
  });

  const json = await res.json();

  if (!json.ok) {
    alert(json.error || "Error.");
    return;
  }

  setSubmitted(true);

  // 🔥 logout automático
  document.cookie = "external_session=; Max-Age=0; path=/";

  alert("Examen entregado. Sesión cerrada.");
}

async function autoSubmit() {
  if (submitted) return;

  await fetch("/api/external-exam/finalizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, text }),
  });

  setSubmitted(true);
  document.cookie = "external_session=; Max-Age=0; path=/";

  alert("Tiempo finalizado. El examen fue enviado automáticamente.");
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
<div className="relative flex justify-center items-center mb-4">
  <button
    onClick={() => setShowExamImage(true)}
    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
  >
    Instructions
  </button>

  {timeLeft !== null && (
    <div className="absolute right-0 text-lg font-semibold text-yellow-400">
      ⏳ {Math.floor(timeLeft / 60)}:
      {(timeLeft % 60).toString().padStart(2, "0")}
    </div>
  )}
</div>

{recovered && (
  <div className="mb-4 text-green-400 text-sm text-center">
    ✔ Se recuperó automáticamente tu último avance.
  </div>
)}

{submitted && (
  <div className="mb-6 text-red-400 text-center">
    Este examen ya fue entregado.
  </div>
)}

<textarea
  className="w-full h-[70vh] bg-black border border-white p-4"
  value={text}
  disabled={submitted}
  onChange={(e) => {
    setText(e.target.value);
    pendingText.current = e.target.value;
  }}
  onPaste={() => {
    log("paste", {
      timestamp: Date.now()
    });
  }}
/>

<div className="mt-2 text-sm text-neutral-400 text-right">
  Words: {wordCount}
</div>

{showExamImage && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="relative bg-neutral-900 p-6 rounded-lg max-w-4xl w-full">
      
      <button
        onClick={() => setShowExamImage(false)}
        className="absolute top-3 right-3 text-white text-xl"
      >
        ✖
      </button>

<img
  src={
    parseInt(studentId.replace(/\D/g, "")) % 2 === 0
      ? "/extern/exam2.png"
      : "/extern/exam1.png"
  }
  alt="Consigna"
  draggable={false}
  onContextMenu={(e) => e.preventDefault()}
  className="w-full max-h-[80vh] object-contain select-none"
/>
    </div>
  </div>
)}

      <div className="flex justify-center">
        <button
          className="mt-4 px-6 py-3 bg-green-600"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit exam
        </button>
      </div>
    </div>
  );
}