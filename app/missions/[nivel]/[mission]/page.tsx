"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import MissionRenderer from "@/components/missions/MissionRenderer";
import LoadingScreen from "@/components/missions/LoadingScreen";

type MissionSession = {
  missionId: string;
  curso: string;
  blocks: any[];
  remainingSec: number;
  rowIndex: number;
  alumnoId: string;
};

type Phase = "loading" | "active" | "submitting" | "done" | "expired";

export default function MissionPage() {
  const router = useRouter();
  const params = useParams();
  const [session, setSession] = useState<MissionSession | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ correctas: number; total: number; score: number } | null>(null);
  const [alertShown, setAlertShown] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("missionSession");
    if (!raw) { router.replace("/missions"); return; }
    const data: MissionSession = JSON.parse(raw);
    if (data.missionId !== params.mission || data.curso !== params.nivel) {
      router.replace("/missions"); return;
    }
    setSession(data);
    setSecondsLeft(data.remainingSec);
    setPhase("active");
  }, []);

  useEffect(() => {
    if (phase !== "active") return;
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === 300 && !alertShown) setAlertShown(true);
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setPhase("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  useEffect(() => {
    if (phase !== "expired") return;
    sessionStorage.removeItem("missionSession");
    const t = setTimeout(() => router.replace("/missions"), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  async function handleSubmit() {
    if (!session) return;
    setPhase("submitting");
    clearInterval(timerRef.current!);
    try {
      const res = await fetch("/api/missions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumnoId: session.alumnoId,
          rowIndex: session.rowIndex,
          respuestas: answers,
          missionId: session.missionId,
          curso: session.curso,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        sessionStorage.removeItem("missionSession");
        setResult(data);
        setPhase("done");
      } else {
        setPhase("expired");
      }
    } catch {
      setPhase("active");
    }
  }

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
        <p style={{ color: "#555", fontSize: "13px" }}>Redirigiendo en 4 segundos...</p>
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

  if (!session) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timerColor = secondsLeft <= 300 ? "#ff4444" : "#4dff91";
  const isLowTime = secondsLeft <= 300;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "monospace" }}>
      <div style={{
        position: "sticky", top: 0, background: "#000",
        borderBottom: "1px solid #1a3a1a", padding: "0.75rem 1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100,
      }}>
        <span style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px" }}>
          {session.curso.toUpperCase()} — MISIÓN {session.missionId.toUpperCase()}
        </span>
        <span style={{ color: timerColor, fontSize: "20px", fontWeight: "bold", letterSpacing: "2px", transition: "color 0.5s" }}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
      </div>

      {isLowTime && (
        <div style={{
          background: "#1a0000", borderBottom: "1px solid #ff4444",
          padding: "0.5rem 1.5rem", textAlign: "center",
          fontSize: "11px", color: "#ff4444", letterSpacing: "2px",
        }}>
          ⚠ MENOS DE 5 MINUTOS · WENIGER ALS 5 MINUTEN
        </div>
      )}

      <div style={{ padding: "1.5rem", maxWidth: "760px", margin: "0 auto" }}>
        <MissionRenderer
          mission={{
            title: `Misión ${session.missionId.toUpperCase()}`,
            blocks: session.blocks,
          }}
          answers={answers}
          onAnswer={(pregunta, respuesta) =>
            setAnswers(prev => ({ ...prev, [pregunta]: respuesta }))
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
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", fontFamily: "monospace",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center", padding: "2rem",
    }}>
      {children}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "#4dff91", color: "#000", border: "none",
  borderRadius: "6px", padding: "0.875rem 2rem",
  fontFamily: "monospace", fontWeight: "bold",
  fontSize: "13px", letterSpacing: "2px", cursor: "pointer",
};