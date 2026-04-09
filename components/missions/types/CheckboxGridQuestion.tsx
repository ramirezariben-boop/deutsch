// components/missions/types/CheckboxGridQuestion.tsx
"use client";

type Props = {
  data: {
    prompt: string;
    rows: string[];
    columns: string[];
  };
  answers: Record<string, string>;
  onAnswer: (pregunta: string, respuesta: string) => void;
};

export default function CheckboxGridQuestion({ data, answers, onAnswer }: Props) {
  function getSelected(key: string): string[] {
    return answers[key] ? answers[key].split(",").map(s => s.trim()) : [];
  }

  function toggle(key: string, col: string) {
    const current = getSelected(key);
    const next = current.includes(col)
      ? current.filter(c => c !== col)
      : [...current, col];
    onAnswer(key, next.join(", "));
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "1rem", lineHeight: 1.5 }}>
        {data.prompt}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "monospace", fontSize: "12px" }}>
          <thead>
            <tr>
              <th style={thStyle}></th>
              {data.columns.map(col => (
                <th key={col} style={thStyle}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map(row => {
              const key = `${data.prompt} [${row}]`;
              const selected = getSelected(key);
              return (
                <tr key={row}>
                  <td style={tdStyle}>{row}</td>
                  {data.columns.map(col => (
                    <td key={col} style={{ ...tdStyle, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(col)}
                        onChange={() => toggle(key, col)}
                        style={{ accentColor: "#4dff91", cursor: "pointer" }}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  color: "#4dff91",
  padding: "6px 10px",
  borderBottom: "1px solid #1a3a1a",
  textAlign: "left",
  fontWeight: "500",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  color: "#e0e0e0",
  padding: "6px 10px",
  borderBottom: "1px solid #0a1a0a",
};