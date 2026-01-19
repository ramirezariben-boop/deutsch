import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SchuelerPage() {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return <div className="p-10 text-gray-400">No has iniciado sesión.</div>;
  }

  const rows: any[] = await prisma.$queryRawUnsafe(
    `SELECT id, name FROM "User" WHERE id = $1`,
    Number(session)
  );

  const user = rows?.[0];
  const name = user?.name ?? "Schüler";

return (
  <div className="p-10 text-white">
    <div className="text-sm text-gray-400 mb-4">Versión Beta</div>

    <h1 className="text-3xl font-bold mb-8">
      Willkommen, {name}!
    </h1>

    {/* Fila principal */}
    <div className="flex justify-between gap-12">

    {/* Link para el examen escrito; descomentar cuando haya examen */}
    {/*
    <div className="flex justify-between gap-4 mb-6">
      <Link
        href="/schreiben"
        className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded text-center w-56"
      >
        Examen escrito
      </Link>
    </div>
    */}

      {/* Columna izquierda */}
      <div className="flex flex-col gap-4">
        <a
          href="https://classroom-trading.ariiben.com"
          target="_blank"
          rel="noopener noreferrer"
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
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col gap-4">
        <a
          href="https://spaces.ariiben.com"
          target="_blank"
          rel="noopener noreferrer"
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
