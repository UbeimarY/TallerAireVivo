// Rendering patterns, described for the user (Spanish).
// The badge is intentionally neutral so it never gets confused with the air quality colors.
const PATTERNS = {
  SSG: {
    fullName: "Static Site Generation",
    description: "Esta página se generó una sola vez, al compilar.",
    timePrefix: "Generada en el build:",
  },
  ISR: {
    fullName: "Incremental Static Regeneration",
    description: "Esta página es estática y se regenera en segundo plano.",
    timePrefix: "Última regeneración:",
  },
  SSR: {
    fullName: "Server-Side Rendering",
    description: "El servidor armó esta página para tu visita.",
    timePrefix: "Renderizada:",
  },
  CSR: {
    fullName: "Client-Side Rendering",
    description: "Tu navegador cargó los datos de esta página.",
    timePrefix: "Datos cargados:",
  },
};

export default function RenderBadge({ pattern, timeLabel }) {
  const { fullName, description, timePrefix } = PATTERNS[pattern];

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-line bg-paper/95 p-4 shadow-[0_10px_30px_rgba(20,38,59,0.12)] backdrop-blur">
      <p className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold leading-none">{pattern}</span>
        <span className="text-xs text-haze">{fullName}</span>
      </p>
      <p className="mt-2 text-sm leading-snug">{description}</p>
      <p className="mt-2 text-xs tabular-nums text-haze">
        {timePrefix} {timeLabel}
      </p>
    </aside>
  );
}
