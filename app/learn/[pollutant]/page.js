import Link from "next/link";
import { POLLUTANTS, getPollutantById } from "@/lib/pollutants";
import RenderBadge from "@/components/render-badge";
import { formatCurrentTime } from "@/lib/timing";

// 1) Tells Next.js which pages to generate at BUILD TIME
export function generateStaticParams() {
  return POLLUTANTS.map((pollutant) => ({ pollutant: pollutant.id }));
}

// 2) Any id not returned above will be a 404 (no on-demand generation)
export const dynamicParams = false;

// 3) Per-page metadata for SEO, also generated at build time
export async function generateMetadata({ params }) {
  const { pollutant: pollutantId } = await params;
  const pollutant = getPollutantById(pollutantId);

  return {
    title: `${pollutant.name}: ${pollutant.fullName} | AireVivo`,
    description: pollutant.summary,
  };
}

export default async function PollutantPage({ params }) {
  const { pollutant: pollutantId } = await params;
  const pollutant = getPollutantById(pollutantId);

  // Evaluated when the HTML is generated. In SSG, that happens once, at build time.
  

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/learn" className="text-sm text-blue-600 hover:underline">
        ← Todos los contaminantes
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{pollutant.name}</h1>
      <p className="mb-6 text-xl text-slate-600">{pollutant.fullName}</p>
      <p className="mb-8 text-lg">{pollutant.summary}</p>

      <InfoSection title="Principales fuentes" items={pollutant.sources} />
      <InfoSection title="Efectos en la salud" items={pollutant.healthEffects} />
      <InfoSection title="Cómo protegerte" items={pollutant.protectionTips} />

            <RenderBadge pattern="SSG" timeLabel={formatCurrentTime()} />
            
    </main>
  );
}

function InfoSection({ title, items }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <ul className="list-disc space-y-1 pl-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
