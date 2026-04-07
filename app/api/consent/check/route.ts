import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const studentId = searchParams.get("studentId");
  const workId = searchParams.get("workId");

  if (!studentId || !workId) {
    return new Response(JSON.stringify({ signed: false }));
  }

  const existing = await prisma.consentPublication.findUnique({
    where: {
      studentId_workId: {
        studentId,
        workId,
      },
    },
  });

  return new Response(
    JSON.stringify({ signed: !!existing })
  );
}