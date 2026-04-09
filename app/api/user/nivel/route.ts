// app/api/user/nivel/route.ts
import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET() {
  const session = await readSessionFromHeaders();
  if (!session) return NextResponse.json({ error: "No session" }, { status: 401 });

  console.log("Llamando a CT con id:", session.uid);
  console.log("URL:", `${process.env.CLASSROOM_TRADING_URL}/api/internal/user-nivel?id=${session.uid}`);
  console.log("SECRET existe:", !!process.env.INTERNAL_API_SECRET);

  try {
    const res = await fetch(
      `${process.env.CLASSROOM_TRADING_URL}/api/internal/user-nivel?id=${session.uid}`,
      { headers: { Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}` } }
    );

    console.log("CT response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log("CT response body:", text);
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json(await res.json());
  } catch (err: any) {
    console.error("Error fetching CT:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}