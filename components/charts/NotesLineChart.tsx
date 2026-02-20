"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const p = payload[0].payload;

  return (
    <div className="bg-neutral-800 p-3 rounded border border-neutral-600 text-xs">
      <p className="font-semibold mb-1">{label}</p>

      <p>Sprechen: {p.sprechen?.toFixed(1)}</p>
      <p>Schreiben: {p.schreiben?.toFixed(1)}</p>
      <p>Lesen: {p.lesen?.toFixed(1)}</p>
      <p>Grammatik: {p.grammatik?.toFixed(1)}</p>

      <p className="text-cyan-400">
        Hören: {p.hoeren?.toFixed(1)} ({p.hoeren_raw}/20)
      </p>

      <p>Evaluación continua: {p.evaluacion?.toFixed(1)}</p>
      <p>Tarea Integradora: {p.tarea?.toFixed(1)}</p>
    </div>
  );
};

type DataPoint = {
  exam: string;
  sprechen: number;
  schreiben: number;
  hoeren: number;
  lesen: number;
  grammatik: number;
  evaluacion: number;
  tarea: number;
};


export default function NotesLineChart({ studentId, course }: {
  studentId: number;
  course: string;
}) {
  const [data, setData] = useState<DataPoint[]>([]);

  // 🔹 Helper elegante
  const num = (v: any) => Number(v || 0);


useEffect(() => {
  fetch(`/api/student-wide-grades?studentId=${studentId}`)
    .then(res => res.json())
    .then(row => {

      if (!row || row.error) return;

      if (course === "ALL") {
        buildAllCourses(row);
      } else {
        buildSingleCourse(row);
      }
    });
}, [studentId, course]);

function buildSingleCourse(row: any) {
  const exams = ["E1", "E2"];

  const result = exams.map((exam) => {
    const base = `${course}_${exam}_`;

    const rawHoeren = num(row[base + "Hören"]);

    const sprechen = num(row[base + "Sprechen"]);
    const schreiben = num(row[base + "Schreiben"]);
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

    return {
      exam,
      sprechen,
      schreiben,
      hoeren_raw: rawHoeren,
      hoeren,
      lesen,
      grammatik,
      evaluacion,
      tarea,
      promedio,
    };
  });

  setData(result);
}

function buildAllCourses(row: any) {
  const result: any[] = [];

  Object.keys(row).forEach((key) => {
    const match = key.match(/(.*)_E(1|2)_Sprechen/);
    if (!match) return;

    const courseName = match[1];
    const examNumber = match[2];

    const base = `${courseName}_E${examNumber}_`;

    const rawHoeren = num(row[base + "Hören"]);

    const sprechen = num(row[base + "Sprechen"]);
    const schreiben = num(row[base + "Schreiben"]);
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

  result.sort((a, b) => a.label.localeCompare(b.label));

  setData(result);
}


  return (
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

<defs>
  <filter id="glow-white" height="300%" width="300%" x="-75%" y="-75%">
    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
    <feMerge>
      <feMergeNode in="coloredBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>

          <CartesianGrid stroke="#333" />
          <XAxis dataKey={course === "ALL" ? "label" : "exam"} />
          <YAxis domain={[0, 10]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Line type="monotone" dataKey="sprechen" stroke="#ff4d4f" />
          <Line type="monotone" dataKey="schreiben" stroke="#ffa940" />
          <Line type="monotone" dataKey="hoeren" stroke="#36cfc9" />
          <Line type="monotone" dataKey="lesen" stroke="#597ef7" />
          <Line type="monotone" dataKey="grammatik" stroke="#9254de" />
          <Line type="monotone" dataKey="evaluacion" stroke="#73d13d" />
          <Line type="monotone" dataKey="tarea" stroke="#f759ab" />
  	  <Line
  type="monotone"
  dataKey="promedio"
  stroke="#ffffff"
  strokeWidth={3}
  dot={{ r: 5, fill: "#ffffff" }}
  style={{ filter: "url(#glow-white)" }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}