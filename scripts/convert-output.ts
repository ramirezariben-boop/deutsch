import fs from "fs";
import * as data from "./output";

type PracticaItem = {
  pregunta?: string;
  tipo: string;
  rows?: string[];
  title?: string;
};

function clean(s: string) {
  return s
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

const result: Record<string, string[]> = {};

for (const [practice, items] of Object.entries(data)) {

  result[practice] = [];

  let currentBlock = ""; // 🔥 contexto activo

  for (const item of items as PracticaItem[]) {

    // 🟣 detectar cambios de bloque (PAGE_BREAK reales)
    if (item.tipo === "PAGE_BREAK") {

      const t = clean(item.title || "");

      // ignorar passwords
      if (/password/i.test(t)) continue;

      // guardar contexto (ej: "Práctica 4C")
      currentBlock = t;
      continue;
    }

    // 🔵 GRID
    if (item.tipo === "GRID" || item.tipo === "CHECKBOX_GRID") {

      const base = clean(item.pregunta || "");

      if (!item.rows) continue;

      for (const row of item.rows) {
        result[practice].push(`${base} [${clean(row)}]`);
      }

      continue;
    }

    // 🟢 TEXT (como 1.1, 1.2, etc)
if (item.tipo === "TEXT") {

  const text = clean(item.pregunta || "");

  if (!text) continue;

  // 🔥 caso especial: 1.1, 1.2, etc → mantener plano
  if (/^\d+(\.\d+)?$/.test(text)) {
    result[practice].push(text);
    continue;
  }

  // otros TEXT normales
  if (currentBlock) {
    result[practice].push(`${currentBlock}. [${text}]`);
  } else {
    result[practice].push(`[${text}]`);
  }

  continue;
}

    // ⚪ fallback (por si hay otros tipos)
    if (item.pregunta) {
      result[practice].push(clean(item.pregunta));
    }
  }

  // ❌ eliminar vacías
  if (result[practice].length === 0) {
    delete result[practice];
  }
}

const output = `export const MAPEO = ${JSON.stringify(result, null, 2)};\n`;

fs.writeFileSync("mapeo-auto.ts", output);

console.log("✅ MAPEO completo con TEXT + contexto");