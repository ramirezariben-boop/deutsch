import { redirect } from "next/navigation";
import { readSessionFromHeaders } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SchuelerClient from "./SchuelerClient";

export default async function SchuelerPage() {
  const session = await readSessionFromHeaders();

  if (!session) {
    return <div className="p-10 text-gray-400">No has iniciado sesión.</div>;
  }

  const userId = Number(session.uid);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      current_course: true,
    },
  });

  if (!user) {
    return <div className="p-10 text-red-400">Usuario no encontrado.</div>;
  }

  return (
    <SchuelerClient
      alumno={{
        id: user.id,
        name: user.name,
        course: user.current_course,
        list_number: null,
      }}
    />
  );
}