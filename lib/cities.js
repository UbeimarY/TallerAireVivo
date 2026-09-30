
export const CITIES = [
  { slug: "bogota", name: "Bogotá", country: "Colombia", latitude: 4.711, longitude: -74.0721, isFeatured: true },
  { slug: "medellin", name: "Medellín", country: "Colombia", latitude: 6.2442, longitude: -75.5812, isFeatured: true },
  { slug: "lima", name: "Lima", country: "Perú", latitude: -12.0464, longitude: -77.0428, isFeatured: true },
  { slug: "quito", name: "Quito", country: "Ecuador", latitude: -0.1807, longitude: -78.4678, isFeatured: false },
  { slug: "santiago", name: "Santiago", country: "Chile", latitude: -33.4489, longitude: -70.6693, isFeatured: false },
  { slug: "buenos-aires", name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816, isFeatured: false },
  { slug: "mexico-city", name: "Ciudad de México", country: "México", latitude: 19.4326, longitude: -99.1332, isFeatured: true },
  { slug: "sao-paulo", name: "São Paulo", country: "Brasil", latitude: -23.5505, longitude: -46.6333, isFeatured: false },
  { slug: "madrid", name: "Madrid", country: "España", latitude: 40.4168, longitude: -3.7038, isFeatured: false },
  { slug: "new-york", name: "Nueva York", country: "Estados Unidos", latitude: 40.7128, longitude: -74.006, isFeatured: false },
];

export function getCityBySlug(slug) {
  return CITIES.find((city) => city.slug === slug);
}