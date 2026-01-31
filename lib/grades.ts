import { readSheetJSON } from "./readSheet";

type Row = Record<string, any>;

export async function getAllGradesForStudent(
  course: string,
  studentId: number
) {
  const endpoint = process.env.GS_GRADES_ENDPOINT;
  if (!endpoint) throw new Error("GS_GRADES_ENDPOINT no definido");

  const rows: Row[] = await readSheetJSON(
    `${endpoint}?sheet=${course}`
  );

  if (!rows.length) return null;

  const studentRow = rows.find(
    r => Number(r.ID) === studentId
  );

  if (!studentRow) return null;

  return Object.keys(studentRow)
    .filter(k => /^[0-9]+[A-Z]$/.test(k)) // 1A, 2B, etc.
    .sort((a, b) => {
      const na = parseInt(a);
      const nb = parseInt(b);
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    })
    .map(k => ({
      key: k,
      value:
        studentRow[k] === "" || studentRow[k] == null
          ? null
          : Math.round(Number(studentRow[k]) * 100),
    }));
}
