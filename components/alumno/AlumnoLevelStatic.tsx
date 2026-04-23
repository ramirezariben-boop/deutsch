"use client";

import type { ResolvedStudentLevel } from "@/lib/levels/studentLevel";
import AlumnoLevelTooltip from "./AlumnoLevelTooltip";

export default function AlumnoLevelStatic({
  level,
}: {
  level: ResolvedStudentLevel | null | undefined;
}) {
  if (!level) {
    return <span className="text-neutral-400">—</span>;
  }

  return (
    <span className="group relative inline-flex items-center">
      <span className="cursor-help underline decoration-dotted underline-offset-4 text-neutral-200">
        Nivel {level.currentLevel}
      </span>

      <AlumnoLevelTooltip level={level} />
    </span>
  );
}