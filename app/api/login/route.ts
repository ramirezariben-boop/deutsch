import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 🔑 LEER UNA SOLA VEZ
    const raw = await req.text();
    console.log("RAW LOGIN BODY >>>", JSON.stringify(raw));

    let id: string | null = null;
    let secret: string | null = null;

    // JSON
    if (raw.trim().startsWith("{")) {
      const body = JSON.parse(raw);
      id = body.id ?? null;
      secret = body.password ?? body.nip ?? null;
    } 
    // URL encoded
    else {
      const params = new URLSearchParams(raw);
      id = params.get("id");
      secret = params.get("password") ?? params.get("nip");
    }

    if (!id || !secret) {
      return new NextResponse("Datos inválidos", { status: 400 });
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT id, password, name FROM "User" WHERE id = $1`,
      Number(id)
    );

    if (!rows || rows.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = rows[0];

    console.log("DB PASSWORD >>>", user.password, typeof user.password);
    console.log("INPUT SECRET >>>", secret, typeof secret);

    // comparación STRING–STRING (ceros intactos)
const normalize = (v: string) => v.padStart(4, "0");

if (normalize(String(user.password)) !== normalize(String(secret))) {
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
