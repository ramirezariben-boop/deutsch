"use client";

import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const id = form.get("id");
    const nip = form.get("password"); // <-- el input se llama password, pero lo enviamos como nip

    const res = await fetch("/api/login", {
      method: "POST",
      body: new URLSearchParams({
        id: String(id ?? ""),
        nip: String(nip ?? ""),   // <-- CORREGIDO
      }),
    });

    if (res.ok) {
      window.location.href = "/schreiben";
    } else {
      setError("Datos incorrectos");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <input
        type="number"
        name="id"
        placeholder="ID"
        className="p-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="p-2 border rounded"
        required
      />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Entrar
      </button>
    </form>
  );
}
