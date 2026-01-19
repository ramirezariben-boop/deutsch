"use client";

import React from "react";

export default function SuspicionMeter({ score }: { score: number }) {
  const radius = 60;
  const stroke = 12;
  const circumference = Math.PI * radius;

  // Normalizar 0–100 → 0–180 grados
  const angle = (score / 100) * 180;

  // Calcular color según nivel
  let color = "#4ade80"; // verde
  if (score >= 70) color = "#f87171"; // rojo
  else if (score >= 35) color = "#facc15"; // amarillo

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col items-center justify-center">
      <h3 className="text-neutral-300 text-sm mb-2">Nivel de sospecha</h3>

      <svg width="160" height="100" viewBox="0 0 160 100">
        {/* Arco de fondo */}
        <path
          d="M20,100 A60,60 0 0 1 140,100"
          fill="none"
          stroke="#333"
          strokeWidth={stroke}
          strokeLinecap="round"
        />

        {/* Arco activo */}
        <path
          d="M20,100 A60,60 0 0 1 140,100"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * score) / 100}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />

        {/* Marcador / aguja */}
        <line
          x1="80"
          y1="100"
          x2={80 + 50 * Math.cos(Math.PI * (1 - score / 100))}
          y2={100 - 50 * Math.sin(Math.PI * (1 - score / 100))}
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div className="text-3xl font-bold mt-2" style={{ color }}>
        {score}%
      </div>

      <p className="text-neutral-400 text-xs mt-1">
        {score < 35 && "Bajo"}
        {score >= 35 && score < 70 && "Moderado"}
        {score >= 70 && "Alto"}
      </p>
    </div>
  );
}
