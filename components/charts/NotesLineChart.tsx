"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ===============================
   TOOLTIP
================================ */
const CustomTooltip = ({
  active,
  payload,
  label,
  visible,
  colors,
}: any) => {
  if (!active || !payload || !payload.length)
    return null;

  const p = payload[0].payload;

  const renderLine = (
    key: string,
    value: number | undefined,
    extra?: string
  ) => {
    if (!visible[key]) return null;

    return (
      <p style={{ color: colors[key] }}>
        {key.charAt(0).toUpperCase() +
          key.slice(1)}
        : {value?.toFixed(1)}{" "}
        {extra ? extra : ""}
      </p>
    );
  };

  return (
    <div className="pointer-events-none bg-neutral-800 p-3 rounded border border-neutral-600 text-xs">
      <p className="font-semibold mb-1">
        {label}
      </p>

      {renderLine("sprechen", p.sprechen, `(${p.sprechen_raw || 0}/20)`)}
      {renderLine("schreiben", p.schreiben, `(${p.schreiben_raw || 0}/20)`)}
      {renderLine("lesen", p.lesen)}
      {renderLine("grammatik", p.grammatik)}
      {renderLine("hoeren", p.hoeren, `(${p.hoeren_raw}/20)`)}
      {renderLine("evaluacion", p.evaluacion)}
      {renderLine("tarea", p.tarea)}
      {renderLine("promedio", p.promedio)}
    </div>
  );
};

/* ===============================
   COMPONENTE
================================ */
export default function NotesLineChart({
  studentId,
  course,
}: {
  studentId: number;
  course: string;
}) {
  const [data, setData] = useState<any[]>([]);
  const num = (v: any) => Number(v || 0);

  const [visible, setVisible] = useState({
    sprechen: true,
    schreiben: true,
    hoeren: true,
    lesen: true,
    grammatik: true,
    evaluacion: true,
    tarea: true,
    promedio: true,
  });

  const toggle = (key: keyof typeof visible) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const COLORS: Record<keyof typeof visible, string> = {
    sprechen: "#ff4d4f",
    schreiben: "#ffa940",
    hoeren: "#36cfc9",
    lesen: "#597ef7",
    grammatik: "#9254de",
    evaluacion: "#73d13d",
    tarea: "#f759ab",
    promedio: "#ffffff",
  };

  /* ===============================
     FETCH
  ================================= */
  useEffect(() => {
    fetch(`/api/student-wide-grades?studentId=${studentId}`)
      .then((res) => res.json())
      .then((row) => {
        if (!row || row.error) return;
        course === "ALL"
          ? buildAllCourses(row)
          : buildSingleCourse(row);
      });
  }, [studentId, course]);

  /* ===============================
     BUILD SINGLE
  ================================= */
  function buildSingleCourse(row: any) {
    const base = `${course}_`;

    const rawHoeren = num(row[base + "Hören"]);
    const rawSchreiben = num(row[base + "Schreiben"]);
    const rawSprechen = num(row[base + "Sprechen"]);

    const sprechen = rawSprechen ? (rawSprechen / 20) * 10 : 0;
    const schreiben = rawSchreiben ? (rawSchreiben / 20) * 10 : 0;
    const hoeren = rawHoeren ? (rawHoeren / 20) * 10 : 0;
    const lesen = num(row[base + "Lesen"]);
    const grammatik = num(row[base + "Grammatik"]);
    const evaluacion = num(row[base + "Continua"]);
    const tarea = num(row[base + "Integrador"]);

    const promedio =
      (sprechen +
        schreiben +
        hoeren +
        lesen +
        grammatik +
        evaluacion +
        tarea) / 7;

    const hasData =
      sprechen > 0 ||
      schreiben > 0 ||
      hoeren > 0 ||
      lesen > 0 ||
      grammatik > 0 ||
      evaluacion > 0 ||
      tarea > 0;

    if (!hasData) {
      setData([]);
      return;
    }

    setData([
      {
        exam: course.split("_").slice(-1)[0],
	sprechen,
        sprechen_raw: rawSprechen,
	schreiben,
        schreiben_raw: rawSchreiben,
	hoeren,
        hoeren_raw: rawHoeren,
        lesen,
        grammatik,
        evaluacion,
        tarea,
        promedio,
      },
    ]);
  }

  /* ===============================
     BUILD ALL
  ================================= */
  function buildAllCourses(row: any) {
    const result: any[] = [];

    Object.keys(row).forEach((key) => {
      const match = key.match(
        /^(basico_\d+|intermedio_\d+)_E(1|2)_Sprechen$/
      );
      if (!match) return;

      const courseName = match[1];
      const examNumber = match[2];
      const base = `${courseName}_E${examNumber}_`;

      const rawSprechen = num(row[base + "Sprechen"]);
      const rawSchreiben = num(row[base + "Schreiben"]);
      const rawHoeren = num(row[base + "Hören"]);


      const sprechen = rawSprechen ? (rawSprechen / 20) * 10 : 0;
      const schreiben = rawSchreiben ? (rawSchreiben / 20) * 10 : 0;
      const hoeren = rawHoeren ? (rawHoeren / 20) * 10 : 0;
      const lesen = num(row[base + "Lesen"]);
      const grammatik = num(row[base + "Grammatik"]);
      const evaluacion = num(row[base + "Continua"]);
      const tarea = num(row[base + "Integrador"]);

      const promedio =
        (sprechen +
          schreiben +
          hoeren +
          lesen +
          grammatik +
          evaluacion +
          tarea) / 7;

      const hasData =
        sprechen > 0 ||
        schreiben > 0 ||
        hoeren > 0 ||
        lesen > 0 ||
        grammatik > 0 ||
        evaluacion > 0 ||
        tarea > 0;

      if (!hasData) return;

      result.push({
        label: `${courseName}${examNumber === "1" ? "a" : "b"}`,
        sprechen,
        schreiben,
        hoeren_raw: rawHoeren,
        hoeren,
        lesen,
        grammatik,
        evaluacion,
        tarea,
        promedio,
      });
    });

    result.sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    setData(result);
  }

  /* ===============================
     RENDER
  ================================= */
  return (
    <div className="w-full">

      {/* TOGGLES */}
      <div className="flex flex-wrap gap-3 text-xs mb-4">
        {Object.keys(visible).map((key) => {
          const typedKey = key as keyof typeof visible;
          const color = COLORS[typedKey];

          return (
            <button
              key={key}
              onClick={() => toggle(typedKey)}
              className="px-2 py-1 rounded border transition"
              style={{
                borderColor: color,
                color: visible[typedKey] ? color : "#666",
                opacity: visible[typedKey] ? 1 : 0.4,
                boxShadow: visible[typedKey]
                  ? `0 0 4px ${color}`
                  : "none",
              }}
            >
              {key}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis
            dataKey={
              course === "ALL" ? "label" : "exam"
            }
          />
          <YAxis domain={[0, 10]} />
          <Tooltip
  content={
    <CustomTooltip
      visible={visible}
      colors={COLORS}
    />
  }
/>

          {Object.keys(visible).map((key) => {
            const typedKey =
              key as keyof typeof visible;
            if (!visible[typedKey]) return null;

            const color = COLORS[typedKey];

            return (
              <Line
                key={key}
                type="monotone"
                dataKey={typedKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                onClick={() => toggle(typedKey)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}