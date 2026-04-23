import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET() {
  try {
    const session = await readSessionFromHeaders();

    if (!session) {
      return NextResponse.json({ loggedIn: false });
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        id: session.uid,
        uid: session.uid,
        name: session.name,
        role: session.role,

        points: session.points ?? null,
        isCurrent: session.isCurrent ?? false,
        listNumber: session.listNumber ?? null,

        nivelActual: session.nivelActual ?? null,
        course: session.nivelActual ?? null,
        resolvedCourseId: session.resolvedCourseId ?? null,
        courseId: session.resolvedCourseId ?? null,

        day: session.day ?? null,
        privCode: session.privCode ?? null,

        level: session.level ?? 0,
        levelUpdatedAt: session.levelUpdatedAt ?? null,
        levelMeta: session.levelMeta ?? null,
      },
    });
  } catch (error) {
    console.error("GET /api/session error:", error);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}