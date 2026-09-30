import Link from "next/link";
import { CITIES } from "@/lib/cities";

export const metadata = {
  title: "Ciudades | AireVivo",
  description: "Consulta la calidad del aire actual en distintas ciudades.",
};

export default function CitiesPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Ciudades</h1>
      <p className="mb-8 text-slate-600">Elige una ciudad para ver su calidad del aire actual.</p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {CITIES.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/city/${city.slug}`}
              className="block rounded-lg border bg-white p-5 transition hover:shadow-md"
            >
              <p className="text-xl font-bold">{city.name}</p>
              <p className="text-slate-600">{city.country}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
