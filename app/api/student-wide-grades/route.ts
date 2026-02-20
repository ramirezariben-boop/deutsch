import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyw33MkXVwLR1Bz5jY0bpVz6Mhu7kpzetpvWH6GA4FLygTdWTiuG7PbkGqdjWqAF27B/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);
  const data = await res.json();

  return NextResponse.json(data);
}