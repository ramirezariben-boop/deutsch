import { NextResponse } from "next/server";
import { getAllGradesForStudent } from "@/lib/grades";
import { readSessionFromHeaders } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await readSessionFromHeaders();


  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const studentId = Number(searchParams.get("student_id"));

  if (!studentId) {
    return NextResponse.json(
      { error: "Missing student_id" },
      { status: 400 }
    );
  }

  if (String(studentId) !== String(session.uid)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  if (session.isCurrent !== true) {
    return NextResponse.json({
      student_id: studentId,
      course: session.nivelActual ?? null,
      hasCurrentCourseData: false,
      grades: [],
    });
  }

  const currentCourse = session.nivelActual?.trim();

  if (!currentCourse) {
    return NextResponse.json({
      student_id: studentId,
      course: null,
      hasCurrentCourseData: false,
      grades: [],
    });
  }

  const grades = await getAllGradesForStudent(currentCourse, studentId);

  if (!grades || !grades.length) {
    return NextResponse.json({
      student_id: studentId,
      course: currentCourse,
      hasCurrentCourseData: false,
      grades: [],
    });
  }

  return NextResponse.json({
    student_id: studentId,
    course: currentCourse,
    hasCurrentCourseData: true,
    grades,
  });
}