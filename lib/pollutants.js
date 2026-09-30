// Educational content for each pollutant.
// Keys are in English; all text values are displayed on screen, so they are in Spanish.
export const POLLUTANTS = [
  {
    id: "pm2_5",
    name: "PM2.5",
    fullName: "Material particulado fino",
    summary:
      "Partículas de 2.5 micrómetros o menos, unas 30 veces más delgadas que un cabello. Son tan pequeñas que llegan a lo más profundo de los pulmones e incluso al torrente sanguíneo.",
    sources: ["Motores diésel y vehículos", "Industria", "Quema de leña y biomasa", "Incendios forestales"],
    healthEffects: ["Enfermedades cardiovasculares", "Enfermedades respiratorias crónicas", "Empeora el asma"],
    protectionTips: ["Evita el ejercicio al aire libre en días de mala calidad", "Usa mascarilla N95 si debes salir", "Usa purificadores con filtro HEPA en interiores"],
  },
  {
    id: "pm10",
    name: "PM10",
    fullName: "Material particulado grueso",
    summary:
      "Partículas de hasta 10 micrómetros. Se quedan principalmente en la nariz, la garganta y las vías respiratorias superiores.",
    sources: ["Polvo de vías sin pavimentar", "Obras de construcción", "Polen", "Actividad minera"],
    healthEffects: ["Irritación de ojos, nariz y garganta", "Tos y dificultad para respirar", "Crisis de asma"],
    protectionTips: ["Cierra ventanas en días de mucho polvo", "Evita zonas de construcción", "Humedece superficies al barrer"],
  },
  {
    id: "ozone",
    name: "O₃",
    fullName: "Ozono troposférico",
    summary:
      "No se emite directamente: se forma cuando otros contaminantes reaccionan con la luz del sol. Por eso sus picos suelen darse en tardes soleadas.",
    sources: ["Reacción de óxidos de nitrógeno con luz solar", "Compuestos orgánicos volátiles", "Tráfico vehicular (de forma indirecta)"],
    healthEffects: ["Reduce la función pulmonar", "Dolor en el pecho al respirar profundo", "Empeora el asma y la bronquitis"],
    protectionTips: ["Haz actividad física temprano en la mañana", "Evita el ejercicio intenso en tardes soleadas", "Consulta el índice antes de salir"],
  },
  {
    id: "nitrogen_dioxide",
    name: "NO₂",
    fullName: "Dióxido de nitrógeno",
    summary:
      "Gas rojizo producido por la combustión a altas temperaturas. Es muy común en ciudades con tráfico denso y ayuda a formar ozono y partículas.",
    sources: ["Vehículos", "Centrales térmicas", "Estufas de gas en interiores"],
    healthEffects: ["Inflamación de las vías respiratorias", "Mayor riesgo de infecciones respiratorias", "Desarrollo de asma en niños"],
    protectionTips: ["Evita caminar por avenidas de alto tráfico", "Ventila la cocina si usas gas", "Prefiere rutas con vegetación"],
  },
  {
    id: "carbon_monoxide",
    name: "CO",
    fullName: "Monóxido de carbono",
    summary:
      "Gas incoloro e inodoro producido por la combustión incompleta. Reduce la capacidad de la sangre para transportar oxígeno.",
    sources: ["Escapes de vehículos", "Calentadores y estufas mal ventilados", "Quema de combustibles"],
    healthEffects: ["Dolor de cabeza y mareo", "Fatiga y confusión", "En altas concentraciones puede ser mortal"],
    protectionTips: ["Nunca dejes un motor encendido en lugares cerrados", "Revisa calentadores y estufas", "Instala detectores de CO en casa"],
  },
  {
    id: "sulphur_dioxide",
    name: "SO₂",
    fullName: "Dióxido de azufre",
    summary:
      "Gas de olor fuerte que proviene de quemar combustibles con azufre. También lo emiten los volcanes y contribuye a la lluvia ácida.",
    sources: ["Quema de carbón", "Refinerías e industria", "Actividad volcánica"],
    healthEffects: ["Irritación de las vías respiratorias", "Broncoconstricción en personas con asma", "Irritación de ojos"],
    protectionTips: ["Sigue las alertas de autoridades ambientales", "Permanece en interiores durante eventos volcánicos", "Evita zonas industriales en días críticos"],
  },
];

export function getPollutantById(id) {
  return POLLUTANTS.find((pollutant) => pollutant.id === id);
}
