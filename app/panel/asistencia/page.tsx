// app/panel/asistencia/page.tsx
import { headers } from "next/headers";

type AttendanceRow = {
  student_id: number;
  name: string;
  A: number | null;
  B: number | null;
  C: number | null;
  class_pct: number;
  cenlex: string;
  tolerance: string;
};

async function getAttendance(): Promise<AttendanceRow[]> {
  const h = await headers();
  const host = h.get("host");

  if (!host) return [];

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/attendance?course=2026_2&class=2026_2_01`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const json = await res.json();
  return Array.isArray(json) ? json : [];
}


export default async function AsistenciaPage() {
  const data = (await getAttendance()) ?? [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-700">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Alumno</th>
            <th className="p-2 text-center">A</th>
            <th className="p-2 text-center">B</th>
            <th className="p-2 text-center">C</th>
            <th className="p-2 text-center">Clase %</th>
            <th className="p-2 text-center">CENLEX</th>
            <th className="p-2 text-center">Tol.</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => (
            <tr
              key={r.student_id}
              className="border-b border-neutral-800 hover:bg-neutral-800/40"
            >
              <td className="p-2">{r.student_id}</td>
              <td className="p-2">{r.name}</td>

              {[r.A, r.B, r.C].map((v, i) => (
                <td key={i} className="p-2 text-center">
                  {v === null ? "—" : v.toFixed(2)}
                </td>
              ))}

              <td className="p-2 text-center font-semibold">
                {r.class_pct.toFixed(2)}
              </td>
              <td className="p-2 text-center">{r.cenlex}</td>
              <td className="p-2 text-center">{r.tolerance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
