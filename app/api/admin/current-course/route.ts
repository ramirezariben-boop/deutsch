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

    const res = await fetch(
      "https://classroom-trading.ariiben.com/api/admin/current-course",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}`,
        },
        body: JSON.stringify({ courseId }),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("CURRENT COURSE ADMIN ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}