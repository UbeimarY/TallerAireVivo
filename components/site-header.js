import Link from "next/link";
import NavLink from "./nav-link";

const NAV_ITEMS = [
  { href: "/learn", label: "Aprende", pattern: "SSG" },
  { href: "/city", label: "Ciudades", pattern: "ISR" },
  { href: "/compare", label: "Comparar", pattern: "SSR" },
  { href: "/dashboard", label: "Mi panel", pattern: "CSR" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-mist/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-3 px-6 py-4">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
          AireVivo
        </Link>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} pattern={item.pattern} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}