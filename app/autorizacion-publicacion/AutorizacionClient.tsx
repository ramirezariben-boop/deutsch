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
      try {
        const res = await fetch(
          `/api/consent/check?workId=${workId}`,
          { credentials: "include" }
        );

        if (res.ok) {
          const data = await res.json();
          if (data.signed) setSubmitted(true);
        }

        await fetchWork();
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    };

    init();
  }, [workId]);

  const handleSubmit = async () => {
    if (!name || !accepted1 || !accepted2) {
      alert("Debes completar todos los campos y aceptar las condiciones.");
      return;
    }

    try {
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
        alert("Error al firmar.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `consent-${workId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Error inesperado.");
    }
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
        <h2 className="text-xl font-bold">
          ✅ Ya firmaste este consentimiento
        </h2>
        <p className="mt-2">{work.title}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <p className="text-xs text-gray-400 mb-2">
        Documento digital de autorización
      </p>

      <h1 className="text-2xl font-bold mb-4">
        Autorización para publicación
      </h1>

      <p className="mb-2 text-sm text-gray-600">Trabajo:</p>
      <p className="font-semibold">{work.title || "Sin título"}</p>

      <p className="text-xs text-gray-500 mb-6">
        Verifica que este sea tu trabajo antes de firmar.
      </p>

      <img
        src={work.fileUrl}
        alt="Trabajo del alumno"
        className="mb-6 rounded border max-h-[400px] object-contain"
      />

      <div className="border border-gray-700 p-5 rounded mb-6 text-sm space-y-3 bg-gray-900 text-gray-200">
        <p className="font-semibold text-white">
          Autorización de uso educativo del trabajo
        </p>

        <p>
          Mediante este documento, autorizo a AriiBen a utilizar y publicar mi
          trabajo con fines exclusivamente educativos dentro de sus plataformas
          (por ejemplo, materiales de clase, blogs o recursos didácticos).
        </p>

        <p>
          Declaro que soy el autor del trabajo y que conservo todos los derechos
          sobre el mismo.
        </p>

        <p>
          Esta autorización no implica cesión de derechos ni uso comercial de mi
          obra.
        </p>

        <p>
          Entiendo que puedo solicitar en cualquier momento la eliminación del
          contenido.
        </p>

        <p className="text-xs text-gray-500">
          Este consentimiento se registra junto con la fecha, información
          técnica de acceso y un comprobante en formato PDF.
        </p>
      </div>

      <label className="flex items-start gap-2 mb-3">
        <input
          type="checkbox"
          checked={accepted1}
          onChange={(e) => setAccepted1(e.target.checked)}
        />
        <span>Confirmo que soy el autor del trabajo mostrado.</span>
      </label>

      <label className="flex items-start gap-2 mb-6">
        <input
          type="checkbox"
          checked={accepted2}
          onChange={(e) => setAccepted2(e.target.checked)}
        />
        <span>
          Acepto su uso con fines educativos bajo las condiciones descritas.
        </span>
      </label>

      <input
        type="text"
        placeholder="Escribe tu nombre completo como firma digital"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />

      <p className="text-xs text-gray-400 mb-4">
        Tu nombre funcionará como firma digital de este consentimiento.
      </p>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Firmar y descargar comprobante
      </button>
    </div>
  );
}