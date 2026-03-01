import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { studentId, event, data } = await req.json();

    if (!studentId || !event) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

const BLUR_THRESHOLD_MS = 5000; // 5 segundos

let suspected = false;

if (event === "paste") {
  suspected = true;
}

if (
  event === "blur_duration" &&
  data?.durationMs &&
  data.durationMs > BLUR_THRESHOLD_MS
) {
  suspected = true;
}

if (event === "typing" && typeof data === "string") {
  const currentCount = data.trim().split(/\s+/).length;

  const lastTyping = await prisma.externalWritingLog.findFirst({
    where: {
      studentId,
      event: "typing",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (lastTyping?.data) {
    try {
      const previousText = JSON.parse(lastTyping.data);
      const prevCount = previousText.trim().split(/\s+/).length;
      const diff = currentCount - prevCount;

      if (diff > 40) {
        await prisma.externalWritingLog.create({
          data: {
            studentId,
            event: "jump_detected",
            data: JSON.stringify({ addedWords: diff }),
            suspected: true,
          },
        });
      }
    } catch {}
  }
}

await prisma.externalWritingLog.create({
  data: {
    studentId,
    event,
    data: JSON.stringify(data),
    suspected,
  },
});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}