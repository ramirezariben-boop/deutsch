import Viewer from "./viewer";

export default function AdminStudentLivePage({ params }: { params: { studentId: string } }) {
  const studentId = Number(params.studentId);

  return <Viewer studentId={studentId} />;
}
