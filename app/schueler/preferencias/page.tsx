"use client";

import React, { useState, useEffect } from "react";

const STORAGE_KEY = "group_preferences_v1.1";


/* ============================
   Tipos
============================ */

type Pace = "calm" | "balanced" | "intense";

type Preferences = {
  germanPercentage: number;
  correctionLevel: number;
  classPace: Pace;
  activities: {
    explanations: {
      enabled: boolean;
      grammar: boolean;
      phonetics: boolean;
      vocabulary: boolean;
    };
    exercises: {
      enabled: boolean;
      grammar: boolean;
      phonetics: boolean;
      vocabulary: boolean;
    };
    skills: {
      speaking: boolean;
      writing: boolean;
      reading: boolean;
      listening: boolean;
    };
    etymologies: boolean;
    games: boolean;
    languageBridges: {
      enabled: boolean;
      english: boolean;
      spanish: boolean;
      romance: boolean;
      germanic: boolean;
      classical: boolean;
    };
    virtualGames: {
      enabled: boolean;
      games3D: boolean;
      games2D: boolean;
    };
  };
  otherPreferences: string;
};

/* ============================
   Defaults
============================ */

const defaultPreferences: Preferences = {
  germanPercentage: 0,
  correctionLevel: 0,
  classPace: "balanced",
  activities: {
    explanations: {
      enabled: false,
      grammar: false,
      phonetics: false,
      vocabulary: false,
    },
    exercises: {
      enabled: false,
      grammar: false,
      phonetics: false,
      vocabulary: false,
    },
    skills: {
      speaking: false,
      writing: false,
      reading: false,
      listening: false,
    },
    etymologies: false,
    games: false,
    languageBridges: {
      enabled: false,
      english: false,
      spanish: false,
      romance: false,
      germanic: false,
      classical: false,
    },
    virtualGames: {
      enabled: false,
      games3D: false,
      games2D: false,
    },
  },
  otherPreferences: "",
};

/* ============================
   Helpers UI
============================ */

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function labelGermanPct(v: number) {
  if (v <= 10) return "principalmente español";
  if (v <= 40) return "más español que lengua meta";
  if (v <= 60) return "equilibrado";
  if (v <= 80) return "más lengua meta que español";
  if (v <= 90) return "casi todo en lengua meta";
  return "inmersión total";
}

function labelCorrection(v: number) {
  if (v <= 10) return "Déjame fluir";
  if (v <= 40) return "Corrige solo lo esencial";
  if (v <= 70) return "Corrige lo importante";
  return "Corrígeme todo";
}

/* ============================
   Page
============================ */

