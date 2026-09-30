import Link from "next/link";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { getCurrentAirQuality, getAqiLevel } from "@/lib/air-quality";
import { POLLUTANTS } from "@/lib/pollutants";
import RenderBadge from "@/components/render-badge";
import { measureDuration, formatCurrentTime } from "@/lib/timing";


const MAX_CITIES = 4;

// Accepts both "?cities=bogota,lima" and "?cities=bogota&cities=lima" (the format an HTML form sends)
function parseCitySlugs(rawValue) {
  if (!rawValue) return [];

  const values = Array.isArray(rawValue) ? rawValue : [rawValue];
  const slugs = values.flatMap((value) => value.split(","));

  // Remove duplicates and limit the amount
  return [...new Set(slugs)].slice(0, MAX_CITIES);
}

function getSelectedCities(searchParams) {
  return parseCitySlugs(searchParams.cities)
    .map(getCityBySlug)
    .filter(Boolean); // Ignore invalid slugs
}

// Dynamic metadata: a shared link shows "Bogotá vs Lima" as its title
export async function generateMetadata({ searchParams }) {
  const cities = getSelectedCities(await searchParams);

  if (cities.length === 0) {
    return { title: "Comparar ciudades | AireVivo" };
  }

  const cityNames = cities.map((city) => city.name).join(" vs ");

  return {
    title: `${cityNames} | AireVivo`,
    description: `Comparación de la calidad del aire entre ${cityNames}.`,
  };
}

export default async function ComparePage({ searchParams }) {
  const cities = getSelectedCities(await searchParams);

   // Parallel requests. The server can't send any HTML until ALL of them finish.
  const { result: results, durationMs: fetchDurationMs } = await measureDuration(() =>
    Promise.all(
      cities.map(async (city) => ({
        city,
        airQuality: await getCurrentAirQuality(city, { cache: "no-store" }),
      }))
    )
  );

  const bestResult =
    results.length > 1
      ? results.reduce((best, current) => (current.airQuality.aqi < best.airQuality.aqi ? current : best))
      : null;

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Comparar ciudades</h1>
      <p className="mb-6 text-slate-600">Elige hasta {MAX_CITIES} ciudades para compararlas.</p>

      <CitySelector selectedSlugs={cities.map((city) => city.slug)} />

      {results.length === 0 && (
        <p className="mt-8 text-slate-500">Selecciona al menos una ciudad y presiona «Comparar».</p>
      )}

      {bestResult && (
        <p className="mt-8 text-lg">
          🏆 Mejor calidad del aire: <strong>{bestResult.city.name}</strong>
        </p>
      )}

      {results.length > 0 && <ComparisonTable results={results} />}

            <p className="mt-10 text-xs text-slate-400">
        El servidor esperó {fetchDurationMs} ms por los datos antes de enviar esta página.
      </p>

      <RenderBadge pattern="SSR" timeLabel={formatCurrentTime()} />
      
    </main>
  );
}

// A plain GET form: it works even with JavaScript disabled
function CitySelector({ selectedSlugs }) {
  return (
    <form method="get" action="/compare" className="rounded-lg border bg-white p-5">
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        {CITIES.map((city) => (
          <label key={city.slug} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="cities"
              value={city.slug}
              defaultChecked={selectedSlugs.includes(city.slug)}
            />
            {city.name}
          </label>
        ))}
      </div>
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Comparar
      </button>
    </form>
  );
}

function ComparisonTable({ results }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse bg-white text-left">
        <thead>
          <tr>
            <th className="border p-3">Indicador</th>
            {results.map(({ city }) => (
              <th key={city.slug} className="border p-3">
                <Link href={`/city/${city.slug}`} className="text-blue-600 hover:underline">
                  {city.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3 font-semibold">ICA</td>
            {results.map(({ city, airQuality }) => {
              const level = getAqiLevel(airQuality.aqi);

              return (
                <td key={city.slug} className="border p-3">
                  <span className={`rounded px-2 py-1 font-bold text-white ${level.colorClass}`}>
                    {airQuality.aqi}
                  </span>{" "}
                  <span className="text-sm">{level.label}</span>
                </td>
              );
            })}
          </tr>

          {POLLUTANTS.map((pollutant) => (
            <tr key={pollutant.id}>
              <td className="border p-3">
                <Link href={`/learn/${pollutant.id}`} className="text-blue-600 hover:underline">
                  {pollutant.name}
                </Link>
              </td>
              {results.map(({ city, airQuality }) => (
                <td key={city.slug} className="border p-3">
                  {airQuality.pollutants[pollutant.id]}{" "}
                  <span className="text-xs text-slate-500">{airQuality.units[pollutant.id]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}