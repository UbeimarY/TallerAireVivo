import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { getCurrentAirQuality, getAqiLevel } from "@/lib/air-quality";
import { getPollutantById } from "@/lib/pollutants";
import RenderBadge from "@/components/render-badge";
import { formatCurrentTime } from "@/lib/timing";

// 1) Regenerate this page in the background at most once every 60 seconds.
//    Must be a literal number because Next.js reads it at build time.
//    60s is for testing; in production use 1800 (30 minutes).
export const revalidate = 60;

// 2) Cities NOT returned by generateStaticParams are generated on the first visit
export const dynamicParams = true;

// 3) Only featured cities are pre-generated at build time
export function generateStaticParams() {
  return CITIES.filter((city) => city.isFeatured).map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return { title: "Ciudad no encontrada | AireVivo" };
  }

  return {
    title: `Calidad del aire en ${city.name} | AireVivo`,
    description: `Índice de calidad del aire actual en ${city.name}, ${city.country}.`,
  };
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  // With dynamicParams = true, invalid slugs must be handled manually
  if (!city) {
    notFound();
  }

  const airQuality = await getCurrentAirQuality(city, { next: { revalidate: 60 } });
  const level = getAqiLevel(airQuality.aqi);
        <RenderBadge pattern="ISR" timeLabel={formatCurrentTime()} />

  return (
    <main className="mx-auto max-w-4xl p-8">
      <Link href="/city" className="text-sm text-blue-600 hover:underline">
        ← Todas las ciudades
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{city.name}</h1>
      <p className="mb-6 text-xl text-slate-600">{city.country}</p>

      <div className={`mb-2 inline-block rounded-lg px-6 py-4 text-white ${level.colorClass}`}>
        <p className="text-5xl font-bold">{airQuality.aqi}</p>
        <p className="text-lg">{level.label}</p>
      </div>
      <p className="mb-8 text-sm text-slate-500">
        Medición de la estación: {airQuality.measuredAt.replace("T", " ")} (hora local)
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Contaminantes</h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {Object.entries(airQuality.pollutants).map(([pollutantId, value]) => {
          const pollutant = getPollutantById(pollutantId);

          return (
            <li key={pollutantId}>
              <Link
                href={`/learn/${pollutantId}`}
                className="block rounded-lg border bg-white p-4 transition hover:shadow-md"
              >
                <p className="text-lg font-bold">{pollutant.name}</p>
                <p className="text-2xl">
                  {value} <span className="text-sm text-slate-500">{airQuality.units[pollutantId]}</span>
                </p>
                <p className="text-xs text-slate-500">{pollutant.fullName}</p>
              </Link>
            </li>
          );
        })}
      </ul>

            <RenderBadge pattern="ISR" timeLabel={formatCurrentTime()} />
    </main>
  );
}
