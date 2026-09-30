// Persists the dashboard city selection in the browser (localStorage).
// Designed to be used with React's useSyncExternalStore.
const STORAGE_KEY = "airevivo:dashboard-cities";
const CHANGE_EVENT = "airevivo:dashboard-cities-change";
const DEFAULT_CITY_SLUGS = ["bogota", "medellin"];

export function subscribeToSelectedCities(onChange) {
  window.addEventListener("storage", onChange); // Changes made in other tabs
  window.addEventListener(CHANGE_EVENT, onChange); // Changes made in this tab

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Returns the raw string: strings are compared by value, so React
// can tell when nothing changed
export function readStoredCities() {
  return window.localStorage.getItem(STORAGE_KEY);
}

// The server has no localStorage, so it always sees "nothing stored"
export function readStoredCitiesOnServer() {
  return null;
}

export function parseStoredCities(storedValue) {
  if (!storedValue) return DEFAULT_CITY_SLUGS;

  try {
    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : DEFAULT_CITY_SLUGS;
  } catch {
    return DEFAULT_CITY_SLUGS;
  }
}

export function saveSelectedCities(citySlugs) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(citySlugs));
  window.dispatchEvent(new Event(CHANGE_EVENT)); // Notify subscribers in this tab
}
