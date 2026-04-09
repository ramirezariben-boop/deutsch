// app/api/user/nivel/route.ts
import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET() {
  const session = await readSessionFromHeaders();
  if (!session) return NextResponse.json({ error: "No session" }, { status: 401 });

  const res = await fetch(
    `${process.env.CLASSROOM_TRADING_URL}/api/internal/user-nivel?id=${session.uid}`,
    { headers: { Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}` } }
  );

  if (!res.ok) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(await res.json());
}