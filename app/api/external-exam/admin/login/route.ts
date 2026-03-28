import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";

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

    // 🔐 ahora usamos JWT
    setSessionCookie(res, {
      uid: cleanId,
      name: "Admin"
    });

    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}