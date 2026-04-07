import { prisma } from "@/lib/prisma";
import { readSessionFromHeaders } from "@/lib/auth";
import { generateConsentPDF } from "@/lib/pdf";

export async function POST(req: Request) {
  const session = await readSessionFromHeaders();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { workId, name } = body;

  if (!workId || !name) {
    return new Response("Missing data", { status: 400 });
  }

  const work = await prisma.studentWork.findUnique({
    where: { id: workId },
  });

  if (!work) {
    return new Response("Work not found", { status: 404 });
  }

  if (work.studentId !== session.uid) {
    return new Response("Forbidden", { status: 403 });
  }

  const existing = await prisma.consentPublication.findUnique({
    where: {
      studentId_workId: {
        studentId: session.uid,
        workId,
      },
    },
  });

  if (existing) {
    return new Response("Already signed", { status: 409 });
  }

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    null;

  const userAgent = req.headers.get("user-agent");

  const now = new Date().toISOString();

  // guardar consentimiento
  await prisma.consentPublication.create({
    data: {
      studentId: session.uid,
      workId,
      workTitle: work.title,
      name,
      fileHash: work.fileHash,
      ip,
      userAgent,
    },
  });

  // generar PDF
  const pdfBytes = await generateConsentPDF({
    name,
    workTitle: work.title || "",
    workId,
    fileHash: work.fileHash,
    date: now,
  });

  // devolver PDF directamente
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="consent-${workId}.pdf"`,
    },
  });
}