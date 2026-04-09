// app/api/missions/validate/route.ts
import { NextResponse } from "next/server";
import { findPassword, getActiveMission } from "@/lib/sheets/passwords";
import { MAPEO } from "@/config/mapeo-auto";
import { MISSION_MAP } from "@/config/missionMap";

export async function POST(req: Request) {
  try {
    const { password, alumnoId } = await req.json();

    if (!password || !alumnoId) {
      return NextResponse.json(
        { error: "Faltan datos" },
        { status: 400 }
      );
    }

    // 1. ¿Hay misión activa?
    const active = await getActiveMission();
    if (!active) {
      return NextResponse.json(
        { error: "No hay misión activa en este momento" },
        { status: 403 }
      );
    }

    // 2. ¿El timer sigue corriendo?
    const startedAt = new Date(active.startedAt).getTime();
    const now = Date.now();
    const elapsed = (now - startedAt) / 1000 / 60; // minutos
    if (elapsed > active.durationMin) {
      return NextResponse.json(
        { error: "El tiempo de esta misión ya terminó" },
        { status: 403 }
      );
    }

    // 3. ¿El password es válido para esta misión?
    const match = await findPassword(password, active.missionId);
    if (!match) {
      return NextResponse.json(
        { error: "Password incorrecto o ya utilizado" },
        { status: 401 }
      );
    }

    // 4. ¿El alumnoId coincide?
    if (String(match.alumnoId) !== String(alumnoId)) {
      return NextResponse.json(
        { error: "Este password no corresponde a tu cuenta" },
        { status: 401 }
      );
    }

    // 5. Obtener las preguntas de la misión
    const missionKey = MISSION_MAP[active.curso]?.[active.missionId];
    const preguntas = missionKey ? MAPEO[active.curso]?.[missionKey] : null;

    if (!preguntas) {
      return NextResponse.json(
        { error: "Misión no configurada" },
        { status: 500 }
      );
    }

    // ✅ Todo ok — devolvemos preguntas + tiempo restante
    // NO marcamos el password como usado todavía (eso lo hace /submit)
    const remainingSec = Math.floor(
      (active.durationMin * 60) - ((now - startedAt) / 1000)
    );

    return NextResponse.json({
      ok: true,
      missionId: active.missionId,
      curso: active.curso,
      preguntas,
      remainingSec,
      rowIndex: match.rowIndex, // el frontend lo guarda para pasarlo al submit
    });

  } catch (err: any) {
    console.error("validate error:", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}