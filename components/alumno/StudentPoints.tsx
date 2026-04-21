"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

type TimelineItem = {
  label: string;
  points: number;
};

type TimelineByCategoryRow = {
  label: string;
  [key: string]: string | number;
};

type CategoryItem = {
  name: string;
  points: number;
  subcategories: {
    name: string;
    points: number;
  }[];
};

type RecentItem = {
  id: string;
  source: "clase" | "extra";
  ts: string;
  displayTs: string;
  points: number;
  group: string | null;
  category: string;
  subcategory: string;
};

type StudentPointsResponse = {
  summary: {
    total: number;
    claseTotal: number;
    extraTotal: number;
  };
  timeline: {
    day: TimelineItem[];
    week: TimelineItem[];
    month: TimelineItem[];
  };
  timelineByCategory: {
    day: TimelineByCategoryRow[];
    week: TimelineByCategoryRow[];
    month: TimelineByCategoryRow[];
  };
  categories: CategoryItem[];
  recent: RecentItem[];
};

type Props = {
  studentId: number;
};

const SERIES_COLORS = [
  "#60a5fa",
  "#34d399",
  "#f59e0b",
  "#f472b6",
  "#a78bfa",
  "#fb7185",
  "#22d3ee",
  "#c084fc",
];

function formatPts(n: number) {
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}`;
}

function sourceLabel(source: "clase" | "extra") {
  return source === "clase" ? "Clase" : "Extra";
}

function formatBucketLabel(label: string, period: "day" | "week" | "month") {
  const parts = label.split("-");

  if (period === "month") {
    return parts.length >= 2 ? `${parts[1]}/${parts[0].slice(2)}` : label;
  }

  return parts.length >= 3 ? `${parts[1]}-${parts[2]}` : label;
}

export default function StudentPoints({ studentId }: Props) {
  const [data, setData] = useState<StudentPointsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const [enabledSeries, setEnabledSeries] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch(`/api/student-points?studentId=${studentId}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: StudentPointsResponse = await res.json();

        if (!cancelled) {
          setData(json);

          const categories = (json.categories ?? []).map((c) => c.name);
          const nextState: Record<string, boolean> = {};
          categories.forEach((cat) => {
            nextState[cat] = true;
          });
          setEnabledSeries(nextState);
        }
      } catch (err) {
        console.error("StudentPoints load error:", err);
        if (!cancelled) {
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const lineData = useMemo(() => {
    if (!data?.timelineByCategory) return [];
    return data.timelineByCategory[period] ?? [];
  }, [data, period]);

  const seriesKeys = useMemo(() => {
    if (!data) return [];
    return data.categories.map((c) => c.name);
  }, [data]);

  if (loading) {
    return <div className="text-sm text-neutral-400">Cargando puntos...</div>;
  }

  if (!data) {
    return (
      <div className="text-sm text-red-400">
        No se pudieron cargar los puntos del alumno.
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-white">
      <div className="flex flex-wrap gap-2 pr-8">
        <button
          onClick={() => setPeriod("day")}
          className={
            period === "day"
              ? "rounded-lg border border-neutral-500 bg-neutral-700 px-4 py-2"
              : "rounded-lg border border-neutral-800 bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
          }
        >
          Diario
        </button>

        <button
          onClick={() => setPeriod("week")}
          className={
            period === "week"
              ? "rounded-lg border border-neutral-500 bg-neutral-700 px-4 py-2"
              : "rounded-lg border border-neutral-800 bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
          }
        >
          Semanal
        </button>

        <button
          onClick={() => setPeriod("month")}
          className={
            period === "month"
              ? "rounded-lg border border-neutral-500 bg-neutral-700 px-4 py-2"
              : "rounded-lg border border-neutral-800 bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
          }
        >
          Mensual
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
          <div className="mb-2 text-xs text-neutral-400">Total</div>
          <div className="text-4xl font-semibold leading-none tracking-tight tabular-nums">
            {formatPts(data.summary.total)}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
          <div className="mb-2 text-xs text-neutral-400">Clase</div>
          <div className="text-4xl font-semibold leading-none tracking-tight tabular-nums">
            {formatPts(data.summary.claseTotal)}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
          <div className="mb-2 text-xs text-neutral-400">Extra (tareas)</div>
          <div className="text-4xl font-semibold leading-none tracking-tight tabular-nums">
            {formatPts(data.summary.extraTotal)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Evolución por tipo</div>
          <div className="text-xs text-neutral-400">
            {period === "day" ? "Vista diaria" : period === "week" ? "Vista semanal" : "Vista mensual"}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {seriesKeys.map((key, i) => (
            <button
              key={key}
              onClick={() =>
                setEnabledSeries((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
              className={
                enabledSeries[key]
                  ? "rounded-full border border-neutral-500 bg-neutral-800 px-3 py-1 text-xs"
                  : "rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-500"
              }
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
              />
              {key}
            </button>
          ))}
        </div>

        {lineData.length === 0 ? (
          <div className="text-sm text-neutral-400">
            No hay datos para este periodo.
          </div>
        ) : (
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 16, left: 8, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <ReferenceLine y={0} stroke="#666" />
                <XAxis
                  dataKey="label"
                  stroke="#cfcfcf"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#666" }}
                  minTickGap={24}
                  tickFormatter={(value) => formatBucketLabel(String(value), period)}
                />
                <YAxis
                  stroke="#cfcfcf"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#666" }}
                  domain={["auto", "auto"]}
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    border: "1px solid #404040",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                  labelStyle={{ color: "#ffffff" }}
                  itemStyle={{ color: "#ffffff" }}
                />

                {seriesKeys.map((key, i) =>
                  enabledSeries[key] ? (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      connectNulls
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
        <div className="mb-4 text-sm font-semibold">Categorías</div>

        {data.categories.length === 0 ? (
          <div className="text-sm text-neutral-400">
            No hay categorías registradas.
          </div>
        ) : (
          <div className="space-y-4">
            {data.categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="font-medium">{cat.name}</div>
                  <div className="whitespace-nowrap font-semibold tabular-nums">
                    {formatPts(cat.points)}
                  </div>
                </div>

                <div className="space-y-2">
                  {cat.subcategories.map((sub) => (
                    <div
                      key={`${cat.name}_${sub.name}`}
                      className="flex items-start justify-between gap-3 text-sm text-neutral-300"
                    >
                      <span className="break-all">{sub.name}</span>
                      <span className="whitespace-nowrap tabular-nums">
                        {formatPts(sub.points)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5">
        <div className="mb-4 text-sm font-semibold">Movimientos recientes</div>

        {data.recent.length === 0 ? (
          <div className="text-sm text-neutral-400">
            No hay movimientos recientes.
          </div>
        ) : (
          <div className="space-y-2">
            {data.recent.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{item.category}</div>

                    <div className="mt-1 text-xs text-neutral-400">
                      {item.displayTs} · {sourceLabel(item.source)}
                      {item.group ? ` · ${item.group}` : ""}
                    </div>

                    <div className="mt-1 break-all text-xs text-neutral-500">
                      {item.subcategory}
                    </div>
                  </div>

                  <div className="whitespace-nowrap text-sm font-semibold tabular-nums">
                    {formatPts(Number(item.points))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}