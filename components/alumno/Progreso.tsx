"use client";

import StudentPoints from "./StudentPoints";

type Props = {
  studentId: number;
};

export default function Progreso({ studentId }: Props) {
  return <StudentPoints studentId={studentId} />;
}