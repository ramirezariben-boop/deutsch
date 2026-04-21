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

        points: session.points ?? null,
        isCurrent: session.isCurrent ?? false,
        listNumber: session.listNumber ?? null,

        course: session.nivelActual ?? "sin_curso",
        courseId: session.resolvedCourseId ?? null,
        resolvedCourseId: session.resolvedCourseId ?? null,

        nivelActual: session.nivelActual ?? null,
        day: session.day ?? null,
        privCode: session.privCode ?? null,
      }}
    />
  );
}