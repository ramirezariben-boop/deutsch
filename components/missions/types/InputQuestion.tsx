"use client";

type Props = {
  preguntas: string[];
  answers: Record<string, string>;
  onAnswer: (pregunta: string, respuesta: string) => void;
};

export default function InputQuestion({ preguntas, answers, onAnswer }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {preguntas.map((p) => (
        <div key={p} style={{ borderLeft: "2px solid #1a3a1a", paddingLeft: "1rem" }}>
          <p style={{ color: "#888", fontSize: "13px", margin: "0 0 0.5rem", lineHeight: 1.5 }}>{p}</p>
          <input
            value={answers[p] ?? ""}
            onChange={e => onAnswer(p, e.target.value)}
            style={{
              background: "#060f06",
              color: "#4dff91",
              border: "1px solid #1a3a1a",
              borderRadius: "4px",
              padding: "0.5rem 0.75rem",
              fontFamily: "monospace",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}