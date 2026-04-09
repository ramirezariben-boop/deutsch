// scripts/build-mission-configs.ts
// Uso: npx tsx scripts/build-mission-configs.ts
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const NOTE_CONFIG = "C:/Users/aribe/OneDrive/Escritorio/Ensayos_programación/Sistema_Niveles/note/config";
const OUTPUT_DIR = path.resolve("config/missions");

const CURSOS = [
  {
    key: "basico_2",
    formFile: "form-basico2.json",
    respuestasFile: path.join(NOTE_CONFIG, "respuestas-basico-2.ts"),
  },
  {
    key: "basico_4",
    formFile: "form-basico4.json",
    respuestasFile: path.join(NOTE_CONFIG, "respuestas-basico-4.ts"),
  },
];

function extractPractice(title: string): string | null {
  const m = title.match(/pr[aá]ctica\s*(\d+[a-z])/i);
  return m ? m[1].toUpperCase() : null;
}

function isSkip(item: any): boolean {
  const t = (item.title || "").toLowerCase();
  return (
    t.includes("password") ||
    t.includes("id de alumno") ||
    t.includes("nombre") ||
    t.includes("elige la práctica") ||
    item.type === "MULTIPLE_CHOICE"
  );
}

function buildBlocks(items: any[], practice: string): any[] {
  return items.map((item, idx) => {
    const base = {
      id: `${practice.toLowerCase()}-${idx}`,
      prompt: item.title,
    };
    if (item.type === "TEXT") {
      return { ...base, type: "text" };
    }
    if (item.type === "GRID") {
      return { ...base, type: "grid", rows: item.rows, columns: item.columns };
    }
    if (item.type === "CHECKBOX_GRID") {
      return { ...base, type: "checkbox_grid", rows: item.rows, columns: item.columns };
    }
    return { ...base, type: "unknown" };
  });
}

function attachCorrect(
  blocks: any[],
  respuestas: Record<string, string>,
  mapeoNivel: Record<string, string[]>,
  practiceKey: string
): any[] {
  const preguntasList = mapeoNivel[`PRACTICA_${practiceKey}`] ?? [];

  return blocks.map(block => {
    if (block.type === "text") {
      // Buscar la clave en el mapeo que corresponda a este prompt
      const match = preguntasList.find(p => {
        const clean = p.replace(/^\[|]$/g, "").trim();
        return clean === block.prompt.trim() || p.trim() === block.prompt.trim();
      });
      return { ...block, correct: match ? (respuestas[match] ?? "") : "" };
    }
    if (block.type === "grid") {
      const correct: Record<string, string> = {};
      for (const row of block.rows) {
        const key = `${block.prompt} [${row}]`;
        if (respuestas[key] !== undefined) correct[row] = respuestas[key];
      }
      return { ...block, correct };
    }
    if (block.type === "checkbox_grid") {
      const correct: Record<string, string[]> = {};
      for (const row of block.rows) {
        const key = `${block.prompt} [${row}]`;
        if (respuestas[key] !== undefined) {
          correct[row] = respuestas[key].split(",").map((s: string) => s.trim());
        }
      }
      return { ...block, correct };
    }
    return block;
  });
}

async function importRespuestas(filePath: string): Promise<Record<string, string>> {
  const mod = await import(pathToFileURL(filePath).href);
  for (const val of Object.values(mod)) {
    if (val && typeof val === "object" && !Array.isArray(val))
      return val as Record<string, string>;
  }
  return {};
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const curso of CURSOS) {
    const formPath = path.resolve(curso.formFile);
    if (!fs.existsSync(formPath)) {
      console.warn(`⚠️  No existe ${formPath} — ponlo en la raíz de deutsch y corre de nuevo`);
      continue;
    }

    const form = JSON.parse(fs.readFileSync(formPath, "utf-8"));
    const respuestas = await importRespuestas(curso.respuestasFile);

    const mapeoMod = await import(pathToFileURL(path.resolve("config/mapeo-auto.ts")).href);
    const mapeoNivel: Record<string, string[]> = (mapeoMod.MAPEO ?? {})[curso.key] ?? {};

    const practices: Record<string, any[]> = {};
    let current: string | null = null;

    for (const item of form.items) {
      if (item.type === "PAGE_BREAK") {
        const p = extractPractice(item.title);
        if (p) { current = p; practices[p] = practices[p] ?? []; }
        continue;
      }
      if (!current || isSkip(item)) continue;
      practices[current].push(item);
    }

    const missions: Record<string, any> = {};
    for (const [practiceKey, items] of Object.entries(practices)) {
      if (items.length === 0) continue;
      let blocks = buildBlocks(items, practiceKey);
      blocks = attachCorrect(blocks, respuestas, mapeoNivel, practiceKey);
      missions[practiceKey] = { id: practiceKey, title: `Misión ${practiceKey}`, blocks };
    }

    const varName = `MISSIONS_${curso.key.toUpperCase().replace(/_/g, "_")}`;
    const outFile = path.join(OUTPUT_DIR, `${curso.key}.ts`);
    fs.writeFileSync(outFile, `// AUTOGENERADO — no editar manualmente
// Regenerar: npx tsx scripts/build-mission-configs.ts

export const ${varName} = ${JSON.stringify(missions, null, 2)} as const;
`, "utf-8");
    console.log(`✅ ${curso.key} — ${Object.keys(missions).length} prácticas → ${outFile}`);
  }
}

main().catch(err => { console.error("💥", err.message); process.exit(1); });