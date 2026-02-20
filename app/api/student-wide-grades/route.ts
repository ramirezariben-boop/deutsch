import { NextResponse } from "next/server";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyNA6xgjPR6D0BikIgWzkKGdDpWp6aSu_92mZWt4-rRns_CY5AMSJUb7RoHuS2F8A/exec";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  const res = await fetch(`${GAS_URL}?studentId=${studentId}`);
  const data = await res.json();

  return NextResponse.json(data);
}