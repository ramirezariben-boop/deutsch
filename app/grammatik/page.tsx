import { readSessionFromHeaders } from "@/lib/auth";
import { canAccess } from "@/lib/grammatik/access";

const COLORS = [
  "#ff3b3b", "#ff6a00", "#ff9f1c", "#ffd60a", "#c7f000",
  "#7ae582", "#2ec4b6", "#00b4d8", "#0096c7", "#0077b6",
  "#5a4fcf", "#7b5cff", "#9d4edd", "#c77dff", "#e0aaff",
];

type Btn = { name: string; href: string };
type Section = { title: string; requiredNivel: string; buttons: Btn[] };

const SECTIONS: Section[] = [
  {
    title: "Básico 2",
    requiredNivel: "basico_2",
    buttons: [
      { name: "Akkusativ (intro)",    href: "/grammatik/basico-2/akkusativ.html" },
      { name: "mögen und möchten",    href: "/grammatik/basico-2/mogen_mochten.html" },
      { name: "Die Uhrzeit",          href: "/grammatik/basico-2/uhrzeit.html" },
      { name: "Possessivartikel",     href: "/grammatik/basico-2/possessiv.html" },
      { name: "Modalverben",          href: "/grammatik/basico-2/modalverben.html" },
    ],
  },
  {
    title: "Básico 4",
    requiredNivel: "basico_4",
    buttons: [
      { name: "Imperativ",            href: "/grammatik/basico-4/imperativ.html" },
      { name: "sollen",               href: "/grammatik/basico-4/sollen.html" },
      { name: "müssen und dürfen",    href: "/grammatik/basico-4/muessen_duerfen.html" },
      { name: "Wechselpräpositionen", href: "/grammatik/basico-4/wohin_akkusativ.html" },
      { name: "Modalverben (repaso)", href: "/grammatik/basico-4/modal_pre.html" },
      { name: "Possessivartikel II",  href: "/grammatik/basico-4/possessivartikel_presentation.html" },
    ],
  },
  {
    title: "Intermedio 1 – extras B1",
    requiredNivel: "intermedio_1",
    buttons: [
      { name: "werden",               href: "/grammatik/deutsch/werden.html" },
      { name: "Relativsätze",         href: "/grammatik/deutsch/relativsaetze.html" },
      { name: "Verben mit Präfixen",  href: "/grammatik/deutsch/verben-praefixe.html" },
    ],
  },
  {
    title: "Intermedio 2",
    requiredNivel: "intermedio_2",
    buttons: [
      { name: "Infinitiv mit zu",     href: "/grammatik/intermedio-2/infinitiv-mit-zu.html" },
    ],
  },
  {
    title: "Intermedio 3",
    requiredNivel: "intermedio_3",
    buttons: [
      { name: "Präteritum",           href: "/grammatik/intermedio-3/praeteritum.html" },
    ],
  },
];

export default async function GrammatikPage({
  searchParams,
}: {
  searchParams: Promise<{ locked?: string }>;
}) {
  const [session, sp] = await Promise.all([
    readSessionFromHeaders(),
    searchParams,
  ]);

  const userNivel = session?.nivelActual ?? null;
  const showLocked = sp.locked === "1";

  let colorIndex = 0;

  return (
    <main className="min-h-screen bg-neutral-950 p-10">
      <a
        href="/schueler"
        className="text-xs text-neutral-600 hover:text-neutral-400 mb-8 block"
      >
        ← Mi panel
      </a>

      <h1 className="text-lg mb-4 text-white/70 tracking-wide">
        Material gramatical
      </h1>

      {showLocked && (
        <div className="mb-8 text-sm text-amber-400 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
          Ese contenido no está disponible para tu nivel actual.
        </div>
      )}

      {SECTIONS.map((section) => {
        const unlocked = canAccess(userNivel, section.requiredNivel);

        return (
          <section key={section.title} className="mb-20">
            <h2 className="text-lg mb-6 text-white/70 flex items-center gap-2">
              {section.title}
              {!unlocked && <span className="text-sm text-neutral-600">🔒</span>}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl">
              {section.buttons.map((b) => {
                const color = COLORS[colorIndex++ % COLORS.length];

                if (!unlocked) {
                  return (
                    <div
                      key={b.name}
                      className="glow-card relative rounded-xl bg-neutral-900 p-6 text-center border opacity-25 cursor-not-allowed select-none"
                      style={
                        {
                          borderColor: color,
                          ["--glow" as string]: `${color}88`,
                        } as React.CSSProperties
                      }
                      title={`Requiere nivel ${section.requiredNivel.replace("_", " ")}`}
                    >
                      <div className="relative z-10 text-sm text-white/40">
                        {b.name}
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={b.name}
                    href={b.href}
                    className="glow-card relative rounded-xl bg-neutral-900 p-6 text-center border transition-all duration-300 hover:scale-[1.03]"
                    style={
                      {
                        borderColor: color,
                        ["--glow" as string]: `${color}88`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition"
                      style={{ boxShadow: `0 0 28px ${color}aa` }}
                    />
                    <div className="relative z-10 text-sm text-white/80">
                      {b.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
