import Link from "next/link";
import { AQI_LEVELS } from "@/lib/air-quality";

const SECTIONS = [
  {
    href: "/learn",
    title: "Aprende",
    pattern: "SSG",
    description: "Qué es cada contaminante, de dónde viene y cómo protegerte.",
  },
  {
    href: "/city",
    title: "Ciudades",
    pattern: "ISR",
    description: "El aire de cada ciudad ahora mismo, actualizado cada pocos minutos.",
  },
  {
    href: "/compare?cities=bogota,lima",
    title: "Comparar",
    pattern: "SSR",
    description: "Pon varias ciudades lado a lado y descubre cuál respira mejor.",
  },
  {
    href: "/dashboard",
    title: "Mi panel",
    pattern: "CSR",
    description: "Tus ciudades favoritas en un solo lugar, siempre al día.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24">
      <section className="pb-14 pt-16 sm:pt-24">
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
          ¿Qué tan limpio está el aire que respiras?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-haze sm:text-xl">
          Consulta la calidad del aire de tu ciudad, compárala con otras y entiende qué significa cada número.
        </p>
      </section>

      <section aria-labelledby="scale-title" className="border-t border-line pt-8">
        <h2 id="scale-title" className="font-display text-2xl font-bold">
          Cómo leer el índice
        </h2>
        <p className="mt-2 max-w-2xl text-haze">
          El índice de calidad del aire (ICA) va de 0 a 500. Entre más bajo, más limpio.
        </p>

        <ol className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:grid-cols-3 lg:grid-cols-6">
          {AQI_LEVELS.map((level) => (
            <li
              key={level.label}
              className={`flex min-h-32 flex-col justify-between gap-4 p-4 ${level.colorClass} ${level.textClass}`}
            >
              <span className="font-display text-2xl font-bold tabular-nums">{level.range}</span>
              <span className="text-sm font-bold leading-snug">{level.label}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="sections-title" className="mt-20">
        <h2 id="sections-title" className="sr-only">
          Secciones
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="group grid gap-2 py-7 sm:grid-cols-[1fr_2fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-accent">
                  {section.title}
                </span>
                <span className="text-lg text-haze">{section.description}</span>
                <span className="text-sm text-haze">Renderizada con {section.pattern}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
