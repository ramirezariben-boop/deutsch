// Edge-compatible (no Node.js imports) — used in both middleware and server components

export const LEVEL_ORDER = [
  "basico_1", "basico_2", "basico_3", "basico_4",
  "intermedio_1", "intermedio_2", "intermedio_3", "intermedio_4",
  "avanzado_1", "avanzado_2", "avanzado_3", "avanzado_4",
] as const;

export type CourseNivel = typeof LEVEL_ORDER[number];

export function nivelIndex(nivel: string | null | undefined): number {
  if (!nivel) return -1;
  return LEVEL_ORDER.indexOf(nivel.toLowerCase() as CourseNivel);
}

export function canAccess(
  userNivel: string | null | undefined,
  requiredNivel: string
): boolean {
  const reqIdx = nivelIndex(requiredNivel);
  if (reqIdx === -1) return true; // nivel desconocido → acceso libre
  return nivelIndex(userNivel) >= reqIdx;
}

// Carpeta en la URL → nivel mínimo requerido.
// Carpetas ausentes = solo se requiere sesión activa (sin nivel específico).
export const FOLDER_REQUIRED_NIVEL: Record<string, string> = {
  "basico-2":     "basico_2",
  "basico-4":     "basico_4",
  "intermedio-2": "intermedio_2",
  "intermedio-3": "intermedio_3",
  "deutsch":      "intermedio_1",
};
