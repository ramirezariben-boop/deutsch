//app/api/grades/route.ts
import { NextResponse } from "next/server";
import { getAllGradesForStudent } from "@/lib/grades";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = Number(searchParams.get("student_id"));

  if (!studentId) {
    return NextResponse.json(
      { error: "Missing student_id" },
      { status: 400 }
    );
  }

const course = searchParams.get("course");

if (!course) {
  return NextResponse.json(
    { error: "Missing course" },
    { status: 400 }
  );
}

  const grades = await getAllGradesForStudent(
    course,
    studentId
  );

  if (!grades) {
    return NextResponse.json(
      { error: "Student not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    student_id: studentId,
    grades,
  });
}
