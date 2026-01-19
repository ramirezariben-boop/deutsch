"use client";

import { useEffect, useRef, useState } from "react";

type Log = {
  id: number;
  event: string;
  data?: string | null;
  alert?: string;
};

export default function Viewer({ studentId }: { studentId: number }) {
  const [text, setText] = useState("");
  const [alerts, setAlerts] = useState<string[]>([]);

  const lastId = useRef(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;

    async function poll() {
      if (!alive.current) return;

      try {
        const res = await fetch(
          `/api/writing-log?studentId=${studentId}&since=${lastId.current}`
        );

        const json = await res.json();
        if (!json.ok) return;

        const logs: Log[] = json.logs ?? [];

        if (logs.length > 0) {
          lastId.current = logs.at(-1)!.id;

          let reconstructed = text;
          const newAlerts: string[] = [];

          for (const log of logs) {
            if (log.event === "snapshot" && typeof log.data === "string") {
              reconstructed = log.data;
            }

            if (log.alert) {
              newAlerts.push(log.alert);
            }
          }

          setText(reconstructed);
          setAlerts((prev) => [...prev, ...newAlerts]);
        }
      } catch (err) {
        console.error("Viewer poll error:", err);
      }

      setTimeout(poll, 2000); // ⏱️ controlas el ritmo
    }

    poll();

    return () => {
      alive.current = false;
    };
  }, [studentId]);

  return (
    <div className="p-10 text-white space-y-6">
      <h1 className="text-3xl font-bold">
        Alumno {studentId} – Vista en vivo
      </h1>

      <div className="border border-white rounded-xl p-4 bg-black min-h-[300px]">
        <pre className="whitespace-pre-wrap text-xl">{text}</pre>
      </div>

      <div>
        <h2 className="text-2xl mt-6 mb-2">Alertas</h2>
        <ul className="space-y-1">
          {alerts.map((a, i) => (
            <li
              key={i}
              className={`p-2 rounded ${
                a === "long_paste"
                  ? "bg-red-600"
                  : a === "fast_typing"
                  ? "bg-yellow-600"
                  : "bg-orange-600"
              }`}
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
