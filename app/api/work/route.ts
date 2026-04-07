import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const workId = searchParams.get("workId");

  if (!workId) {
    return new Response(
      JSON.stringify({ error: "Missing workId" }),
      { status: 400 }
    );
  }

  const work = await prisma.studentWork.findUnique({
    where: { id: workId },
  });

  if (!work) {
    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404 }
    );
  }

  return new Response(JSON.stringify(work));
}