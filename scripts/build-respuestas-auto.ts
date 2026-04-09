// scripts/build-respuestas-auto.ts
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const OUTPUT = path.resolve(__dirname, "../config/respuestas-auto.ts");
const NOTE_CONFIG = "C:/Users/aribe/OneDrive/Escritorio/Ensayos_programación/Sistema_Niveles/note/config";

async function importarRespuestas(filePath: string): Promise<Record<string, string>> {
  const fileUrl = pathToFileURL(filePath).href;
  const mod = await import(fileUrl);
  for (const val of Object.values(mod)) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val as Record<string, string>;
    }
  }
  throw new Error(`No se encontró objeto exportado en ${filePath}`);
}

const CURSOS: Array<{ key: string; archivo: string }> = [
  { key: "basico_2", archivo: "respuestas-basico-2.ts" },
  { key: "basico_4", archivo: "respuestas-basico-4.ts" },
];

async function main() {
  const resultado: Record<string, Record<string, string>> = {};

  for (const { key, archivo } of CURSOS) {
    const filePath = path.join(NOTE_CONFIG, archivo);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  No existe: ${filePath} — se omite`);
      continue;
    }

    try {
      const obj = await importarRespuestas(filePath);
      resultado[key] = obj;
      console.log(`✅ ${key} — ${Object.keys(obj).length} respuestas`);
    } catch (err: any) {
      console.warn(`⚠️  Error en ${archivo}: ${err.message}`);
    }
  }

  const json = JSON.stringify(resultado, null, 2);
  const output = `// AUTOGENERADO — no editar manualmente
// Regenerar: npx tsx scripts/build-respuestas-auto.ts

export const RESPUESTAS: Record<string, Record<string, string>> = ${json};
`;

  fs.writeFileSync(OUTPUT, output, "utf-8");
  console.log(`\n✅ Generado en: ${OUTPUT}`);
  console.log(`   Cursos incluidos: ${Object.keys(resultado).join(", ")}`);
}

main().catch(err => {
  console.error("💥 ERROR:", err.message);
  process.exit(1);
});