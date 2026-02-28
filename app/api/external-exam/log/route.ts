import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { studentId, event, data } = await req.json();

    if (!studentId || !event) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.externalWritingLog.create({
      data: {
        studentId,
        event,
        data: data ? JSON.stringify(data) : null
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}