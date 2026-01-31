// app/lib/readSheet.ts

export async function readSheetJSON(
  url: string
): Promise<Record<string, any>[]> {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error leyendo Google Sheet");
  }

  return res.json();
}
