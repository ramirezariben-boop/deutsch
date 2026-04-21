"use client";

import AlumnoTabs from "./AlumnoTabs";

type Alumno = {
  id: number | string;
  name: string;

  points?: number | null;
  isCurrent?: boolean;
  listNumber?: number | null;

  course?: string | null;
  nivelActual?: string | null;

  courseId?: string | null;
  resolvedCourseId?: string | null;

  day?: string | null;
  privCode?: string | null;
};

export default function AlumnoCard({ alumno }: { alumno: Alumno }) {
  const isCurrent = alumno.isCurrent === true;
  const courseId = alumno.resolvedCourseId ?? alumno.courseId ?? null;

  return (
    <div className="w-[360px] rounded-xl bg-neutral-900 border border-neutral-700 p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-3">{alumno.name}</h2>

      <div className="space-y-1 text-sm text-neutral-300 mb-4">
        <div>
          <span className="text-neutral-500">ID:</span> {alumno.id}
        </div>

        <div>
          <span className="text-neutral-500">MXP:</span> {alumno.points ?? "—"}
        </div>

        <div>
          <span className="text-neutral-500">Current:</span> {isCurrent ? "Sí" : "No"}
        </div>

        {isCurrent && (
          <>
            <div>
              <span className="text-neutral-500">Número de lista:</span>{" "}
              {alumno.listNumber ?? "—"}
            </div>

            <div>
              <span className="text-neutral-500">Curso actual:</span>{" "}
              {alumno.course ?? "—"}
            </div>

            <div>
              <span className="text-neutral-500">Nivel:</span> próximamente
            </div>

            <div>
              <span className="text-neutral-500">Job:</span> próximamente
            </div>
          </>
        )}
      </div>

      {!courseId ? (
        <div className="text-xs text-red-400">
          No hay courseId resuelto para este alumno.
        </div>
      ) : (
        <AlumnoTabs
          alumnoId={Number(alumno.id)}
          course={alumno.course ?? ""}
          courseId={courseId}
        />
      )}
    </div>
  );
}