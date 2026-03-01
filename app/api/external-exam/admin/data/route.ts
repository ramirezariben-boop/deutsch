import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const sessionCookie = cookieHeader
      .split("; ")
      .find(c => c.startsWith("external_admin_session="));

    if (!sessionCookie) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const adminId = sessionCookie.split("=")[1];

    const admin = await prisma.externalAdmin.findUnique({
      where: { id: adminId }
    });

    if (!admin) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const exams = await prisma.externalWritingExam.findMany({
      include: { student: true },
      orderBy: { submittedAt: "desc" }
    });

    const logs = await prisma.externalWritingLog.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({
      ok: true,
      exams,
      logs
    });

  } catch (error) {
    console.error("ADMIN DATA ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Error loading admin data" },
      { status: 500 }
    );
  }
}