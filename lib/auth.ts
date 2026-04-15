import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "dev_secret";
const COOKIE_NAME = "session_token";

export type SessionPayload = {
  uid: string;
  name?: string;
  role: "ADMIN" | "USER";
  nivelActual?: string;
  listNumber?: number;
  points?: number;
  resolvedCourseId?: string;
};

function isAdminId(id: string) {
  const adminIds = (process.env.ADMIN_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return adminIds.includes(id);
}

function deriveRole(uid: string): "ADMIN" | "USER" {
  return isAdminId(uid) ? "ADMIN" : "USER";
}

export function signSessionToken(payload: {
  uid: string;
  name?: string;
  nivelActual?: string;
  listNumber?: number;
  points?: number;
  resolvedCourseId?: string;
}) {
  const role = deriveRole(payload.uid);
  const full: SessionPayload = { ...payload, role };
  return jwt.sign(full, SECRET, { expiresIn: "30d" });
}

export async function readSessionFromHeaders(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, SECRET) as SessionPayload;
    const role = deriveRole(decoded.uid);
    return { ...decoded, role };
  } catch {
    return null;
  }
}

export function setSessionCookie(
  res: NextResponse,
  payload: {
    uid: string;
    name?: string;
    nivelActual?: string;
    listNumber?: number;
    points?: number;
    resolvedCourseId?: string;
  },
  maxAgeDays = 30
) {
  const token = signSessionToken(payload);

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeDays * 24 * 60 * 60,
    domain: process.env.NODE_ENV === "production" ? ".ariiben.com" : undefined,
  });

  return res;
}

export function clearSession(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    domain: process.env.NODE_ENV === "production" ? ".ariiben.com" : undefined,
  });

  return res;
}

export async function requireAdmin(): Promise<SessionPayload | null> {
  try {
    const s = await readSessionFromHeaders();
    return s && s.role === "ADMIN" ? s : null;
  } catch {
    return null;
  }
}