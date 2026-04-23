"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingScreen from "@/components/missions/LoadingScreen";
import type { MissionAccessSession } from "@/lib/missions/types";

type Phase = "loading" | "ready" | "expired";

function getSecondsLeft(expiresAt: number) {
  return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
}

function stars(difficulty: number) {
  const n = Math.max(1, Math.min(5, Math.round(Number(difficulty) || 1)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

export default function MissionVariantsPage() {
  const router = useRouter();
  const params = useParams<{ nivel: string; mission: string }>();

  const [session, setSession] = useState<MissionAccessSession | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const nivelParam = String(params.nivel ?? "");
  const missionParam = String(params.mission ?? "").toUpperCase();

  useEffect(() => {
    const raw = sessionStorage.getItem("missionAccessSession");
    if (!raw) {
      router.replace("/missions");
      return;
    }

    const data: MissionAccessSession = JSON.parse(raw);

    if (data.curso !== nivelParam || data.missionId !== missionParam) {
      router.replace("/missions");
      return;
    }

    const left = getSecondsLeft(Number(data.expiresAt));
    if (left <= 0) {
      sessionStorage.removeItem("missionAccessSession");
      setPhase("expired");
      return;
    }

    setSession(data);
    setSecondsLeft(left);
    setPhase("ready");
  }, [nivelParam, missionParam, router]);

  useEffect(() => {
    if (phase !== "ready" || !session) return;

    const t = setInterval(() => {
      const left = getSecondsLeft(session.expiresAt);
      setSecondsLeft(left);

      if (left <= 0) {
        clearInterval(t);
        sessionStorage.removeItem("missionAccessSession");
        setPhase("expired");
      }
    }, 1000);

    return () => clearInterval(t);
  }, [phase, session]);

  const timer = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [secondsLeft]);

  if (phase === "loading") return <LoadingScreen />;

  if (phase === "expired") {
    return (
      <FullScreen>
        <p style={kickerStyle("#ff4444")}>
          TIEMPO AGOTADO · ZEIT ABGELAUFEN
        </p>
        <p style={{ color: "#4dff91", fontSize: "22px", margin: "0 0 1rem" }}>
          La misión ya terminó
        </p>
        <button onClick={() => router.replace("/missions")} style={btnStyle}>
          ← VOLVER
        </button>
      </FullScreen>
    );
  }

  if (!session) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e0e0e0",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#000",
          borderBottom: "1px solid #1a3a1a",
          padding: "0.75rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <span style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px" }}>
          {session.curso.toUpperCase()} — MISIÓN {session.missionId}
        </span>
        <span
          style={{
            color: secondsLeft <= 300 ? "#ff4444" : "#4dff91",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          {timer}
        </span>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <p style={kickerStyle("#1da854")}>SELECCIÓN DE VARIANTE</p>
        <h1 style={{ color: "#4dff91", fontSize: "28px", margin: "0 0 0.75rem" }}>
          {session.missionTitle}
        </h1>
        <p style={{ color: "#777", fontSize: "13px", margin: "0 0 2rem", lineHeight: 1.6 }}>
          Elige una variante. Puedes cambiar de variante antes de enviar; la entrega
          se fija únicamente al hacer submit.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {session.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() =>
                router.push(
                  `/missions/${session.curso}/${session.missionId}/${variant.id}`
                )
              }
              style={{
                background: "#071007",
                border: "1px solid #143314",
                borderRadius: "14px",
                padding: "1rem",
                textAlign: "left",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <p
                style={{
                  color: "#1da854",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  margin: "0 0 0.75rem",
                }}
              >
                {variant.id.toUpperCase()}
              </p>

              <h2
                style={{
                  color: "#4dff91",
                  fontSize: "18px",
                  margin: "0 0 0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {variant.title}
              </h2>

              <p
                style={{
                  color: "#999",
                  fontSize: "12px",
                  margin: "0 0 1rem",
                  lineHeight: 1.6,
                }}
              >
                {variant.shortDescription}
              </p>

              <p style={{ color: "#ddd", fontSize: "12px", margin: "0 0 0.35rem" }}>
                Schwierigkeitsgrad:{" "}
                <span style={{ color: "#ffd966" }}>{stars(variant.difficulty)}</span>
              </p>
            </button>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button onClick={() => router.replace("/missions")} style={btnStyle}>
            ← CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}

function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {children}
    </div>
  );
}

function kickerStyle(color: string): React.CSSProperties {
  return {
    color,
    fontSize: "10px",
    letterSpacing: "4px",
    margin: "0 0 1rem",
  };
}

const btnStyle: React.CSSProperties = {
  background: "#4dff91",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  padding: "0.875rem 1.25rem",
  fontFamily: "monospace",
  fontWeight: "bold",
  fontSize: "13px",
  letterSpacing: "2px",
  cursor: "pointer",
};