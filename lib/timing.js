// Runs an async task and measures how long it takes.
// Lives outside the component so the render stays pure (react-hooks/purity).
export async function measureDuration(task) {
  const startTime = Date.now();
  const result = await task();

  return { result, durationMs: Date.now() - startTime };
}

// Current date and time as a readable label.
// Kept outside components so renders stay pure (react-hooks/purity).
export function formatCurrentTime() {
  return new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
}