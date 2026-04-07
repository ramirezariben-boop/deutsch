// app/api/consent/route.ts

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { studentId, workId, workTitle, name } = body;

  if (!studentId || !workId || !name) {
    return new Response("Missing data", { status: 400 });
  }

  // evitar doble firma
  const existing = await prisma.consentPublication.findUnique({
    where: {
      studentId_workId: {
        studentId,
        workId,
      },
    },
  });

  if (existing) {
    return new Response(
      JSON.stringify({ error: "Ya firmado" }),
      { status: 409 }
    );
  }

  // obtener metadata
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    null;

  const userAgent = req.headers.get("user-agent");

  await prisma.consentPublication.create({
    data: {
      studentId,
      workId,
      workTitle,
      name,
      ip,
      userAgent,
    },
  });

  return new Response(JSON.stringify({ ok: true }));
}