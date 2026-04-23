// lib/missions/grading.ts

import type { MissionBlock, MissionVariant } from "@/lib/missions/types";

type AnswersMap = Record<string, string>;

function normalizar(s: string): string {
  return s.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
}

function gradeTextBlock(block: MissionBlock, respuestas: AnswersMap) {
  const key = block.prompt;
  const correcta = block.correct;

  if (!correcta || Array.isArray(correcta) || typeof correcta !== "string") {
    return { total: 0, correctas: 0 };
  }

  const alumnoResp = String(respuestas[key] ?? "").trim();
  if (!alumnoResp) return { total: 0, correctas: 0 };

  return {
    total: 1,
    correctas: normalizar(alumnoResp) === normalizar(correcta) ? 1 : 0,
  };
}

function gradeGridBlock(block: MissionBlock, respuestas: AnswersMap) {
  let total = 0;
  let correctas = 0;

  const rows = block.rows ?? [];
  const correctMap =
    block.correct && !Array.isArray(block.correct) && typeof block.correct === "object"
      ? block.correct
      : {};

  for (const row of rows) {
    const key = `${block.prompt} [${row}]`;
    const correcta = correctMap[String(row)];

    if (!correcta || Array.isArray(correcta) || typeof correcta !== "string") {
      continue;
    }

    const alumnoResp = String(respuestas[key] ?? "").trim();
    if (!alumnoResp) continue;

    total++;
    if (normalizar(alumnoResp) === normalizar(correcta)) {
      correctas++;
    }
  }

  return { total, correctas };
}

function gradeCheckboxGridBlock(block: MissionBlock, respuestas: AnswersMap) {
  let total = 0;
  let correctas = 0;

  const rows = block.rows ?? [];
  const correctMap =
    block.correct && !Array.isArray(block.correct) && typeof block.correct === "object"
      ? block.correct
      : {};

  for (const row of rows) {
    const key = `${block.prompt} [${row}]`;
    const correctaRaw = correctMap[String(row)];

    if (!Array.isArray(correctaRaw) || correctaRaw.length === 0) {
      continue;
    }

    const alumnoResp = String(respuestas[key] ?? "").trim();
    if (!alumnoResp) continue;

    const alumnoArr = alumnoResp
      .split(",")
      .map((s) => normalizar(s))
      .filter(Boolean);

    const correctaArr = correctaRaw
      .map((s) => normalizar(String(s)))
      .filter(Boolean);

    total++;

    const match =
      alumnoArr.length === correctaArr.length &&
      correctaArr.every((c) => alumnoArr.includes(c));

    if (match) {
      correctas++;
    }
  }

  return { total, correctas };
}

export function gradeMissionVariant(
  variant: MissionVariant,
  respuestas: AnswersMap
) {
  let total = 0;
  let correctas = 0;

  for (const block of variant.blocks) {
    if (block.type === "text") {
      const r = gradeTextBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
      continue;
    }

    if (block.type === "grid") {
      const r = gradeGridBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
      continue;
    }

    if (block.type === "checkbox_grid") {
      const r = gradeCheckboxGridBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
    }
  }

  const score = total === 0 ? 0 : Math.round((correctas / total) * 100) / 100;

  return { total, correctas, score };
}