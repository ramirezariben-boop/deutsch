import fs from "fs";

type Item = {
  id: number;
  index: number;
  title: string;
  type: string;
  rows?: string[];
  columns?: string[];
};

type FormResponse = {
  items: Item[];
};

function isRealQuestion(item: Item) {
  if (item.type === "PAGE_BREAK") return false;

  const t = item.title.toLowerCase();

  if (t.includes("password")) return false;
  if (t.includes("id de alumno")) return false;
  if (t.includes("nombre")) return false;
  if (t.includes("elige la práctica")) return false;

  return true;
}

function extractPracticeFromTitle(title: string): string | null {
  const match = title.match(/práctica\s*(\d+[a-z])/i);
  return match ? match[1].toUpperCase() : null;
}

function convert(form: FormResponse) {
  const result: Record<string, any[]> = {};

  let currentPractice: string | null = null;

  for (const item of form.items) {

    // Detectar cambio de práctica
    if (item.type === "PAGE_BREAK") {
      const practice = extractPracticeFromTitle(item.title);
      if (practice) {
        currentPractice = practice;
        if (!result[currentPractice]) {
          result[currentPractice] = [];
        }
      }
      continue;
    }

    if (!currentPractice) continue;
    if (!isRealQuestion(item)) continue;
    if (isFakeSubquestion(item)) continue;

    const question: any = {
      id: item.id,
      pregunta: item.title,
      tipo: item.type
    };

    if (item.type === "GRID" || item.type === "CHECKBOX_GRID") {
      question.rows = item.rows;
      question.columns = item.columns;
    }

    result[currentPractice].push(question);
  }

  return result;
}

function isFakeSubquestion(item: Item) {
  const t = item.title.trim().toLowerCase();

  // ❌ eliminar solo instrucciones reales
  if (t.startsWith("ordnen sie")) return true;
  if (t.startsWith("wählen sie")) return true;
  if (t.startsWith("kreuzen sie")) return true;

  // ❌ eliminar campo password
  if (t.includes("password")) return true;

  // ✅ TODO lo demás (incluyendo "1.1") es válido
  return false;
}

// =========================
// MAIN
// =========================

const raw = fs.readFileSync("form.json", "utf-8");
const form: FormResponse = JSON.parse(raw);

const parsed = convert(form);

// OUTPUT estilo EXAMEN
const output = Object.entries(parsed)
  .map(([practice, questions]) => {
    return `
export const PRACTICA_${practice} = ${JSON.stringify(questions, null, 2)};
`;
  })
  .join("\n");

fs.writeFileSync("output.ts", output);

console.log("✅ Generado output.ts");

