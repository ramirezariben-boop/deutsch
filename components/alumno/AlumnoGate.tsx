"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AlumnoGate() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/session", {
          credentials: "include",
        });

        if (!res.ok) return;

        const json = await res.json();

        if (json.loggedIn) {
          router.push("/schueler");
        }
      } catch (err) {
        console.error("Error comprobando sesión:", err);
      }
    }

    checkSession();
  }, [router]);

  return null; // 👈 importante: NO renderiza nada
}
