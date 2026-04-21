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
        // Identidad base
        id: session.uid,
        uid: session.uid,
        name: session.name,
        role: session.role,

        // Datos académicos / panel
        isCurrent: session.isCurrent ?? false,
        listNumber: session.listNumber ?? null,
        nivelActual: session.nivelActual ?? null,
        course: session.course ?? null,
        resolvedCourseId: session.resolvedCourseId ?? null,
        courseId: session.resolvedCourseId ?? null,

        // Trading / puntos
        points: session.points ?? null,

        // Clasificación de curso
        day: session.day ?? null,
        privCode: session.privCode ?? null,
      },
    });
  } catch (error) {
    console.error("GET /api/session error:", error);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}