export default function PreferenciasPage() {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [alreadySent, setAlreadySent] = useState(false);

  useEffect(() => {
    const sent = localStorage.getItem(STORAGE_KEY);
    if (sent === "true") {
      setAlreadySent(true);
    }
  }, []);


  /* ============================
     Mutadores
  ============================ */

  const toggle = (path: string) => {
    setPrefs((prev) => {
      const clone: any = structuredClone(prev);
      const parts = path.split(".");
      let cur = clone;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts.at(-1)!] = !cur[parts.at(-1)!];

      // apagar hijos si se apaga padre
      if (path === "activities.explanations.enabled" && !cur.enabled) {
        Object.assign(clone.activities.explanations, {
          grammar: false,
          phonetics: false,
          vocabulary: false,
        });
      }
      if (path === "activities.exercises.enabled" && !cur.enabled) {
        Object.assign(clone.activities.exercises, {
          grammar: false,
          phonetics: false,
          vocabulary: false,
        });
      }
      if (path === "activities.languageBridges.enabled" && !cur.enabled) {
        Object.assign(clone.activities.languageBridges, {
          english: false,
          spanish: false,
          romance: false,
          germanic: false,
          classical: false,
        });
      }
      if (path === "activities.virtualGames.enabled" && !cur.enabled) {
        Object.assign(clone.activities.virtualGames, {
          games3D: false,
          games2D: false,
        });
      }

      return clone;
    });
  };

  const setNumber = (path: string, value: number) => {
    setPrefs((prev) => {
      const clone: any = structuredClone(prev);
      const parts = path.split(".");
      let cur = clone;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts.at(-1)!] = value;
      return clone;
    });
  };

  const setText = (path: string, value: string) => {
    setPrefs((prev) => {
      const clone: any = structuredClone(prev);
      const parts = path.split(".");
      let cur = clone;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts.at(-1)!] = value;
      return clone;
    });
  };

  /* ============================
     Envío
  ============================ */

  const submit = async () => {
    setSending(true);
    setMsg(null);

    try {
      const r = await fetch("/api/schueler/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: prefs }),
      });

      if (!r.ok) throw new Error();

localStorage.setItem(STORAGE_KEY, "true");
setAlreadySent(true);

setMsg("Preferencias enviadas. ¡Gracias! ✅");
setPrefs(defaultPreferences);

    } catch {
      setMsg("Error al enviar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  /* ============================
     UI
  ============================ */

const setPace = (pace: Pace) => {
  setPrefs((prev) => ({ ...prev, classPace: pace }));
};

const SectionTitle = ({ title }: { title: string }) => (
  <span className="text-white/90 font-medium">{title}</span>
);

const SectionHint = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1 text-xs text-white/50 leading-snug">{children}</p>
);

const Checkbox = ({
  checked,
  onChange,
  label,
  subtle = false,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  subtle?: boolean;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={cx(
      "flex items-center gap-2 rounded-md px-2 py-1 text-left transition",
      subtle ? "text-sm text-white/75" : "text-base",
      "hover:bg-white/5"
    )}
  >
    <span
      className={cx(
        "inline-flex h-4 w-4 items-center justify-center rounded border",
        checked ? "bg-white/15 border-white/40" : "border-white/25"
      )}
    >
      {checked ? "✓" : ""}
    </span>
    <span className="select-none">{label}</span>
  </button>
);


  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold text-white/90">
        Preferencias de clase
      </h1>

      <p className="mt-1 text-sm text-white/50">
        Encuesta anónima para adaptar mejor las clases del grupo.
      </p>

    <div className="flex flex-col h-full">
<aside
  className="
    w-full h-full
    overflow-y-auto custom-scroll
    pt-2 pb-6
  "
>

      <div className="mb-2">
      </div>

      <div className="space-y-3">
        {/* 1) Idioma */}
        <details className="rounded-xl border border-white/10 bg-black/20 p-3" open>
          <summary className="cursor-pointer list-none select-none">
            <SectionTitle title="Idioma en clase" />
            <SectionHint>
              Es una preferencia, no una obligación rígida.
            </SectionHint>
          </summary>

          <div className="mt-3">
            <div className="flex items-end justify-between">
              <div className="text-sm text-white/80">
                ¿Cuánto usaremos el idioma en clase?
              </div>
              <div className="text-xs text-white/50">
                 {prefs.germanPercentage}%
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={prefs.germanPercentage}
              onChange={(e) => setNumber("germanPercentage", Number(e.target.value))}
              className="mt-2 w-full"
            />
           <div className="mt-1 text-xs text-white/40 text-center">
            {labelGermanPct(prefs.germanPercentage)}
           </div>
          </div>
        </details>

        {/* 2) Actividades */}
        <details className="rounded-xl border border-white/10 bg-black/20 p-3" open>
          <summary className="cursor-pointer list-none select-none">
            <SectionTitle title="Actividades preferidas" />
            <SectionHint>Puedes elegir cuantas quieras.</SectionHint>
          </summary>

          <div className="mt-3 space-y-3">
            {/* Explicaciones */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <Checkbox
                checked={prefs.activities.explanations.enabled}
                onChange={() => toggle("activities.explanations.enabled")}
                label="Explicaciones"
              />
              {prefs.activities.explanations.enabled && (
                <div className="mt-1 ml-6 grid gap-1">
                  <Checkbox
                    checked={prefs.activities.explanations.grammar}
                    onChange={() => toggle("activities.explanations.grammar")}
                    label="de gramática"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.explanations.phonetics}
                    onChange={() => toggle("activities.explanations.phonetics")}
                    label="de fonética "
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.explanations.vocabulary}
                    onChange={() => toggle("activities.explanations.vocabulary")}
                    label="de vocabulario"
                    subtle
                  />
                </div>
              )}
            </div>

            {/* Ejercicios */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <Checkbox
                checked={prefs.activities.exercises.enabled}
                onChange={() => toggle("activities.exercises.enabled")}
                label="Ejercicios"
              />
              {prefs.activities.exercises.enabled && (
                <div className="mt-1 ml-6 grid gap-1">
                  <Checkbox
                    checked={prefs.activities.exercises.grammar}
                    onChange={() => toggle("activities.exercises.grammar")}
                    label="de gramática"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.exercises.phonetics}
                    onChange={() => toggle("activities.exercises.phonetics")}
                    label="de fonética"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.exercises.vocabulary}
                    onChange={() => toggle("activities.exercises.vocabulary")}
                    label="de vocabulario"
                    subtle
                  />
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="text-sm text-white/80 px-2 pb-1">Habilidades</div>
              <div className="grid gap-1">
                <Checkbox
                  checked={prefs.activities.skills.speaking}
                  onChange={() => toggle("activities.skills.speaking")}
                  label="Speaking (conversacional)"
                />
                <Checkbox
                  checked={prefs.activities.skills.writing}
                  onChange={() => toggle("activities.skills.writing")}
                  label="Writing (producción escrita)"
                />
                <Checkbox
                  checked={prefs.activities.skills.reading}
                  onChange={() => toggle("activities.skills.reading")}
                  label="Reading (práctica de lectura)"
                />
                <Checkbox
                  checked={prefs.activities.skills.listening}
                  onChange={() => toggle("activities.skills.listening")}
                  label="Listening (entrenamiento auditivo)"
                />
              </div>
            </div>

            {/* Etimologías, Juegos */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="grid gap-1">
                <Checkbox
                  checked={prefs.activities.etymologies}
                  onChange={() => toggle("activities.etymologies")}
                  label="Etimologías"
                />
                <Checkbox
                  checked={prefs.activities.games}
                  onChange={() => toggle("activities.games")}
                  label="Juegos"
                />
              </div>
            </div>

            {/* Puentes con otros idiomas */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <Checkbox
                checked={prefs.activities.languageBridges.enabled}
                onChange={() => toggle("activities.languageBridges.enabled")}
                label="Puenteo con otros idiomas (comparaciones y cognados)"
              />
              {prefs.activities.languageBridges.enabled && (
                <div className="mt-1 ml-6 grid gap-1">
                  <Checkbox
                    checked={prefs.activities.languageBridges.english}
                    onChange={() => toggle("activities.languageBridges.english")}
                    label="Inglés"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.languageBridges.spanish}
                    onChange={() => toggle("activities.languageBridges.spanish")}
                    label="Español"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.languageBridges.romance}
                    onChange={() => toggle("activities.languageBridges.romance")}
                    label="Romances (italiano, francés, portugués)"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.languageBridges.germanic}
                    onChange={() => toggle("activities.languageBridges.germanic")}
                    label="Germánicas (neerlandés, islandés)"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.languageBridges.classical}
                    onChange={() => toggle("activities.languageBridges.classical")}
                    label="Clásicas (latín, griego, proto-germánico)"
                    subtle
                  />
                </div>
              )}
            </div>

            {/* Juegos virtuales */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <Checkbox
                checked={prefs.activities.virtualGames.enabled}
                onChange={() => toggle("activities.virtualGames.enabled")}
                label="Juegos virtuales"
              />
              {prefs.activities.virtualGames.enabled && (
                <div className="mt-1 ml-6 grid gap-1">
                  <Checkbox
                    checked={prefs.activities.virtualGames.games3D}
                    onChange={() => toggle("activities.virtualGames.games3D")}
                    label="Juegos 3D (Roblox, web-socket, ...)"
                    subtle
                  />
                  <Checkbox
                    checked={prefs.activities.virtualGames.games2D}
                    onChange={() => toggle("activities.virtualGames.games2D")}
                    label="Juegos 2D (gimkit, wordwall, flashcards)"
                    subtle
                  />
                </div>
              )}
            </div>
          </div>
        </details>

        {/* 3) Correcciones */}
        <details className="rounded-xl border border-white/10 bg-black/20 p-3" open>
          <summary className="cursor-pointer list-none select-none">
            <SectionTitle title="Correcciones" />
            <SectionHint>Tu preferencia sobre interrupciones y feedback.</SectionHint>
          </summary>

          <div className="mt-3">
            <div className="flex items-end justify-between">
              <div className="text-sm text-white/80">
                ¿Qué tanto deseas que se te corrijan los errores?
              </div>
              <div className="text-xs text-white/50">
               {prefs.correctionLevel}% · {labelCorrection(prefs.correctionLevel)}
              </div>

            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={prefs.correctionLevel}
              onChange={(e) => setNumber("correctionLevel", Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </details>

        {/* 4) Ritmo */}
        <details className="rounded-xl border border-white/10 bg-black/20 p-3" open>
          <summary className="cursor-pointer list-none select-none">
            <SectionTitle title="Ritmo de la clase" />
            <SectionHint>Esto ajusta nuestro ritmo.</SectionHint>
          </summary>

          <div className="mt-3 grid gap-2">
            <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <input
                type="radio"
                name="pace"
                checked={prefs.classPace === "calm"}
                onChange={() => setPace("calm")}
              />
              Tranquilo y detallado
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <input
                type="radio"
                name="pace"
                checked={prefs.classPace === "balanced"}
                onChange={() => setPace("balanced")}
              />
              Equilibrado
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
              <input
                type="radio"
                name="pace"
                checked={prefs.classPace === "intense"}
                onChange={() => setPace("intense")}
              />
              Dinámico e intenso
            </label>
          </div>
        </details>

        {/* 5) Otras */}
        <details className="rounded-xl border border-white/10 bg-black/20 p-3" open>
          <summary className="cursor-pointer list-none select-none">
            <SectionTitle title="Otras preferencias" />
            <SectionHint>
              No siempre será posible cumplir todo, pero lo tendré en cuenta.
            </SectionHint>
          </summary>

          <div className="mt-3">
            <textarea
              value={prefs.otherPreferences}
              onChange={(e) => setText("otherPreferences", e.target.value)}
              placeholder='Ej.: “me pongo nervioso si me corrigen al hablar”, “prefiero ejemplos escritos”'
              className="w-full min-h-[90px] rounded-lg border border-white/10 bg-black/30 p-2 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-white/25"
            />
          </div>
        </details>
      </div>
    </aside>
</div>

      <div className="mt-4">
        <button
  onClick={submit}
  disabled={sending || alreadySent}
  className={cx(
    "w-full rounded-xl px-3 py-2 text-sm font-medium transition border",
    alreadySent
      ? "bg-neutral-800 border-neutral-700 text-neutral-500 cursor-not-allowed"
      : sending
      ? "bg-neutral-700 border-neutral-600"
      : "bg-emerald-600 border-emerald-700 hover:bg-emerald-500"
  )}
>
  {alreadySent
    ? "Preferencias ya enviadas"
    : sending
    ? "Enviando..."
    : "Enviar preferencias"}
</button>

{alreadySent && (
  <p className="mt-2 text-xs text-white/45">
    Ya registraste tus preferencias. ¡Gracias!
  </p>
)}


        {msg && <p className="mt-2 text-xs text-white/70">{msg}</p>}
      </div>
    </main>
  );
}
