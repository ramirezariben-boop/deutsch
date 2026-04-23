"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MissionRenderer from "@/components/missions/MissionRenderer";
import LoadingScreen from "@/components/missions/LoadingScreen";
import type { MissionAccessSession, MissionVariant } from "@/lib/missions/types";

type Phase = "loading" | "active" | "submitting" | "done" | "expired";

function getSecondsLeft(expiresAt: number) {
  return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
}

export default function MissionVariantRunnerPage() {
  const router = useRouter();
  const params = useParams<{ nivel: string; mission: string; variant: string }>();

  const [session, setSession] = useState<MissionAccessSession | null>(null);
  const [variant, setVariant] = useState<MissionVariant | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    correctas: number;
    total: number;
    score: number;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nivelParam = String(params.nivel ?? "");
  const missionParam = String(params.mission ?? "").toUpperCase();
  const variantParam = String(params.variant ?? "").toLowerCase();

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

    const chosen = data.variants.find((v) => v.id === variantParam);
    if (!chosen) {
      router.replace(`/missions/${nivelParam}/${missionParam}`);
      return;
    }

    const left = getSecondsLeft(Number(data.expiresAt));
    if (left <= 0) {
      sessionStorage.removeItem("missionAccessSession");
      setPhase("expired");
      return;
    }

    setSession(data);
    setVariant(chosen);
    setSecondsLeft(left);
    setPhase("active");
  }, [nivelParam, missionParam, variantParam, router]);

  useEffect(() => {
    if (phase !== "active" || !session) return;

    timerRef.current = setInterval(() => {
      const left = getSecondsLeft(session.expiresAt);
      setSecondsLeft(left);

      if (left <= 0) {
        clearInterval(timerRef.current!);
        sessionStorage.removeItem("missionAccessSession");
        setPhase("expired");
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, session]);

  async function handleSubmit() {
    if (!session || !variant) return;

    setPhase("submitting");
    setError("");

    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const res = await fetch("/api/missions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumnoId: session.alumnoId,
          rowIndex: session.rowIndex,
          respuestas: answers,
          missionId: session.missionId,
          variantId: variant.id,
          curso: session.curso,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (
          data?.error === "Tiempo agotado" ||
          data?.error === "La misión ya no está activa"
        ) {
          sessionStorage.removeItem("missionAccessSession");
          setPhase("expired");
          return;
        }

        setError(data?.error ?? "No se pudo enviar la misión");
        setPhase("active");
        return;
      }

      sessionStorage.removeItem("missionAccessSession");
      setResult(data);
      setPhase("done");
    } catch {
      setError("Error de conexión");
      setPhase("active");
    }
  }

  const timer = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [secondsLeft]);

  if (phase === "loading" || phase === "submitting") return <LoadingScreen />;

  if (phase === "expired") {
    return (
      <FullScreen>
        <p style={{ color: "#ff4444", fontSize: "10px", letterSpacing: "4px", marginBottom: "1rem" }}>
          TIEMPO AGOTADO · ZEIT ABGELAUFEN
        </p>
        <p style={{ color: "#4dff91", fontSize: "20px", margin: "0 0 1rem" }}>
          La misión ha terminado
        </p>
        <button onClick={() => router.replace("/missions")} style={btnStyle}>
          ← VOLVER
        </button>
      </FullScreen>
    );
  }

  if (phase === "done" && result) {
    const pct = Math.round(result.score * 100);

    return (
      <FullScreen>
        <p style={{ color: "#1da854", fontSize: "10px", letterSpacing: "4px", marginBottom: "1rem" }}>
          MISIÓN COMPLETADA · MISSION ABGESCHLOSSEN
        </p>
        <p style={{ color: "#4dff91", fontSize: "48px", fontWeight: "bold", margin: "0 0 0.5rem" }}>
          {pct}%
        </p>
        <p style={{ color: "#888", fontSize: "13px", margin: "0 0 2rem" }}>
          {result.correctas} / {result.total} correctas
        </p>
        <button onClick={() => router.replace("/schueler")} style={btnStyle}>
          ← VOLVER AL PANEL
        </button>
      </FullScreen>
    );
  }

  if (!session || !variant) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "monospace" }}>
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
          zIndex: 100,
        }}
      >
        <span style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px" }}>
          {session.curso.toUpperCase()} — MISIÓN {session.missionId} — {variant.title}
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

      {secondsLeft <= 300 && (
        <div
          style={{
            background: "#1a0000",
            borderBottom: "1px solid #ff4444",
            padding: "0.5rem 1.5rem",
            textAlign: "center",
            fontSize: "11px",
            color: "#ff4444",
            letterSpacing: "2px",
          }}
        >
          MENOS DE 5 MINUTOS · WENIGER ALS 5 MINUTEN
        </div>
      )}

      <div style={{ padding: "1.5rem", maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ color: "#777", fontSize: "12px", margin: "0 0 0.35rem" }}>
              Variante elegida
            </p>
            <p style={{ color: "#4dff91", fontSize: "18px", margin: 0 }}>
              {variant.title}
            </p>
          </div>

          <button
            onClick={() => router.push(`/missions/${session.curso}/${session.missionId}`)}
            style={{
              ...btnStyle,
              background: "#101810",
              color: "#4dff91",
              border: "1px solid #1f4d1f",
            }}
          >
            ← CAMBIAR VARIANTE
          </button>
        </div>

        <p style={{ color: "#888", fontSize: "12px", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
          {variant.shortDescription}
        </p>

        {error && (
          <p style={{ color: "#ff6666", fontSize: "12px", margin: "0 0 1rem" }}>
            {error}
          </p>
        )}

        <MissionRenderer
          mission={{
            title: variant.title,
            blocks: variant.blocks,
          }}
          answers={answers}
          onAnswer={(pregunta, respuesta) =>
            setAnswers((prev) => ({ ...prev, [pregunta]: respuesta }))
          }
        />

        <div style={{ marginTop: "2rem", paddingBottom: "2rem" }}>
          <button
            onClick={handleSubmit}
            style={{ ...btnStyle, width: "100%", fontSize: "14px", padding: "1rem" }}
          >
            ✓ ENVIAR RESPUESTAS · ANTWORTEN ABSCHICKEN
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

const btnStyle: React.CSSProperties = {
  background: "#4dff91",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  padding: "0.875rem 2rem",
  fontFamily: "monospace",
  fontWeight: "bold",
  fontSize: "13px",
  letterSpacing: "2px",
  cursor: "pointer",
};