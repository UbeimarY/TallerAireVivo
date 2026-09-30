"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import RenderBadge from "@/components/render-badge";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { getCurrentAirQuality, getAqiLevel } from "@/lib/air-quality";
import {
  subscribeToSelectedCities,
  readStoredCities,
  readStoredCitiesOnServer,
  parseStoredCities,
  saveSelectedCities,
} from "@/lib/dashboard-storage";

const POLL_INTERVAL_MS = 60_000;

export default function Dashboard() {
  // 1) Read the saved selection from localStorage
  const storedValue = useSyncExternalStore(
    subscribeToSelectedCities,
    readStoredCities,
    readStoredCitiesOnServer
  );
  const selectedSlugs = useMemo(() => parseStoredCities(storedValue), [storedValue]);

  const [readingsBySlug, setReadingsBySlug] = useState({});
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("best");

  // 2) Fetch the data IN THE BROWSER, then poll every minute
  useEffect(() => {
    let isCancelled = false;

    async function loadReadings() {
      const cities = selectedSlugs.map(getCityBySlug).filter(Boolean);
      const results = await Promise.allSettled(cities.map((city) => getCurrentAirQuality(city)));

      // The user may have changed the selection while we were waiting
      if (isCancelled) return;

      const nextReadings = {};
      results.forEach((result, index) => {
        nextReadings[cities[index].slug] =
          result.status === "fulfilled" ? { airQuality: result.value } : { hasError: true };
      });

      setReadingsBySlug(nextReadings);
      setLastUpdatedAt(new Date());
    }

    loadReadings();
    const intervalId = setInterval(loadReadings, POLL_INTERVAL_MS);

    // Cleanup: stop polling when the selection changes or the user leaves the page
    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [selectedSlugs, refreshCount]);

  function toggleCity(slug) {
    const nextSlugs = selectedSlugs.includes(slug)
      ? selectedSlugs.filter((selectedSlug) => selectedSlug !== slug)
      : [...selectedSlugs, slug];

    saveSelectedCities(nextSlugs);
  }

  // 3) Sort on every render; cities still loading always go last
  const direction = sortOrder === "best" ? 1 : -1;
  const sortedCities = selectedSlugs
    .map(getCityBySlug)
    .filter(Boolean)
    .sort((cityA, cityB) => {
      const aqiA = readingsBySlug[cityA.slug]?.airQuality?.aqi;
      const aqiB = readingsBySlug[cityB.slug]?.airQuality?.aqi;

      if (aqiA == null) return 1;
      if (aqiB == null) return -1;
      return (aqiA - aqiB) * direction;
    });

  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-5">
        <h2 className="mb-3 font-semibold">Elige tus ciudades</h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => {
            const isSelected = selectedSlugs.includes(city.slug);

            return (
              <button
                key={city.slug}
                type="button"
                onClick={() => toggleCity(city.slug)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  isSelected ? "border-blue-600 bg-blue-600 text-white" : "bg-white hover:bg-slate-100"
                }`}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <SortButton isActive={sortOrder === "best"} onClick={() => setSortOrder("best")}>
            Mejor primero
          </SortButton>
          <SortButton isActive={sortOrder === "worst"} onClick={() => setSortOrder("worst")}>
            Peor primero
          </SortButton>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>
            {lastUpdatedAt
              ? `Última actualización: ${lastUpdatedAt.toLocaleTimeString("es-CO")}`
              : "Cargando datos..."}
          </span>
          <button
            type="button"
            onClick={() => setRefreshCount((count) => count + 1)}
            className="rounded border bg-white px-3 py-1 hover:bg-slate-100"
          >
            Actualizar ahora
          </button>
        </div>
      </div>

      {sortedCities.length === 0 ? (
        <p className="text-slate-500">No has elegido ninguna ciudad todavía.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCities.map((city) => (
            <CityCard key={city.slug} city={city} reading={readingsBySlug[city.slug]} />
          ))}
        </ul>
      )}

      <RenderBadge
        pattern="CSR"
        timeLabel={lastUpdatedAt ? lastUpdatedAt.toLocaleTimeString("es-CO") : "cargando..."}
      />
    </div>
  );
}

function SortButton({ isActive, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded border px-3 py-1 text-sm ${
        isActive ? "border-slate-900 bg-slate-900 text-white" : "bg-white hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function CityCard({ city, reading }) {
  if (!reading) {
    return (
      <li className="animate-pulse rounded-lg border bg-white p-5">
        <p className="text-lg font-bold">{city.name}</p>
        <p className="text-slate-400">Cargando...</p>
      </li>
    );
  }

  if (reading.hasError) {
    return (
      <li className="rounded-lg border bg-white p-5">
        <p className="text-lg font-bold">{city.name}</p>
        <p className="text-red-600">No se pudieron cargar los datos</p>
      </li>
    );
  }

  const { airQuality } = reading;
  const level = getAqiLevel(airQuality.aqi);

  return (
    <li className="rounded-lg border bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-bold">{city.name}</p>
          <p className="text-sm text-slate-500">{city.country}</p>
        </div>
        <span className={`rounded px-3 py-1 text-xl font-bold text-white ${level.colorClass}`}>
          {airQuality.aqi}
        </span>
      </div>
      <p className="mt-2 text-sm">{level.label}</p>
      <p className="mt-1 text-sm text-slate-500">
        PM2.5: {airQuality.pollutants.pm2_5} {airQuality.units.pm2_5}
      </p>
      <Link href={`/city/${city.slug}`} className="mt-3 inline-block text-sm text-blue-600 hover:underline">
        Ver detalle →
      </Link>
    </li>
  );
}
