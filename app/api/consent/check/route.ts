import { prisma } from "@/lib/prisma";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await readSessionFromHeaders();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const workId = searchParams.get("workId");

  const existing = await prisma.consentPublication.findUnique({
    where: {
      studentId_workId: {
        studentId: session.uid,
        workId: workId!,
      },
    },
  });

  return Response.json({ signed: !!existing });
}