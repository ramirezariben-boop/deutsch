import type { MissionBlock, MissionVariant, QuestionResult } from "@/lib/missions/types";

type AnswersMap = Record<string, string>;

function normalizar(s: string): string {
  return s.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
}

function gradeTextBlock(
  block: MissionBlock,
  respuestas: AnswersMap
): { total: number; correctas: number; feedback: QuestionResult[] } {
  const key = block.prompt;
  const correcta = block.correct;

  if (!correcta || Array.isArray(correcta) || typeof correcta !== "string") {
    return { total: 0, correctas: 0, feedback: [] };
  }

  const alumnoResp = String(respuestas[key] ?? "").trim();
  if (!alumnoResp) return { total: 0, correctas: 0, feedback: [] };

  const isCorrect = normalizar(alumnoResp) === normalizar(correcta);
  return {
    total: 1,
    correctas: isCorrect ? 1 : 0,
    feedback: [{ question: key, studentAnswer: alumnoResp, correctAnswer: correcta, isCorrect }],
  };
}

function gradeGridBlock(
  block: MissionBlock,
  respuestas: AnswersMap
): { total: number; correctas: number; feedback: QuestionResult[] } {
  let total = 0;
  let correctas = 0;
  const feedback: QuestionResult[] = [];

  const rows = block.rows ?? [];
  const correctMap =
    block.correct && !Array.isArray(block.correct) && typeof block.correct === "object"
      ? block.correct
      : {};

  for (const row of rows) {
    const key = `${block.prompt} [${row}]`;
    const correcta = correctMap[String(row)];

    if (!correcta || Array.isArray(correcta) || typeof correcta !== "string") continue;

    const alumnoResp = String(respuestas[key] ?? "").trim();
    if (!alumnoResp) continue;

    total++;
    const isCorrect = normalizar(alumnoResp) === normalizar(correcta);
    if (isCorrect) correctas++;
    feedback.push({ question: key, studentAnswer: alumnoResp, correctAnswer: correcta, isCorrect });
  }

  return { total, correctas, feedback };
}

function gradeCheckboxGridBlock(
  block: MissionBlock,
  respuestas: AnswersMap
): { total: number; correctas: number; feedback: QuestionResult[] } {
  let total = 0;
  let correctas = 0;
  const feedback: QuestionResult[] = [];

  const rows = block.rows ?? [];
  const correctMap =
    block.correct && !Array.isArray(block.correct) && typeof block.correct === "object"
      ? block.correct
      : {};

  for (const row of rows) {
    const key = `${block.prompt} [${row}]`;
    const correctaRaw = correctMap[String(row)];

    if (!Array.isArray(correctaRaw) || correctaRaw.length === 0) continue;

    const alumnoResp = String(respuestas[key] ?? "").trim();
    if (!alumnoResp) continue;

    const alumnoArr = alumnoResp.split(",").map((s) => normalizar(s)).filter(Boolean);
    const correctaArr = correctaRaw.map((s) => normalizar(String(s))).filter(Boolean);

    total++;
    const isCorrect =
      alumnoArr.length === correctaArr.length &&
      correctaArr.every((c) => alumnoArr.includes(c));
    if (isCorrect) correctas++;

    feedback.push({
      question: key,
      studentAnswer: alumnoResp,
      correctAnswer: correctaArr.join(", "),
      isCorrect,
    });
  }

  return { total, correctas, feedback };
}

export function gradeMissionVariant(variant: MissionVariant, respuestas: AnswersMap) {
  let total = 0;
  let correctas = 0;
  const feedback: QuestionResult[] = [];

  for (const block of variant.blocks) {
    if (block.type === "text") {
      const r = gradeTextBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
      feedback.push(...r.feedback);
      continue;
    }

    if (block.type === "grid") {
      const r = gradeGridBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
      feedback.push(...r.feedback);
      continue;
    }

    if (block.type === "checkbox_grid") {
      const r = gradeCheckboxGridBlock(block, respuestas);
      total += r.total;
      correctas += r.correctas;
      feedback.push(...r.feedback);
    }
  }

  const score = total === 0 ? 0 : Math.round((correctas / total) * 100) / 100;
  return { total, correctas, score, feedback };
}
