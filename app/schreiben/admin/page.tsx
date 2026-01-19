import { prisma } from "@/lib/prisma";

export default async function Admin() {
  const grouped = await prisma.writingLog.groupBy({
    by: ["studentId"],
    _count: true,
  });

  return (
    <div className="p-10 text-white space-y-4">
      <h1 className="text-3xl font-bold mb-6">Monitor de examen</h1>

      {grouped.map((g) => (
        <a
          key={g.studentId}
          href={`/schreiben/admin/${g.studentId}`}
          className="block bg-gray-800 hover:bg-gray-700 p-4 rounded-xl"
        >
          <div className="flex justify-between">
            <span>Alumno {g.studentId}</span>
            <span>{g._count} eventos</span>
          </div>
        </a>
      ))}
    </div>
  );
}
