"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/missions/LoadingScreen";
import type { MissionAccessSession } from "@/lib/missions/types";

type Phase = "select" | "loading";

export default function MissionsPage() {
  const router = useRouter();
  const [session, setSession] = useState<{
    id: string;
    name: string;
    curso: string;
  } | null>(null);
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<Phase>("select");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then(async (data) => {
        if (!data.loggedIn) {
          router.replace("/");
          return;
        }

        let nivelActual = data.user.nivelActual;

        if (!nivelActual) {
          const res = await fetch("/api/user/nivel");
          if (res.ok) {
            const d = await res.json();
            nivelActual = d.nivelActual;
          }
        }

        setSession({
          id: String(data.user.id),
          name: data.user.name,
          curso: nivelActual,
        });
      })
      .catch(() => {
        setError("No se pudo leer la sesión");
      });
  }, [router]);

  async function handleValidar() {
    if (!session) return;

    if (password.length !== 4) {
      setError("El password es de 4 dígitos");
      return;
    }

    setPhase("loading");
    setError("");

    try {
      const res = await fetch("/api/missions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, alumnoId: session.id }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "No se pudo validar la misión");
        setPhase("select");
        return;
      }

      const accessSession: MissionAccessSession = {
        missionId: data.missionId,
        missionTitle: data.missionTitle,
        curso: data.curso,
        expiresAt: Number(data.expiresAt),
        rowIndex: Number(data.rowIndex),
        alumnoId: session.id,
        variants: data.variants,
      };

      sessionStorage.setItem(
        "missionAccessSession",
        JSON.stringify(accessSession)
      );

      router.push(`/missions/${data.curso}/${data.missionId}`);
    } catch {
      setError("Error de conexión");
      setPhase("select");
    }
  }

  if (phase === "loading") return <LoadingScreen />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e0e0e0",
        fontFamily: "monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <p
          style={{
            color: "#1da854",
            fontSize: "10px",
            letterSpacing: "4px",
            marginBottom: "0.5rem",
          }}
        >
          MISSIONENZENTRUM
        </p>

        <h1
          style={{
            color: "#4dff91",
            fontSize: "22px",
            margin: "0 0 0.5rem",
            letterSpacing: "2px",
          }}
        >
          {session?.name ?? "..."}
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "12px",
            margin: "0 0 2rem",
            lineHeight: 1.5,
          }}
        >
          Ingresa el password de la misión activa para ver sus variantes.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "11px",
              color: "#888",
              letterSpacing: "2px",
            }}
          >
            PASSWORD
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              onKeyDown={(e) => e.key === "Enter" && handleValidar()}
              placeholder="• • • •"
              style={{
                ...inputStyle,
                textAlign: "center",
                fontSize: "20px",
                letterSpacing: "8px",
              }}
            />
          </label>

          {error && (
            <p
              style={{
                color: "#ff4444",
                fontSize: "12px",
                margin: 0,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            onClick={handleValidar}
            style={{
              background: "#4dff91",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              padding: "0.875rem",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "13px",
              letterSpacing: "3px",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            ▶ VER VARIANTES
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#060f06",
  color: "#4dff91",
  border: "1px solid #1a3a1a",
  borderRadius: "6px",
  padding: "0.75rem 1rem",
  fontFamily: "monospace",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  height: "52px",
};