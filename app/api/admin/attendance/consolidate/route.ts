import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { courseId } = await req.json();

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const sheetsEndpoint = process.env.GS_ATTENDANCE_ENDPOINT;
    if (!sheetsEndpoint) {
      return NextResponse.json(
        { error: "Missing GS_ATTENDANCE_ENDPOINT" },
        { status: 500 }
      );
    }

    const url =
      `${sheetsEndpoint}` +
      `?action=consolidate&course=${encodeURIComponent(courseId)}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data, { status: res.ok ? 200 : 500 });
  } catch (err) {
    console.error("CONSOLIDATE ATTENDANCE ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}