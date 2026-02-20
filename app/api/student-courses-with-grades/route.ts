import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = Number(searchParams.get("studentId"));

  const rows = await prisma.calificaciones.findMany({
    where: { studentId },
    select: { course: true },
    distinct: ["course"],
  });

  return NextResponse.json(rows);
}