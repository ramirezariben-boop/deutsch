"use client";

import { useState, useEffect, type CSSProperties } from "react";
import { MISSION_MAP } from "@/config/missionMap";
import type { AdminStudentLevelRow } from "@/lib/levels/types";

// Movido al inicio para evitar problemas de hoisting con 'const'
const selectStyle: CSSProperties = {
  background: "#0a0a0a",
  color: "#4dff91",
  border: "1px solid #1a3a1a",
  borderRadius: "4px",
  padding: "0.5rem",
  fontFamily: "monospace",
  fontSize: "13px",
};

type MissionState = {
  missionId: string;
  curso: string;
  startedAt: string;
  durationMin: number;
} | null;

export default function AdminPage() {
  const [curso, setCurso] = useState("basico_2");
  const [missionId, setMissionId] = useState("1a");
  const [durationMin, setDurationMin] = useState(30);
  const [active, setActive] = useState<MissionState>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [ahora, setAhora] = useState(Date.now());
  const [grupalPassword, setGrupalPassword] = useState<string | null>(null);

  const [levelsCourseId, setLevelsCourseId] = useState("2026_1");
  const [levelsDay, setLevelsDay] = useState<"SAM" | "SON" | "PRIV">("SAM");
  const [levelsPrivCode, setLevelsPrivCode] = useState("");
  const [levelsLoading, setLevelsLoading] = useState(false);
  const [levelsStatus, setLevelsStatus] = useState("");
  const [levelsRows, setLevelsRows] = useState<AdminStudentLevelRow[]>([]);

  const cursos = Object.keys(MISSION_MAP);
  const misiones = Object.keys(MISSION_MAP[curso] ?? {});

  const [currentCourseId, setCurrentCourseId] = useState("2026_2");
  const [consolidateCourseId, setConsolidateCourseId] = useState("2026_1");
  const [adminStatus, setAdminStatus] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    fetchActive();
    const interval = setInterval(fetchActive, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  async function fetchActive() {
    try {
      const res = await fetch("/api/missions/active");
      if (res.ok) {
        const data = await res.json();
        setActive(data.active);
      }
    } catch (err) {
      console.error("Error fetching active mission:", err);
    }
  }

  async function handleStart() {
    setLoading(true);
    setStatus("");
    setGrupalPassword(null);
    try {
      const res = await fetch("/api/missions/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionId, curso, durationMin }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus(`✅ Misión ${missionId} abierta — ${durationMin} min`);
        setGrupalPassword(data.password);
        fetchActive();
      } else {
        setStatus(`❌ ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  function tiempoRestante() {
    if (!active) return null;
    const elapsed = (ahora - new Date(active.startedAt).getTime()) / 1000 / 60;
    const remaining = active.durationMin - elapsed;
    if (remaining <= 0) return "⏰ Tiempo agotado";
    const m = Math.floor(remaining);
    const s = Math.floor((remaining - m) * 60);
    return `${m}:${String(s).padStart(2, "0")} restantes`;
  }

  async function handleSetCurrentCourse() {
    setAdminLoading(true);
    setAdminStatus("");
    try {
      const res = await fetch("/api/admin/current-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: currentCourseId }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setAdminStatus(`✅ Curso actual guardado: ${data.currentCourseId}`);
      } else {
        setAdminStatus(`❌ ${data.error || "No se pudo guardar el curso actual"}`);
      }
    } catch (err) {
      setAdminStatus("❌ Error al guardar el curso actual");
    } finally {
      setAdminLoading(false);
    }
  }

  async function handleConsolidateAttendance() {
    setAdminLoading(true);
    setAdminStatus("");
    try {
      const res = await fetch("/api/admin/attendance/consolidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: consolidateCourseId }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setAdminStatus(
          `✅ Consolidado ${data.courseId}: ${data.consolidated} alumnos, ${data.deleted} filas eliminadas`
        );
      } else {
        setAdminStatus(`❌ ${data.error || "No se pudo consolidar"}`);
      }
    } catch (err) {
      setAdminStatus("❌ Error al consolidar asistencia");
    } finally {
      setAdminLoading(false);
    }
  }

  async function handleRecomputeLevels() {
    setLevelsLoading(true);
    setLevelsStatus("");
    try {
      const res = await fetch("/api/admin/levels/recompute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: levelsCourseId,
          day: levelsDay,
          privCode: levelsDay === "PRIV" ? levelsPrivCode || null : null,
          persistToCt: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLevelsRows(Array.isArray(data.rows) ? data.rows : []);
        setLevelsStatus(`✅ Niveles recalculados: ${data.updated ?? 0} alumnos`);
      } else {
        setLevelsStatus(`❌ ${data.error || "No se pudieron recalcular los niveles"}`);
      }
    } catch {
      setLevelsStatus("❌ Error al recalcular niveles");
    } finally {
      setLevelsLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#e0e0e0",
      fontFamily: "monospace",
      padding: "2rem",
    }}>
      <h1 style={{ color: "#4dff91", letterSpacing: "4px", fontSize: "14px", marginBottom: "2rem" }}>
        PANEL DE CONTROL — MISIONES
      </h1>

      {/* Misión activa */}
      <div style={{
        border: "1px solid #1a3a1a", borderRadius: "8px",
        padding: "1.5rem", marginBottom: "2rem", background: "#060f06",
      }}>
        <p style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px", marginBottom: "0.5rem" }}>
          MISIÓN ACTIVA
        </p>
        {active ? (
          <>
            <p style={{ fontSize: "20px", color: "#4dff91", margin: "0 0 0.25rem" }}>
              {active.curso.toUpperCase()} — {active.missionId.toUpperCase()}
            </p>
            <p style={{ color: "#888", fontSize: "12px", margin: "0 0 0.5rem" }}>
              Abierta: {new Date(active.startedAt).toLocaleTimeString("es-MX")}
            </p>
            <p style={{ color: "#4dff91", fontSize: "14px", margin: 0 }}>
              {tiempoRestante()}
            </p>
          </>
        ) : (
          <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>Ninguna misión activa</p>
        )}
      </div>

      {/* Abrir misión */}
      <div style={{
        border: "1px solid #1a3a1a", borderRadius: "8px",
        padding: "1.5rem", background: "#060f06",
      }}>
        <p style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px", marginBottom: "1rem" }}>
          ABRIR NUEVA MISIÓN
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            CURSO
            <select
              value={curso}
              onChange={e => { setCurso(e.target.value); setMissionId("1a"); }}
              style={selectStyle}
            >
              {cursos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            MISIÓN
            <select
              value={missionId}
              onChange={e => setMissionId(e.target.value)}
              style={selectStyle}
            >
              {misiones.map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            MINUTOS
            <input
              type="number"
              value={durationMin}
              onChange={e => setDurationMin(Number(e.target.value))}
              min={5}
              max={90}
              style={{ ...selectStyle, width: "80px" }}
            />
          </label>
        </div>

        <button
          onClick={handleStart}
          disabled={loading}
          style={{
            background: loading ? "#1a3a1a" : "#4dff91",
            color: "#000", border: "none", borderRadius: "6px",
            padding: "0.75rem 2rem", fontFamily: "monospace",
            fontWeight: "bold", fontSize: "13px", letterSpacing: "2px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "ABRIENDO..." : "▶ INICIAR MISIÓN"}
        </button>

        {grupalPassword && (
          <div style={{
            marginTop: "1.5rem",
            border: "1px solid #4dff91",
            borderRadius: "8px",
            padding: "1rem 1.5rem",
            textAlign: "center",
            background: "#020f02",
          }}>
            <p style={{ color: "#1da854", fontSize: "10px", letterSpacing: "3px", margin: "0 0 0.5rem" }}>
              PASSWORD DE GRUPO · GRUPPENPASSWORT
            </p>
            <p style={{ color: "#4dff91", fontSize: "48px", fontWeight: "bold", letterSpacing: "12px", margin: 0 }}>
              {grupalPassword}
            </p>
          </div>
        )}

        {status && (
          <p style={{
            marginTop: "1rem", fontSize: "13px",
            color: status.startsWith("✅") ? "#4dff91" : "#ff4444",
          }}>
            {status}
          </p>
        )}
      </div>

      {/* Admin Asistencia */}
      <div style={{
        border: "1px solid #1a3a1a", borderRadius: "8px",
        padding: "1.5rem", background: "#060f06", marginTop: "2rem",
      }}>
        <p style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px", marginBottom: "1rem" }}>
          ADMIN · ASISTENCIA
        </p>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "end", marginBottom: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            CURSO ACTUAL GLOBAL
            <input
              value={currentCourseId}
              onChange={(e) => setCurrentCourseId(e.target.value)}
              style={selectStyle}
            />
          </label>
          <button
            onClick={handleSetCurrentCourse}
            disabled={adminLoading}
            style={{
              background: adminLoading ? "#1a3a1a" : "#4dff91",
              color: "#000", border: "none", borderRadius: "6px",
              padding: "0.75rem 1.5rem", fontFamily: "monospace",
              fontWeight: "bold", fontSize: "12px", letterSpacing: "2px",
              cursor: adminLoading ? "not-allowed" : "pointer",
            }}
          >
            GUARDAR CURSO ACTUAL
          </button>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "end" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            CONSOLIDAR CURSO
            <input
              value={consolidateCourseId}
              onChange={(e) => setConsolidateCourseId(e.target.value)}
              style={selectStyle}
            />
          </label>
          <button
            onClick={handleConsolidateAttendance}
            disabled={adminLoading}
            style={{
              background: adminLoading ? "#2a1a1a" : "#f59e0b",
              color: "#000", border: "none", borderRadius: "6px",
              padding: "0.75rem 1.5rem", fontFamily: "monospace",
              fontWeight: "bold", fontSize: "12px", letterSpacing: "2px",
              cursor: adminLoading ? "not-allowed" : "pointer",
            }}
          >
            CONSOLIDAR Y PURGAR
          </button>
        </div>

        {adminStatus && (
          <p style={{
            marginTop: "1rem", fontSize: "13px",
            color: adminStatus.startsWith("✅") ? "#4dff91" : "#ff4444",
          }}>
            {adminStatus}
          </p>
        )}
      </div>

      {/* Admin Niveles */}
      <div style={{
        border: "1px solid #1a3a1a", borderRadius: "8px",
        padding: "1.5rem", background: "#060f06", marginTop: "2rem",
      }}>
        <p style={{ color: "#1da854", fontSize: "11px", letterSpacing: "2px", marginBottom: "1rem" }}>
          ADMIN · NIVELES
        </p>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "end", marginBottom: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            CURSO
            <input
              value={levelsCourseId}
              onChange={(e) => setLevelsCourseId(e.target.value)}
              style={selectStyle}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
            GRUPO
            <select
              value={levelsDay}
              onChange={(e) => setLevelsDay(e.target.value as "SAM" | "SON" | "PRIV")}
              style={selectStyle}
            >
              <option value="SAM">SAM</option>
              <option value="SON">SON</option>
              <option value="PRIV">PRIV</option>
            </select>
          </label>

          {levelsDay === "PRIV" && (
            <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#888" }}>
              PRIV CODE
              <input
                value={levelsPrivCode}
                onChange={(e) => setLevelsPrivCode(e.target.value)}
                style={selectStyle}
              />
            </label>
          )}

          <button
            onClick={handleRecomputeLevels}
            disabled={levelsLoading}
            style={{
              background: levelsLoading ? "#1a3a1a" : "#4dff91",
              color: "#000", border: "none", borderRadius: "6px",
              padding: "0.75rem 1.5rem", fontFamily: "monospace",
              fontWeight: "bold", fontSize: "12px", letterSpacing: "2px",
              cursor: levelsLoading ? "not-allowed" : "pointer",
            }}
          >
            {levelsLoading ? "RECALCULANDO..." : "RECALCULAR NIVELES"}
          </button>
        </div>

        {levelsStatus && (
          <p style={{
            marginTop: "1rem", fontSize: "13px",
            color: levelsStatus.startsWith("✅") ? "#4dff91" : "#ff4444",
          }}>
            {levelsStatus}
          </p>
        )}

        {!!levelsRows.length && (
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #1a3a1a", paddingTop: "1rem" }}>
            <p style={{ color: "#1da854", fontSize: "10px", letterSpacing: "3px", margin: "0 0 0.75rem" }}>
              RESULTADOS
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "90px 1fr 80px 160px",
              gap: "10px", fontSize: "12px", color: "#aaa", marginBottom: "0.5rem",
            }}>
              <div>ID</div>
              <div>NOMBRE</div>
              <div>NIVEL</div>
              <div>ACTUALIZADO</div>
            </div>

            {levelsRows.map((row) => (
              <div
                key={row.id}
                style={{
                  display: "grid", gridTemplateColumns: "90px 1fr 80px 160px",
                  gap: "10px", padding: "0.45rem 0", borderTop: "1px solid #101810",
                  fontSize: "12px", color: row.error ? "#ff7a7a" : "#e0e0e0",
                }}
              >
                <div>{row.id}</div>
                <div>{row.name ?? "—"}</div>
                <div>{row.level?.currentLevel ?? "—"}</div>
                <div>
                  {row.error
                    ? row.error
                    : row.levelUpdatedAt
                      ? new Date(row.levelUpdatedAt).toLocaleString("es-MX")
                      : "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}