import { readSessionFromHeaders } from "@/lib/auth";
import SchuelerClient from "./SchuelerClient";

export default async function SchuelerPage() {
  const session = await readSessionFromHeaders();

  if (!session) {
    return <div className="p-10 text-gray-400">No has iniciado sesión.</div>;
  }

  return (
    <SchuelerClient
      alumno={{
        id: Number(session.uid),
        name: session.name ?? "Alumno",
        course: session.nivelActual ?? "sin_curso",
        courseId: session.resolvedCourseId ?? null,
        list_number: session.listNumber ?? null,
      }}
    />
  );
}