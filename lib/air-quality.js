const API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

const CURRENT_VARIABLES = [
  "us_aqi",
  "pm2_5",
  "pm10",
  "ozone",
  "nitrogen_dioxide",
  "carbon_monoxide",
  "sulphur_dioxide",
];

export async function getCurrentAirQuality(city, fetchOptions = {}) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: CURRENT_VARIABLES.join(","),
    timezone: "auto",
  });

  const response = await fetch(`${API_URL}?${params}`, fetchOptions);

  if (!response.ok) {
    throw new Error(`Air quality request failed for "${city.slug}": ${response.status}`);
  }

  const data = await response.json();

  // Reshape the raw API response into something easier to use in the UI
  return {
    measuredAt: data.current.time,
    aqi: data.current.us_aqi,
    pollutants: {
      pm2_5: data.current.pm2_5,
      pm10: data.current.pm10,
      ozone: data.current.ozone,
      nitrogen_dioxide: data.current.nitrogen_dioxide,
      carbon_monoxide: data.current.carbon_monoxide,
      sulphur_dioxide: data.current.sulphur_dioxide,
    },
    units: data.current_units,
  };
}

/**
 * Translates an AQI number into a level with a label (Spanish, shown on screen)
 * and Tailwind color classes.
 */
// Air quality scale. Labels are shown on screen, so they are in Spanish.
// textClass keeps the text readable on top of each color.
export const AQI_LEVELS = [
  { max: 50, range: "0–50", label: "Buena", colorClass: "bg-aqi-good", textClass: "text-ink", tintClass: "bg-aqi-good/15" },
  { max: 100, range: "51–100", label: "Moderada", colorClass: "bg-aqi-moderate", textClass: "text-ink", tintClass: "bg-aqi-moderate/20" },
  { max: 150, range: "101–150", label: "Dañina para grupos sensibles", colorClass: "bg-aqi-sensitive", textClass: "text-ink", tintClass: "bg-aqi-sensitive/15" },
  { max: 200, range: "151–200", label: "Dañina", colorClass: "bg-aqi-unhealthy", textClass: "text-white", tintClass: "bg-aqi-unhealthy/15" },
  { max: 300, range: "201–300", label: "Muy dañina", colorClass: "bg-aqi-very-unhealthy", textClass: "text-white", tintClass: "bg-aqi-very-unhealthy/15" },
  { max: Infinity, range: "301 o más", label: "Peligrosa", colorClass: "bg-aqi-hazardous", textClass: "text-white", tintClass: "bg-aqi-hazardous/15" },
];

export function getAqiLevel(aqi) {
  return AQI_LEVELS.find((level) => aqi <= level.max);
}
