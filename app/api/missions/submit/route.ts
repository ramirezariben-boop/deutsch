// app/api/missions/submit/route.ts
import { NextResponse } from "next/server";
import { markPasswordUsed, getActiveMission } from "@/lib/sheets/passwords";
import { escribirCalificacionSheet } from "@/lib/sheets/calificaciones";
import { RESPUESTAS } from "@/config/respuestas-auto";
import { MAPEO } from "@/config/mapeo-auto";
import { MISSION_MAP } from "@/config/missionMap";

export async function POST(req: Request) {
  try {
    const { alumnoId, rowIndex, respuestas, missionId, curso } =
      await req.json();

    if (!alumnoId || !rowIndex || !respuestas || !missionId || !curso) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // 1. Misión sigue activa
    const active = await getActiveMission();
    if (!active || active.missionId !== missionId || active.curso !== curso) {
      return NextResponse.json(
        { error: "La misión ya no está activa" },
        { status: 403 }
      );
    }

    // 2. Tiempo no agotado
    const elapsed =
      (Date.now() - new Date(active.startedAt).getTime()) / 1000 / 60;
    if (elapsed > active.durationMin) {
      return NextResponse.json(
        { error: "Tiempo agotado" },
        { status: 403 }
      );
    }

    // 3. Obtener la lista de preguntas de esta práctica desde el MAPEO
    const missionKey = MISSION_MAP[curso]?.[missionId]; // "PRACTICA_1A"
    if (!missionKey) {
      return NextResponse.json({ error: "Misión no configurada" }, { status: 500 });
    }

    const preguntasDeLaPractica: string[] = MAPEO[curso]?.[missionKey] ?? [];
    const todasLasRespuestas: Record<string, string> = RESPUESTAS[curso] ?? {};

    // 4. Calificar — solo las preguntas de esta práctica
    let total = 0;
    let correctas = 0;

    for (const pregunta of preguntasDeLaPractica) {
      const correcta = todasLasRespuestas[pregunta];
      if (!correcta) continue; // pregunta sin respuesta configurada

      const alumnoResp = String(respuestas[pregunta] ?? "").trim();
      if (!alumnoResp) continue; // el alumno no contestó esta pregunta

      total++;
      if (normalizar(alumnoResp) === normalizar(correcta)) {
        correctas++;
      }
    }

    const score = total === 0 ? 0 : Math.round((correctas / total) * 100) / 100;

    // 5. Escribir en Sheet
    await escribirCalificacionSheet({
      curso,
      alumnoId: String(alumnoId),
      practica: missionId, // "1A"
      score,
    });

    // 6. Marcar password usado — DESPUÉS de escribir, no antes
    await markPasswordUsed(rowIndex);

    console.log(`✅ ${curso} / ${missionId} — alumno ${alumnoId}: ${correctas}/${total} → ${score}`);

    return NextResponse.json({ ok: true, correctas, total, score });

  } catch (err: any) {
    console.error("submit error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

function normalizar(s: string): string {
  return s.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
}