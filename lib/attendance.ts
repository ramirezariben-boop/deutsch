import { GSHEETS } from "./gsheets";
import { readSheetJSON } from "./readSheet";

export async function getAttendanceForStudent(
  studentId: number
) {
  const url =
    process.env.GS_ATTENDANCE_ENDPOINT + "?sheet=attendance_records";

  const rows = await readSheetJSON(url);

  return rows.filter(
    (r) => Number(r.student_id) === studentId
  );
}
