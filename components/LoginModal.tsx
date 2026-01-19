"use client";

import { useState } from "react";

export default function LoginModal({ onClose }) {
  const [id, setId] = useState("");
  const [nip, setNip] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&nip=${nip}`,
    });

    if (res.ok) {
      window.location.reload();
    } else {
      setError("ID oder NIP falsch.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000]">
      <div className="bg-neutral-900 p-6 rounded-xl w-[380px] shadow-xl border border-gray-700">
        <h2 className="text-xl mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="w-full p-2 rounded bg-black border border-gray-600"
          />

          <input
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            placeholder="NIP"
            className="w-full p-2 rounded bg-black border border-gray-600"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="bg-blue-600 hover:bg-blue-700 w-full p-2 rounded">
            Einloggen
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-3 text-gray-400 hover:text-gray-200 text-sm"
        >
          schließen
        </button>
      </div>
    </div>
  );
}
