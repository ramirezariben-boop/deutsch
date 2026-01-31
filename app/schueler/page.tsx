import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import SchuelerClient from "./SchuelerClient";

export default async function SchuelerPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return <div className="p-10 text-gray-400">No has iniciado sesión.</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(session) },
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
