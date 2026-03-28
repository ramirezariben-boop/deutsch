import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ExamByStudent({ params }) {
  const cookieStore = await cookies();

  const adminSession = cookieStore.get("external_admin_session")?.value;

  // 🔐 Validación admin
  if (!adminSession) redirect("/");

  const admin = await prisma.externalAdmin.findUnique({
    where: { id: adminSession },
  });

  if (!admin) redirect("/");

  const studentId = Number(params.studentId);

  if (isNaN(studentId)) redirect("/");

  const exams = await prisma.writingExam.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Exámenes del alumno {studentId}
      </h1>

      <pre className="bg-black border border-gray-700 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(exams, null, 2)}
      </pre>
    </div>
  );
}