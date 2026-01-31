// app/page.tsx
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Deutsch mit AriiBen · Clases de alemán con Ari Ben Ramírez Villegas",
  description:
    "Clases de alemán impartidas por Ari Ben Ramírez Villegas. Plataforma educativa con Classroom Trading, Spaces 3D y recursos interactivos.",
};

export default async function MainPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  // 🔐 Si hay sesión, fuera de aquí → /schueler
  if (session) {
    redirect("/schueler");
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Willkommen!
      </h1>

      <div className="text-sm text-gray-400 mb-4">
        Versión Beta
      </div>

      <p className="text-[10px] text-neutral-700 mb-6">
        Clases de alemán con Ari Ben Ramírez Villegas
      </p>

      {/* Fila principal */}
      <div className="flex justify-between gap-12">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
          <a
            href="https://classroom-trading.ariiben.com"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            📈 Trading 📊
          </a>

          <a
            href="https://classroom.google.com/c/NzkyODQ5MTgyOTkx?cjc=yuqnyyqw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤑 Extra MXP 💰
          </a>

          <a
            href="https://lyrickahoot.ariiben.com/game/player.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🎶 Lyrickahoot! 🧩
          </a>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          <a
            href="https://spaces.ariiben.com"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🏙️ Spaces 🏫
          </a>

          <a
            href="https://www.roblox.com/users/2979430065/profile#!#creations"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            🤖 Roblox 🌎
          </a>

          <a
            href="https://www.youtube.com/@AriiBen"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            ▶️ YouTube 🎥
          </a>

          <a
            href="https://class.ariiben.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
          >
            📚 Privatunterricht 📖
          </a>
        </div>

      </div>
    </div>
  );
}
