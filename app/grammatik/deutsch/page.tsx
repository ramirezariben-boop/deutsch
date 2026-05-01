import { readSessionFromHeaders } from "@/lib/auth";
import { canAccess } from "@/lib/grammatik/access";

const COLORS = [
  "#ff3b3b", "#ff6a00", "#ff9f1c", "#ffd60a", "#c7f000",
  "#7ae582", "#2ec4b6", "#00b4d8", "#0096c7", "#0077b6",
  "#5a4fcf", "#7b5cff", "#9d4edd", "#c77dff", "#e0aaff",
];

const REQUIRED_NIVEL = "intermedio_1";

const sections = [
  {
    title: "Hilfsverben",
    buttons: [{ name: "werden", href: "/grammatik/deutsch/werden.html" }],
  },
  {
    title: "Nebensätze",
    buttons: [{ name: "Relativsätze", href: "/grammatik/deutsch/relativsaetze.html" }],
  },
  {
    title: "Verbos",
    buttons: [
      { name: "Verben mit Präfixen", href: "/grammatik/deutsch/verben-praefixe.html" },
    ],
  },
];

export default async function DeutschGrammatikPage() {
  const session = await readSessionFromHeaders();
  const isAdmin = session?.role === "ADMIN";
  const userNivel = session?.nivelActual ?? null;
  const unlocked = isAdmin || canAccess(userNivel, REQUIRED_NIVEL);

  let colorIndex = 0;

  return (
    <main className="min-h-screen bg-neutral-950 p-10">
      <a
        href="/grammatik"
        className="text-xs text-neutral-600 hover:text-neutral-400 mb-8 block"
      >
        ← Grammatik
      </a>

      <h1 className="text-lg mb-8 text-white/70 tracking-wide">
        Deutsche Grammatik
      </h1>

      {!unlocked && (
        <div className="mb-8 text-sm text-amber-400 bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
          🔒 Este contenido requiere nivel{" "}
          {REQUIRED_NIVEL.replace("_", " ")}.
        </div>
      )}

      {sections.map((section) => (
        <section key={section.title} className="mb-20">
          <h2 className="text-lg mb-6 text-white/70">{section.title}</h2>
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
      ))}
    </main>
  );
}
