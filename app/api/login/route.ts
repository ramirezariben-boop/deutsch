import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const raw = await req.text();

    let id: string | null = null;
    let secret: string | null = null;

    if (raw.trim().startsWith("{")) {
      const body = JSON.parse(raw);
      id = body.id ?? null;
      secret = body.password ?? body.nip ?? null;
    } else {
      const params = new URLSearchParams(raw);
      id = params.get("id");
      secret = params.get("password") ?? params.get("nip");
    }

    if (!id || !secret) {
      return new NextResponse("Datos inválidos", { status: 400 });
    }

    const response = await fetch(
      "https://classroom-trading.ariiben.com/api/auth/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}`,
        },
        body: JSON.stringify({ id, nip: secret }),
      }
    );

    if (!response.ok) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await response.json();

    const res = NextResponse.json({
      ok: true,
      name: user.name,
      user: {
        id: user.id,
        name: user.name,
        nivelActual: user.nivelActual,
        resolvedCourseId: user.resolvedCourseId ?? null,
        isCurrent: user.isCurrent ?? false,
        day: user.day ?? null,
        privCode: user.privCode ?? null,
        listNumber: user.listNumber ?? null,
        points: user.points ?? null,

        level: user.level ?? 0,
        levelUpdatedAt: user.levelUpdatedAt ?? null,
        levelMeta: user.levelMeta ?? null,
      },
    });

    setSessionCookie(res, {
      uid: String(user.id),
      name: user.name,
      nivelActual: user.nivelActual ?? undefined,
      listNumber: user.listNumber ?? undefined,
      points: user.points ?? undefined,
      resolvedCourseId: user.resolvedCourseId ?? undefined,
      isCurrent: user.isCurrent ?? false,
      day: user.day ?? undefined,
      privCode: user.privCode ?? undefined,

      level: user.level ?? 0,
      levelUpdatedAt: user.levelUpdatedAt ?? undefined,
      levelMeta: user.levelMeta ?? undefined,
    });

    return res;
  } catch (err) {
    console.error("Error en /api/login:", err);
    return new NextResponse("Error interno", { status: 500 });
  }
}