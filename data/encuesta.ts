import type { Encuesta } from "@/lib/types";

// Datos reales del levantamiento previo (Informe 05/06/26).
// Regla Adapsys: la métrica es FAVORABILIDAD (respuestas 4–5), nunca promedios.
export const ENCUESTA: Encuesta = {
  titulo: "Encuesta Liderazgo e Integración",
  etapa: "Levantamiento previo",
  n: 14,
  escala: "Likert 1–5",
  esEjemplo: false,
  dimensiones: [
    {
      id: "D1",
      nombre: "Integración entre áreas y oferta al cliente",
      preguntas: [
        {
          numero: 1,
          texto:
            "Los líderes y equipos tenemos claridad respecto al propósito estratégico de integración de las áreas en una sola división.",
          favorable: 62,
          neutral: 23,
          desfavorable: 15,
          nsnr: 1,
        },
        {
          numero: 2,
          texto:
            "Estamos aprovechando las oportunidades reales de generar valor conjunto para nuestros clientes.",
          favorable: 14,
          neutral: 64,
          desfavorable: 21,
        },
        {
          numero: 3,
          texto:
            "Contamos con espacios y rutinas suficientes para coordinarnos transversalmente entre áreas.",
          favorable: 36,
          neutral: 43,
          desfavorable: 21,
        },
        {
          numero: 4,
          texto:
            "Desde los liderazgos impulsamos e intencionamos sinergias entre áreas.",
          favorable: 43,
          neutral: 29,
          desfavorable: 29,
        },
      ],
    },
    {
      id: "D2",
      nombre: "Alineamiento y coordinación del equipo de liderazgo",
      preguntas: [
        {
          numero: 5,
          texto:
            "Como equipo de líderes tenemos una mirada estratégica compartida sobre hacia dónde queremos avanzar en los próximos años.",
          favorable: 36,
          neutral: 43,
          desfavorable: 21,
        },
        {
          numero: 6,
          texto:
            "Como equipo de líderes, dedicamos tiempo de calidad a mirar el negocio, anticipar desafíos y tomar decisiones más allá de la operación diaria.",
          favorable: 43,
          neutral: 43,
          desfavorable: 14,
        },
        {
          numero: 7,
          texto:
            "Tenemos claridad de nuestro rol como equipo de líderes, más allá de los resultados financieros que se nos exigen.",
          favorable: 57,
          neutral: 29,
          desfavorable: 14,
        },
        {
          numero: 8,
          texto:
            "Los líderes abordamos desacuerdos y nos damos feedback entre nosotros directamente, sin importar la jerarquía.",
          favorable: 38,
          neutral: 62,
          desfavorable: 0,
          nsnr: 1,
        },
      ],
    },
    {
      id: "D3",
      nombre: "Prácticas de liderazgo transversales",
      preguntas: [
        {
          numero: 9,
          texto:
            "Tenemos prácticas comunes instaladas para entregar feedback desde nuestros equipos que agregan valor a sus desempeños.",
          favorable: 58,
          neutral: 25,
          desfavorable: 17,
          nsnr: 2,
        },
        {
          numero: 10,
          texto:
            "Tenemos prácticas instaladas de reconocimiento de logros, incorporadas a nuestras rutinas.",
          favorable: 93,
          neutral: 7,
          desfavorable: 0,
        },
        {
          numero: 11,
          texto:
            "Como equipo de líderes tenemos una mirada compartida sobre el talento crítico del área y cómo retenerlo.",
          favorable: 57,
          neutral: 43,
          desfavorable: 0,
        },
        {
          numero: 12,
          texto:
            "Como líderes tenemos prácticas y criterios comunes, y nuestros equipos reciben mensajes consistentes entre nosotros.",
          favorable: 58,
          neutral: 25,
          desfavorable: 17,
          nsnr: 2,
        },
      ],
    },
    {
      id: "D4",
      nombre: "Prácticas de liderazgo individuales",
      preguntas: [
        {
          numero: 13,
          texto:
            "Como líder manejo adecuadamente conversaciones difíciles y situaciones de conflicto con mi equipo.",
          favorable: 83,
          neutral: 17,
          desfavorable: 0,
          nsnr: 2,
        },
        {
          numero: 14,
          texto:
            "Desde mi rol logro mantener un buen clima y gestionar el compromiso en mi equipo.",
          favorable: 92,
          neutral: 8,
          desfavorable: 0,
          nsnr: 1,
        },
        {
          numero: 15,
          texto:
            "Converso de manera regular con mi equipo respecto de lo que deben trabajar para avanzar en su desarrollo profesional.",
          favorable: 60,
          neutral: 40,
          desfavorable: 0,
          nsnr: 4,
        },
        {
          numero: 16,
          texto:
            "Soy capaz de influir y movilizar a personas que no me reportan directamente, cuando el negocio lo requiere.",
          favorable: 83,
          neutral: 17,
          desfavorable: 0,
          nsnr: 2,
        },
      ],
    },
  ],
};
