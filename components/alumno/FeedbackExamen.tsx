"use client";

import { useEffect, useState } from "react";

type Props = {
  studentId: number;
};

type FeedbackItem = {
  curso: string;
  texto: string;
};

export default function FeedbackExamen({ studentId }: Props) {
  const [data, setData] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/feedback?studentId=${studentId}`
      );
      const json = await res.json();
      setData(json.feedback || []);
      setLoading(false);
    }

    load();
  }, [studentId]);

  if (loading)
    return <p>Cargando feedback...</p>;

  if (data.length === 0)
    return <p>No hay feedback disponible.</p>;

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-neutral-900 p-4 rounded"
        >
          <h2 className="font-semibold mb-2">
            {item.curso}
          </h2>
          <p>{item.texto}</p>
        </div>
      ))}
    </div>
  );
}