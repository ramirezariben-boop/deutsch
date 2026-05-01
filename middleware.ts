// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { canAccess, FOLDER_REQUIRED_NIVEL } from "@/lib/grammatik/access";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Matches /grammatik/<folder>/<file>.html  or  .pdf
const GRAMMATIK_ASSET = /^\/grammatik\/([^/]+)\/.+\.(html|pdf)$/;

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

  // ── Archivos estáticos de /grammatik — requieren sesión + nivel ──
  const grammatikMatch = GRAMMATIK_ASSET.exec(pathname);
  if (grammatikMatch) {
    if (!token) return NextResponse.redirect(new URL("/", req.url));
    try {
      const { payload } = await jwtVerify(token, SECRET);
      const folder = grammatikMatch[1]; // e.g. "basico-2"
      const requiredNivel = FOLDER_REQUIRED_NIVEL[folder];

      if (requiredNivel) {
        const nivelActual = payload.nivelActual as string | undefined;
        if (!canAccess(nivelActual, requiredNivel)) {
          return NextResponse.redirect(
            new URL("/grammatik?locked=1", req.url)
          );
        }
      }
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/exam).*)"],
};