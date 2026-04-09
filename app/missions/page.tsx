// app/missions/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MISSION_MAP } from "@/config/missionMap";
import LoadingScreen from "@/components/missions/LoadingScreen";

type Phase = "select" | "loading" | "error";

export default function MissionsPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ id: string; name: string; curso: string } | null>(null);
  const [missionId, setMissionId] = useState("1a");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<Phase>("select");
  const [error, setError] = useState("");
  const [ahora, setAhora] = useState(Date.now());

  // Ticker para la animación
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 100);
    return () => clearInterval(t);
  }, []);

  // Leer sesión
  useEffect(() => {
    fetch("/api/session")
      .then(r => r.json())
      .then(async data => {
        if (!data.loggedIn) { router.replace("/login"); return; }

        let nivelActual = data.user.nivelActual;

        // Si el token viejo no tiene nivelActual, lo buscamos en CT
        if (!nivelActual) {
          const res = await fetch("/api/user/nivel");
          if (res.ok) {
            const d = await res.json();
            nivelActual = d.nivelActual;
          }
        }

        setSession({
          id: data.user.id,
          name: data.user.name,
          curso: nivelActual,
        });
      });
  }, []);

  async function handleValidar() {
    if (!session) return;
    if (password.length !== 4) { setError("El password es de 4 dígitos"); return; }

    setPhase("loading");
    setError("");

    try {
      const res = await fetch("/api/missions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          alumnoId: session.id,
        }),
      });
      const data = await res.json();

      if (!data.ok) {
        setError(data.error ?? "Password incorrecto");
        setPhase("select");
        return;
      }

      // Guardar datos de la misión en sessionStorage para la página de misión
      sessionStorage.setItem("missionSession", JSON.stringify({
        missionId: data.missionId,
        curso: data.curso,
        preguntas: data.preguntas,
        remainingSec: data.remainingSec,
        rowIndex: data.rowIndex,
        alumnoId: session.id,
      }));

      router.push(`/missions/${data.curso}/${data.missionId}`);

    } catch {
      setError("Error de conexión");
      setPhase("select");
    }
  }

  const misiones = session ? Object.keys(MISSION_MAP[session.curso] ?? {}) : [];

  if (phase === "loading") return <LoadingScreen />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e0e0e0",
      fontFamily: "monospace",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        <p style={{ color: "#1da854", fontSize: "10px", letterSpacing: "4px", marginBottom: "0.5rem" }}>
          SISTEMA DE MISIONES
        </p>
        <h1 style={{ color: "#4dff91", fontSize: "22px", margin: "0 0 2rem", letterSpacing: "2px" }}>
          {session?.name ?? "..."}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Dropdown de misión */}
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", color: "#888", letterSpacing: "2px" }}>
            MISIÓN
            <select
              value={missionId}
              onChange={e => setMissionId(e.target.value)}
              style={inputStyle}
            >
              {misiones.map(m => (
                <option key={m} value={m}>{m.toUpperCase()}</option>
              ))}
            </select>
          </label>

          {/* Password */}
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", color: "#888", letterSpacing: "2px" }}>
            PASSWORD
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={password}
              onChange={e => setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onKeyDown={e => e.key === "Enter" && handleValidar()}
              placeholder="• • • •"
              style={{
                ...inputStyle,
                textAlign: "center",
                fontSize: "24px",
                letterSpacing: "12px",
              }}
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
            ▶ ACCEDER
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
};