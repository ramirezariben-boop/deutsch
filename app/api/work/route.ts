import { prisma } from "@/lib/prisma";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await readSessionFromHeaders();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const workId = searchParams.get("workId");

  const work = await prisma.studentWork.findUnique({
    where: { id: workId! },
  });

  if (!work) {
    return new Response("Not found", { status: 404 });
  }

  if (work.studentId !== session.uid) {
    return new Response("Forbidden", { status: 403 });
  }

  return Response.json(work);
}