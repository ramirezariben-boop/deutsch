// app/api/missions/active/route.ts
import { NextResponse } from "next/server";
import { getActiveMission } from "@/lib/sheets/passwords";

export async function GET() {
  try {
    const active = await getActiveMission();
    return NextResponse.json({ active });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}