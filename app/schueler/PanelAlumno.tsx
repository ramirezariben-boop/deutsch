import { prisma } from "@/lib/prisma";

export default async function PanelAlumno({ sessionId }: { sessionId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(sessionId) },
  });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-2">
        Hola {user?.name ?? "Alumno"}
      </h1>

      <p className="mb-6 text-neutral-400">
        Sesión iniciada correctamente.
      </p>

      <a
        href="/examen"
        className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mr-3"
      >
        Ir al examen
      </a>

      <a
        href="https://classroom-trading.ariiben.com"
        className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Classroom Trading
      </a>
    </div>
  );
}
