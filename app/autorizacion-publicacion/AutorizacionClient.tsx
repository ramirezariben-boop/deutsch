"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AutorizacionClient() {
  const params = useSearchParams();

  const studentId = params.get("studentId");
  const workId = params.get("workId");

  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState<any>(null);

  const fetchWork = async () => {
    if (!workId) return;

    const res = await fetch(`/api/work?workId=${workId}`);

    if (!res.ok) {
      setWork(null);
      return;
    }

    const data = await res.json();
    setWork(data);
  };

  useEffect(() => {
    if (!studentId || !workId) {
      setLoading(false);
      return;
    }

    const init = async () => {
      const res = await fetch(
        `/api/consent/check?studentId=${studentId}&workId=${workId}`
      );
      const data = await res.json();

      if (data.signed) {
        setSubmitted(true);
      }

      await fetchWork();

      setLoading(false);
    };

    init();
  }, [studentId, workId]);

  const handleSubmit = async () => {
    if (!name || !accepted) {
      alert("Debes completar todos los campos.");
      return;
    }

    await fetch("/api/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        workId,
        workTitle: work?.title,
        name,
      }),
    });

    setSubmitted(true);
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  if (!studentId || !workId) {
    return <p className="p-6">Faltan datos en la URL.</p>;
  }

  if (!work) {
    return <p className="p-6">Trabajo no encontrado.</p>;
  }

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">✅ Ya firmaste este consentimiento</h2>
        <p className="mt-2">{work.title}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Autorización para publicación
      </h1>

      <p className="mb-2 text-sm text-gray-600">Trabajo:</p>
      <p className="font-semibold mb-4">
        {work.title || "Sin título"}
      </p>

      <img
        src={work.fileUrl}
        alt="Trabajo del alumno"
        className="mb-6 rounded border"
      />

      <p className="mb-4 text-sm text-gray-600">
        Este documento permite publicar tu trabajo con fines educativos sin transferir tus derechos.
      </p>

      <input
        type="text"
        placeholder="Nombre completo (firma)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        Acepto la autorización de publicación
      </label>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Firmar y enviar
      </button>
    </div>
  );
}