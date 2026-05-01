import { readSessionFromHeaders } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grammatik · Deutsch mit AriiBen",
  description: "Material gramatical",
};

export default async function GrammatikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readSessionFromHeaders();
  if (!session) redirect("/");
  return <>{children}</>;
}
