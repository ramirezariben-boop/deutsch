export type CheckInPayload = {
  studentId: string;
  courseId: string;
  triggeredBy: string;
  confidence: number;
  motivation: number;
  frustration: number;
  reflection: string;
};

export async function postEmotionalCheckIn(data: CheckInPayload): Promise<void> {
  const endpoint = process.env.GS_ATTENDANCE_ENDPOINT;
  const token = process.env.GS_ATTENDANCE_TOKEN;

  if (!endpoint || !token) throw new Error("Missing GS config");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "emotional_checkin", token, ...data }),
  });

  if (!res.ok) throw new Error("Apps Script error");
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "Apps Script error");
}

export async function getEmotionalCheckIns(studentId: string) {
  const endpoint = process.env.GS_ATTENDANCE_ENDPOINT;
  if (!endpoint) throw new Error("Missing GS config");

  const url = `${endpoint}?action=emotional_checkins&student_id=${encodeURIComponent(studentId)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Apps Script error");
  return res.json();
}
