"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ExternalLoginInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const n = params.get("n");
    if (!n) {
      setError("ID no proporcionado.");
      return;
    }

    async function validate() {
      const res = await fetch("/api/external-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: n }),
      });

      const json = await res.json();

      if (!json.ok) {
        setError(json.error || "Alumno no válido.");
        return;
      }

      document.cookie = `session=${n.trim()}; path=/; SameSite=Lax`;
      router.push("/external-schreiben");
    }

    validate();
  }, [params, router]);

  return (
    <div className="p-10 text-white">
      <h1>Validando acceso...</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default function ExternalLogin() {
  return (
    <Suspense fallback={<div className="p-10 text-white">Cargando...</div>}>
      <ExternalLoginInner />
    </Suspense>
  );
}