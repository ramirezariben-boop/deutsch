"use client";

import React from "react";

export default function ExamTextViewer({
  text,
  logs,
}: {
  text: string;
  logs?: any[];
}) {
  if (!text) return null;

  const stats = computeStats(text, logs);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-20">
      <h2 className="text-neutral-200 text-lg mb-4">Texto final del examen</h2>

      {/* MÉTRICAS SUPERIORES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Metric title="Palabras" value={stats.wordCount} />
        <Metric title="WPM" value={stats.wpm} />
        <Metric title="Diversidad léxica" value={`${stats.lexicalDiversity}%`} />
        <Metric title="Párrafos" value={stats.paragraphs} />
      </div>

      {/* CONTENEDOR DEL TEXTO */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 leading-relaxed text-neutral-200 text-sm whitespace-pre-wrap">
        {text}
      </div>

      {/* MÉTRICAS INFERIORES */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <Metric title="Longitud prom. palabra" value={stats.avgWordLength} />
        <Metric title="Oraciones / párrafo" value={stats.sentencesPerParagraph} />
        <Metric title="Señales sospechosas" value={stats.suspiciousSignals} />
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
      <div className="text-neutral-400 text-xs">{title}</div>
      <div className="text-neutral-100 text-lg font-semibold mt-1">{value}</div>
    </div>
  );
}


// ======================
// ANALIZADOR DE TEXTO
// ======================
function computeStats(text: string, logs?: any[]) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Diversidad léxica (type/token ratio)
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
  const lexicalDiversity = Math.round((uniqueWords.size / wordCount) * 100);

  // Párrafos
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

  // Promedio longitud palabra
  const avgWordLength = (
    words.reduce((a, w) => a + w.length, 0) / wordCount
  ).toFixed(1);

  // Oraciones por párrafo
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const sentencesPerParagraph = paragraphs
    ? (sentences / paragraphs).toFixed(1)
    : "–";

  // ===== Cálculo de WPM usando createdAt =====
  let wpm = "–";

if (logs && logs.length > 1) {
  const start = new Date(logs[0].createdAt).getTime();
  const end = new Date(logs.at(-1).createdAt).getTime();
  const durationMinutes = (end - start) / 60000;

  if (durationMinutes > 0) {
    wpm = String(Math.round(wordCount / durationMinutes)); // ← CONVERTIR A STRING
  }
}


  // Señales sospechosas básicas
  let suspiciousSignals = 0;

  if (lexicalDiversity < 25) suspiciousSignals++;
  if (Number(avgWordLength) > 7.0) suspiciousSignals++; // muy típico en IA
  if (sentencesPerParagraph !== "–" && Number(sentencesPerParagraph) > 6) {
    suspiciousSignals++;
  }

  return {
    wordCount,
    lexicalDiversity,
    paragraphs,
    avgWordLength,
    sentencesPerParagraph,
    wpm,
    suspiciousSignals,
  };
}
