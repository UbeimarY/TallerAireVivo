"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label, pattern }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-baseline gap-1.5 border-b-2 pb-1 transition-colors ${
        isActive ? "border-ink text-ink" : "border-transparent text-haze hover:text-ink"
      }`}
    >
      <span className="font-bold">{label}</span>
      <span className="text-xs">{pattern}</span>
    </Link>
  );
}