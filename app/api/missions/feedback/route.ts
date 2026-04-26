import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await readSessionFromHeaders();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // Get the latest unlocked submission per (missionId, curso)
  const latestPerMission = await prisma.missionFeedback.findMany({
    where: {
      alumnoId: String(session.uid),
      missionExpiresAt: { lt: now },
    },
    orderBy: { submittedAt: "desc" },
    distinct: ["missionId", "curso"],
    select: {
      submissionId: true,
      missionId: true,
      curso: true,
      variantId: true,
      score: true,
      submittedAt: true,
    },
  });

  if (latestPerMission.length === 0) {
    return NextResponse.json([]);
  }

  const result = await Promise.all(
    latestPerMission.map(async (m) => {
      const questions = await prisma.missionFeedback.findMany({
        where: { submissionId: m.submissionId },
        select: {
          question: true,
          studentAnswer: true,
          correctAnswer: true,
          isCorrect: true,
        },
      });

      return {
        missionId: m.missionId,
        curso: m.curso,
        variantId: m.variantId,
        score: m.score,
        submittedAt: m.submittedAt.toISOString(),
        questions,
      };
    })
  );

  return NextResponse.json(result);
}
