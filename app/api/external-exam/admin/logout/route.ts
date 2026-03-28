import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

function clearSessionAndRedirect(req: Request) {
  const origin = new URL(req.url).origin;
  const res = NextResponse.redirect(origin);

  clearSession(res);

  return res;
}

export async function POST(req: Request) {
  return clearSessionAndRedirect(req);
}

export async function GET(req: Request) {
  return clearSessionAndRedirect(req);
}