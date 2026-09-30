import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";

// next/font downloads the fonts at build time and serves them from our own domain
const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const bodyFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata = {
  title: "AireVivo",
  description: "Consulta la calidad del aire de tu ciudad y entiende qué significa cada número.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-mist font-body text-ink antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
