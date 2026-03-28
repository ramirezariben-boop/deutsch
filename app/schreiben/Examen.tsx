import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ExamenClient from "./ExamenClient";

export default async function SchreibenPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  // Protección del examen
  if (!session || session.trim() === "") {
    redirect("/");
  }

  return <ExamenClient />;
}