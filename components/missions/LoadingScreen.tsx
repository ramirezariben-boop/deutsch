// components/missions/LoadingScreen.tsx
"use client";
import { useEffect, useRef } from "react";

export default function LoadingScreen() {
  const hexRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const hexChars = "0123456789ABCDEF";
    const interval = setInterval(() => {
      tRef.current += 0.1;
      if (timerRef.current) {
        timerRef.current.textContent = tRef.current.toFixed(1) + "s";
      }
      if (hexRef.current && Math.random() < 0.3) {
        hexRef.current.textContent = Array.from({ length: 21 }, () =>
          hexChars[Math.floor(Math.random() * 16)] +
          hexChars[Math.floor(Math.random() * 16)]
        ).join(" ");
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
    }}>
      <style>{`
        @keyframes scan { 0%{transform:translateY(0)}100%{transform:translateY(180px)} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes flicker { 0%,100%{opacity:1}92%{opacity:1}93%{opacity:.3}94%{opacity:1}97%{opacity:.7}98%{opacity:1} }
        @keyframes barIn { from{width:0} to{width:var(--w)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:.4}50%{opacity:1} }
        @keyframes spin { to{stroke-dashoffset:-251} }
        @keyframes cycleA { 0%,45%{opacity:1}50%,95%{opacity:0}100%{opacity:1} }
        @keyframes cycleB { 0%,45%{opacity:0}50%,95%{opacity:1}100%{opacity:0} }
        @media (prefers-reduced-motion: reduce) { *{animation:none!important} }
        .ls-bar-row { display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:9px;letter-spacing:1px;color:#2a8a42;animation:fadeUp .4s ease both; }
        .ls-bar-row:nth-child(1){animation-delay:.1s}
        .ls-bar-row:nth-child(2){animation-delay:.4s}
        .ls-bar-row:nth-child(3){animation-delay:.7s}
        .ls-bar-row:nth-child(4){animation-delay:1.0s}
        .ls-label-wrap { width:120px;flex-shrink:0;position:relative;height:14px; }
        .ls-label-es { position:absolute;left:0;top:0;animation:cycleA 3s ease-in-out infinite;white-space:nowrap;color:#4dff91; }
        .ls-label-de { position:absolute;left:0;top:0;animation:cycleB 3s ease-in-out infinite;white-space:nowrap;color:#1da854; }
        .ls-track { flex:1;height:3px;background:#0a1a0a;border-radius:1px;overflow:hidden; }
        .ls-fill { height:100%;background:#4dff91;border-radius:1px;animation:barIn 1.2s cubic-bezier(.4,0,.2,1) both; }
        .ls-bar-row:nth-child(1) .ls-fill{--w:82%;animation-delay:.2s}
        .ls-bar-row:nth-child(2) .ls-fill{--w:61%;animation-delay:.5s}
        .ls-bar-row:nth-child(3) .ls-fill{--w:94%;animation-delay:.8s}
        .ls-bar-row:nth-child(4) .ls-fill{--w:37%;animation-delay:1.1s}
        .ls-dot { width:4px;height:4px;border-radius:50%;background:#4dff91;animation:pulse 1.4s ease-in-out infinite; }
        .ls-dot:nth-child(2){animation-delay:.2s}
        .ls-dot:nth-child(3){animation-delay:.4s}
        .ls-dot:nth-child(4){animation-delay:.6s}
        .ls-dot:nth-child(5){animation-delay:.8s}
        .ls-cursor { display:inline-block;animation:blink 1s step-end infinite; }
        .ls-wrap { animation:flicker 8s ease-in-out infinite; }
      `}</style>

      <div className="ls-wrap" style={{
        background: "#000",
        border: "1px solid #1a3a1a",
        borderRadius: "4px",
        padding: "28px 32px 24px",
        color: "#4dff91",
        maxWidth: "460px",
        width: "100%",
      }}>
        <div ref={hexRef} style={{ fontSize: "10px", color: "#1a6b2a", letterSpacing: "2px", marginBottom: "16px", overflow: "hidden", whiteSpace: "nowrap" }}>
          4E 45 58 55 53 20 41 55 47 4D 45 4E 54 45 44 20 48 55 4D 41 4E
        </div>

        <div style={{ fontSize: "11px", letterSpacing: "4px", marginBottom: "4px" }}>
          ACCESO A MISIÓN · MISSIONSZUGANG
        </div>
        <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#1a6b2a", marginBottom: "20px" }}>
          PROTOCOLO DE AUTENTICACIÓN · AUTHENTIFIZIERUNGSPROTOKOLL
        </div>

        {/* Anillo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", position: "relative" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0a1a0a" strokeWidth="2"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#4dff91" strokeWidth="1.5"
              strokeDasharray="251" strokeLinecap="round"
              style={{ transformOrigin: "50px 50px", animation: "spin 2s linear infinite" }}/>
            <circle cx="50" cy="50" r="32" fill="none" stroke="#1a3a1a" strokeWidth="1"/>
            <circle cx="50" cy="50" r="32" fill="none" stroke="#4dff91" strokeWidth="1"
              strokeDasharray="40 160" strokeLinecap="round"
              style={{ transformOrigin: "50px 50px", animation: "spin 3s linear infinite reverse" }}/>
            <text x="50" y="44" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="8" fill="#4dff91" letterSpacing="1">NEXUS</text>
            <text x="50" y="54" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill="#4dff91" letterSpacing="1">ONLINE</text>
            <text x="50" y="63" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill="#1da854" letterSpacing="0.5">VERBUNDEN</text>
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,rgba(77,255,145,0.4),transparent)", animation: "scan 2s linear infinite" }}/>
        </div>

        {/* Barras */}
        <div style={{ marginBottom: "18px" }}>
          {[
            ["CIFRADO", "VERSCHLÜSSELUNG"],
            ["IDENTIDAD", "IDENTITÄT"],
            ["PROTOCOLO", "PROTOKOLL"],
            ["AUGMENTACIÓN", "AUGMENTIERUNG"],
          ].map(([es, de], i) => (
            <div key={i} className="ls-bar-row">
              <div className="ls-label-wrap">
                <span className="ls-label-es">{es}</span>
                <span className="ls-label-de">{de}</span>
              </div>
              <div className="ls-track"><div className="ls-fill" style={{ width: 0 }}/></div>
              <span style={{ width: "28px", textAlign: "right", flexShrink: 0 }}>
                {["82%","61%","94%","37%"][i]}
              </span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#1a6b2a", borderTop: "1px solid #1a3a1a", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
          <span>VERIFICANDO · ÜBERPRÜFUNG<span className="ls-cursor">_</span></span>
          <span ref={timerRef}>0.0s</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px" }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} className="ls-dot" style={{ animationDelay: `${i * 0.2}s` }}/>
          ))}
        </div>
      </div>
    </div>
  );
}