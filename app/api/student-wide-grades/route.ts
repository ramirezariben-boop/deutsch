import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbxGlJJlOHEVKiMsCxuZd4Ct28G0q6scNa9VeCYTjYKXX65VtOkhRJrBM2BOSu36jzs/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);
  const data = await res.json();

  return NextResponse.json(data);
}