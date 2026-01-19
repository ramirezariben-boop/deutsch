import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔥 CLAVE

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.preferences) {
      return NextResponse.json(
        { error: "Missing preferences" },
        { status: 400 }
      );
    }

    console.log("📥 Preferencias recibidas:", {
      timestamp: new Date().toISOString(),
      preferences: body.preferences,
    });

    const url = process.env.GSHEET_GROUP_PREFERENCES_URL;

    if (!url) {
      console.error("❌ GSHEET_GROUP_PREFERENCES_URL no definida");
      return NextResponse.json(
        { error: "Sheets URL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        preferences: body.preferences,
      }),
    });

    const text = await res.text();
    console.log("📤 Respuesta Google:", text);

    if (!res.ok) {
      throw new Error("Google Apps Script error");
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("❌ Error en /api/schueler/preferences", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
