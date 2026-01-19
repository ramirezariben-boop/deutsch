"use client";

import { useState, useEffect } from "react";

export default function LoginModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const btn = document.getElementById("loginBtn");
    if (btn) btn.onclick = () => setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#111] p-6 rounded-xl w-[380px] border border-gray-700 shadow-xl animate-fade">
        <h2 className="text-xl font-semibold mb-4">Panel de alumno</h2>

        <form
          action="/api/login"
          method="POST"
          className="flex flex-col gap-3"
        >
          <input
            name="id"
            placeholder="ID"
            className="p-2 bg-black border border-gray-700 text-white rounded"
          />

          <input
            name="nip"
            placeholder="NIP"
            className="p-2 bg-black border border-gray-700 text-white rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition mt-2"
          >
            Entrar
          </button>
        </form>

        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-sm text-gray-400 hover:text-gray-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
