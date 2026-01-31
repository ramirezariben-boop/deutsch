// app/panel/layout.tsx
import Link from "next/link";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-8 text-white space-y-6">

      <header>
        <h1 className="text-2xl font-bold">Panel académico</h1>
        <p className="text-sm text-gray-400">
          Deutsch mit AriiBen · Métricas internas
        </p>
      </header>

      {/* Tabs */}
      <nav className="flex gap-4 border-b border-neutral-700 pb-2 text-sm">
        <Tab href="/panel/asistencia">Asistencia</Tab>
        <Tab href="/panel/calificaciones">Calificaciones</Tab>
        <Tab href="/panel/progreso">Progreso</Tab>
      </nav>

      <main>{children}</main>
    </div>
  );
}

function Tab({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-t bg-neutral-800 hover:bg-neutral-700 transition"
    >
      {children}
    </Link>
  );
}
