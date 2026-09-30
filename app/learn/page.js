import Link from "next/link";
import { POLLUTANTS } from "@/lib/pollutants";

export const metadata = {
  title: "Aprende sobre contaminantes | AireVivo",
  description: "Conoce los principales contaminantes del aire y cómo afectan tu salud.",
};

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Aprende sobre contaminantes</h1>
      <p className="mb-8 text-slate-600">
        Conoce qué respiras, de dónde viene y cómo protegerte.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {POLLUTANTS.map((pollutant) => (
          <li key={pollutant.id}>
            <Link
              href={`/learn/${pollutant.id}`}
              className="block rounded-lg border bg-white p-5 transition hover:shadow-md"
            >
              <p className="text-2xl font-bold">{pollutant.name}</p>
              <p className="text-slate-600">{pollutant.fullName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}