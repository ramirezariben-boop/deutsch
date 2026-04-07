"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AutorizacionClient() {
  const params = useSearchParams();

  const workId = params.get("workId");

  const [name, setName] = useState("");
  const [accepted1, setAccepted1] = useState(false);
  const [accepted2, setAccepted2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState<any>(null);

  const fetchWork = async () => {
    if (!workId) return;

    const res = await fetch(`/api/work?workId=${workId}`, {
      credentials: "include",
    });

    if (res.status === 401) {
      alert("Debes iniciar sesión");
      return;
    }

    if (res.status === 403) {
      alert("No tienes permiso para este trabajo");
      return;
    }

    if (!res.ok) {
      setWork(null);
      return;
    }

    const data = await res.json();
    setWork(data);
  };

  useEffect(() => {
    if (!workId) {
      setLoading(false);
      return;
    }

    const init = async () => {
      const res = await fetch(
        `/api/consent/check?workId=${workId}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (data.signed) {
        setSubmitted(true);
      }

      await fetchWork();

      setLoading(false);
    };

    init();
  }, [workId]);

  const handleSubmit = async () => {
    if (!name || !accepted1 || !accepted2) {
      alert("Debes completar todo.");
      return;
    }

    const res = await fetch("/api/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        workId,
        name,
      }),
    });

    if (!res.ok) {
      alert("Error al firmar");
      return;
    }

    // 🔥 descarga PDF
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `consent-${workId}.pdf`;
    a.click();

    setSubmitted(true);
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  if (!workId) {
    return <p className="p-6">Faltan datos en la URL.</p>;
  }

  if (!work) {
    return <p className="p-6">Trabajo no encontrado.</p>;
  }

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">✅ Consentimiento registrado</h2>
        <p className="mt-2">{work.title}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Autorización para publicación
      </h1>

      <p className="text-sm text-gray-600">Trabajo:</p>
      <p className="font-semibold mb-2">{work.title}</p>

      <img
        src={work.fileUrl}
        alt="Trabajo del alumno"
        className="mb-6 rounded border"
      />

      <p className="text-xs text-gray-500">ID: {work.id}</p>

      <label className="flex items-start gap-2 mb-3">
        <input
          type="checkbox"
          checked={accepted1}
          onChange={(e) => setAccepted1(e.target.checked)}
        />
        <span>
          Declaro que soy el autor del trabajo y autorizo su publicación con fines educativos.
        </span>
      </label>

      <label className="flex items-start gap-2 mb-6">
        <input
          type="checkbox"
          checked={accepted2}
          onChange={(e) => setAccepted2(e.target.checked)}
        />
        <span>
          Entiendo que no cedo derechos y puedo solicitar su eliminación.
        </span>
      </label>

      <input
        type="text"
        placeholder="Nombre completo (firma)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Firmar y descargar PDF
      </button>
    </div>
  );
}