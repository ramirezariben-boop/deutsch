// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  // ── Rutas que requieren solo estar logueado ──
  const protectedRoutes = ["/dashboard"];
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    try {
      await jwtVerify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ── Rutas que requieren rol ADMIN ──
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/schuler", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/exam).*)"],
};