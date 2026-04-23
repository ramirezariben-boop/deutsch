import { NextResponse } from "next/server";
import { markPasswordUsedIfIndividual, getActiveMission } from "@/lib/sheets/passwords";
import {
  escribirCalificacionSheet,
  yaTieneCalificacionSheet,
} from "@/lib/sheets/calificaciones";
import { MISSIONS_BASICO_2 } from "@/config/missions/basico_2";
import { MISSIONS_BASICO_4 } from "@/config/missions/basico_4";
import { MISSIONS_INTERMEDIO_2 } from "@/config/missions/intermedio_2";
import { MISSION_CONFIGS } from "@/config/missions";

export async function POST(req: Request) {
  try {
    const { alumnoId, rowIndex, respuestas, missionId, curso } = await req.json();

    if (!alumnoId || !rowIndex || !respuestas || !missionId || !curso) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const active = await getActiveMission();
    if (!active || active.missionId !== missionId || active.curso !== curso) {
      return NextResponse.json({ error: "La misión ya no está activa" }, { status: 403 });
    }

    const elapsed = (Date.now() - new Date(active.startedAt).getTime()) / 1000 / 60;
    if (elapsed > active.durationMin) {
      return NextResponse.json({ error: "Tiempo agotado" }, { status: 403 });
    }

    const yaEntrego = await yaTieneCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: missionId.toUpperCase(),
    });

    if (yaEntrego) {
      return NextResponse.json({ error: "Ya entregaste esta misión" }, { status: 409 });
    }

    const missionConfig = MISSION_CONFIGS[curso];
    const missionData = missionConfig?.[missionId.toUpperCase()];
    if (!missionData) {
      return NextResponse.json({ error: "Misión no configurada" }, { status: 500 });
    }

    let total = 0;
    let correctas = 0;

    for (const block of missionData.blocks) {
      if (block.type === "text") {
        const key = block.prompt;
        const correcta = block.correct;
        if (!correcta) continue;
        const alumnoResp = String(respuestas[key] ?? "").trim();
        if (!alumnoResp) continue;
        total++;
        if (normalizar(alumnoResp) === normalizar(correcta)) correctas++;

      } else if (block.type === "grid") {
        for (const row of block.rows) {
          const key = `${block.prompt} [${row}]`;
          const correcta = block.correct?.[row];
          if (!correcta) continue;
          const alumnoResp = String(respuestas[key] ?? "").trim();
          if (!alumnoResp) continue;
          total++;
          if (normalizar(alumnoResp) === normalizar(correcta)) correctas++;
        }

      } else if (block.type === "checkbox_grid") {
        for (const row of block.rows) {
          const key = `${block.prompt} [${row}]`;
          const correctas_arr: string[] = block.correct?.[row] ?? [];
          if (correctas_arr.length === 0) continue;
          const alumnoResp = String(respuestas[key] ?? "").trim();
          if (!alumnoResp) continue;
          const alumnoArr = alumnoResp.split(",").map((s) => normalizar(s));
          const correctaArr = correctas_arr.map((s) => normalizar(s));
          total++;
          const match =
            alumnoArr.length === correctaArr.length &&
            correctaArr.every((c) => alumnoArr.includes(c));
          if (match) correctas++;
        }
      }
    }

    const score = total === 0 ? 0 : Math.round((correctas / total) * 100) / 100;

    await escribirCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: missionId.toUpperCase(),
      score,
    });

    await markPasswordUsedIfIndividual(Number(rowIndex));

    console.log(`✅ ${curso}/${missionId} alumno ${alumnoId}: ${correctas}/${total} → ${score}`);

    return NextResponse.json({ ok: true, correctas, total, score });
  } catch (err: any) {
    console.error("submit error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

function normalizar(s: string): string {
  return s.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
}