import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(req: Request) {
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}

export async function GET(req: Request) {
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}