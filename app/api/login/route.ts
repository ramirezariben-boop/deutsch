import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Leemos SIEMPRE como texto, da igual si viene JSON o urlencoded
    const raw = await req.text();
    // console.log("RAW BODY LOGIN:", raw);

    let id: string | null = null;
    let secret: string | null = null;

    // Si parece JSON (empieza con "{"), lo parseamos como JSON
    if (raw.trim().startsWith("{")) {
      const body = JSON.parse(raw);
      id = body.id ?? null;
      secret = body.password ?? body.nip ?? null;
    } else {
      // Si no, lo tratamos como URLSearchParams: id=64&nip=1672
      const params = new URLSearchParams(raw);
      id = params.get("id");
      secret = params.get("password") ?? params.get("nip");
    }

    if (!id || !secret) {
      return new NextResponse("Datos inválidos", { status: 400 });
    }

    // Buscar usuario en la tabla "User"
    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, password, name FROM "User" WHERE id = $1`,
      Number(id)
    );

    if (!rows || rows.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = rows[0];

    // Comparamos con la columna password,
    // aunque el frontend lo llame nip o password
    if (user.password !== secret) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = NextResponse.json({ ok: true, name: user.name });

    res.cookies.set("session", String(user.id), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error("Error en /api/login:", err);
    return new NextResponse("Error interno", { status: 500 });
  }
}
