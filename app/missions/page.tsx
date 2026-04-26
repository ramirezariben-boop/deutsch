"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/missions/LoadingScreen";
import type { MissionAccessSession } from "@/lib/missions/types";

type Phase = "select" | "loading";

type FeedbackQuestion = {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

type MissionFeedbackEntry = {
  missionId: string;
  curso: string;
  variantId: string;
  score: number;
  submittedAt: string;
  questions: FeedbackQuestion[];
};

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
  const [feedback, setFeedback] = useState<MissionFeedbackEntry[]>([]);
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

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

        fetch("/api/missions/feedback")
          .then((r) => r.json())
          .then((entries) => {
            if (Array.isArray(entries)) setFeedback(entries);
          })
          .catch(() => {});
      })
      .catch(() => setError("No se pudo leer la sesión"));
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
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "monospace", padding: "2rem" }}>
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>
        <p style={{ color: "#1da854", fontSize: "10px", letterSpacing: "4px", marginBottom: "0.5rem" }}>
          MISSIONENZENTRUM
        </p>

        <h1 style={{ color: "#4dff91", fontSize: "22px", margin: "0 0 0.5rem", letterSpacing: "2px" }}>
          {session?.name ?? "..."}
        </h1>

        <p style={{ color: "#666", fontSize: "12px", margin: "0 0 2rem", lineHeight: 1.5 }}>
          Ingresa el password de la misión activa para ver sus variantes.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", color: "#888", letterSpacing: "2px" }}>
            PASSWORD
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onKeyDown={(e) => e.key === "Enter" && handleValidar()}
              placeholder="• • • •"
              style={{ ...inputStyle, textAlign: "center", fontSize: "20px", letterSpacing: "8px" }}
            />
          </label>

          {error && (
            <p style={{ color: "#ff4444", fontSize: "12px", margin: 0, textAlign: "center" }}>
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

        {feedback.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <p style={{ color: "#555", fontSize: "10px", letterSpacing: "3px", marginBottom: "1rem" }}>
              RETROALIMENTACIÓN DISPONIBLE
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {feedback.map((entry) => {
                const pct = Math.round(entry.score * 100);
                const key = `${entry.missionId}-${entry.variantId}`;
                const isOpen = expandedMission === key;
                const wrong = entry.questions.filter((q) => !q.isCorrect).length;

                return (
                  <div
                    key={key}
                    style={{
                      border: "1px solid #1a3a1a",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setExpandedMission(isOpen ? null : key)}
                      style={{
                        width: "100%",
                        background: "#060f06",
                        border: "none",
                        padding: "0.75rem 1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        fontFamily: "monospace",
                        color: "#e0e0e0",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#4dff91" }}>
                        Misión {entry.missionId}
                        <span style={{ color: "#555", marginLeft: "6px", fontSize: "11px" }}>
                          variante {entry.variantId.toUpperCase()}
                        </span>
                      </span>
                      <span style={{ fontSize: "12px", color: pct >= 75 ? "#4dff91" : "#ff6666" }}>
                        {pct}% {isOpen ? "▲" : "▼"}
                      </span>
                    </button>

                    {isOpen && (
                      <div style={{ background: "#070d07", padding: "0.75rem 1rem" }}>
                        {wrong === 0 ? (
                          <p style={{ color: "#4dff91", fontSize: "12px", margin: "0 0 0.5rem" }}>
                            Todo correcto.
                          </p>
                        ) : (
                          <p style={{ color: "#888", fontSize: "11px", margin: "0 0 0.75rem" }}>
                            {wrong} {wrong === 1 ? "respuesta incorrecta" : "respuestas incorrectas"}
                          </p>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          {entry.questions.map((q, i) => (
                            <div
                              key={i}
                              style={{
                                borderLeft: `2px solid ${q.isCorrect ? "#1a3a1a" : "#7f1d1d"}`,
                                paddingLeft: "0.75rem",
                              }}
                            >
                              <p style={{ color: "#666", fontSize: "10px", margin: "0 0 0.25rem", letterSpacing: "1px" }}>
                                {q.question}
                              </p>
                              <p style={{ color: q.isCorrect ? "#4dff91" : "#ff6666", fontSize: "12px", margin: "0 0 0.15rem" }}>
                                Tu respuesta: {q.studentAnswer || "—"}
                              </p>
                              {!q.isCorrect && (
                                <p style={{ color: "#22c55e", fontSize: "12px", margin: 0 }}>
                                  Correcta: {q.correctAnswer}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
