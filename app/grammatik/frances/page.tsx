const COLORS = [
  "#ff3b3b", "#ff6a00", "#ff9f1c", "#ffd60a", "#c7f000",
  "#7ae582", "#2ec4b6", "#00b4d8", "#0096c7", "#0077b6",
  "#5a4fcf", "#7b5cff", "#9d4edd", "#c77dff", "#e0aaff",
];

const sections = [
  {
    title: "Noms",
    buttons: [{ name: "Noms", href: "/grammatik/francais/noms.html" }],
  },
  {
    title: "Phonétique",
    buttons: [{ name: "Phonétique", href: "/grammatik/francais/phonetique.html" }],
  },
  {
    title: "Verbes",
    buttons: [{ name: "Conjugaison", href: "/grammatik/francais/conjugaison.html" }],
  },
];

export default function FrancesPage() {
  let colorIndex = 0;

  return (
    <main className="min-h-screen bg-neutral-950 p-10">
      <a
        href="/grammatik"
        className="text-xs text-neutral-600 hover:text-neutral-400 mb-8 block"
      >
        ← Grammatik
      </a>

      <h1 className="text-lg mb-12 text-white/70 tracking-wide">
        Grammaire française
      </h1>

      {sections.map((section) => (
        <section key={section.title} className="mb-20">
          <h2 className="text-lg mb-6 text-white/70">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl">
            {section.buttons.map((b) => {
              const color = COLORS[colorIndex++ % COLORS.length];
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
