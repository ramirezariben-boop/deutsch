import { NextResponse } from "next/server";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET() {
  try {
    const session = await readSessionFromHeaders();

    if (!session) {
      return NextResponse.json({ loggedIn: false });
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        id: session.uid,
        name: session.name,
        role: session.role,
      },
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}