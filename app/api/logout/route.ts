import { NextResponse } from "next/server";

function clearSessionAndRedirect(req: Request) {
  const origin = new URL(req.url).origin;   // ← crea URL absoluta correcta
  const res = NextResponse.redirect(origin); // ← redirige a "/"
  res.cookies.set("session", "", { path: "/", maxAge: 0 });
  return res;
}

export async function POST(req: Request) {
  return clearSessionAndRedirect(req);
}

export async function GET(req: Request) {
  return clearSessionAndRedirect(req);
}
