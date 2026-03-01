import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    if (!id || !password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const cleanId = id.trim();
    const cleanPassword = password.trim();

    const admin = await prisma.externalAdmin.findUnique({
      where: { id: cleanId }
    });

    if (!admin || admin.password.trim() !== cleanPassword) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    // 🔐 Cookie HTTP-only
    res.cookies.set("external_admin_session", cleanId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true en producción
      path: "/"
    });

    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}