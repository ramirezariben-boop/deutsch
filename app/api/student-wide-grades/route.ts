import { NextResponse } from "next/server";

const GAS_URL = process.env.GS_GRADES_ENDPOINT;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);
  const data = await res.json();

  return NextResponse.json(data);
}