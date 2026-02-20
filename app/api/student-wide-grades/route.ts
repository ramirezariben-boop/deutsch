import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxaVrG_CASK0Kd_Ze2fhAPncJFpvKk0mjLGN5FU8RfZCm1E2kM_Q8GmXB1xbZxQAHgw/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);
  const data = await res.json();

  return NextResponse.json(data);
}