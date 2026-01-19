import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const ADMIN_ID = 64;

export default async function ExamByStudent({ params }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) redirect("/");
  if (Number(session.value) !== ADMIN_ID) redirect("/");

  const studentId = Number(params.studentId);

  const exams = await prisma.writingExam.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Exámenes del alumno {studentId}</h1>

      <pre className="bg-black border border-gray-700 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(exams, null, 2)}
      </pre>
    </div>
  );
}
