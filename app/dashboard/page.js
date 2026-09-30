import Dashboard from "./dashboard";

export const metadata = {
  title: "Mi panel | AireVivo",
  description: "Tu panel personal de calidad del aire.",
};

// Server Component that only renders the shell.
// All the data is loaded in the browser by <Dashboard />.
export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Mi panel</h1>
      <p className="mb-6 text-slate-600">Tus ciudades favoritas, actualizadas cada minuto.</p>
      <Dashboard />
    </main>
  );
}
