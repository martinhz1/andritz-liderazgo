import type { RegistroGrafico } from "@/lib/types";

// TODO: Subir las fotos reales de la jornada a /public/registros/m1/
// y reemplazar src: null por la ruta correspondiente (ej. "/registros/m1/foto-01.jpg").
export const REGISTROS: RegistroGrafico[] = [
  {
    sesionId: "s1",
    titulo: "Jornada Módulo 1 · Liderar el Negocio",
    fotos: [
      { src: null, alt: "Apertura de la jornada y expectativas del equipo" },
      { src: null, alt: "Trabajo grupal: diagnóstico de la División" },
      { src: null, alt: "Construcción de la línea de tiempo: ¿de dónde venimos?" },
      { src: null, alt: "Ejercicio de tres columnas: conservar, descartar, agregar" },
      { src: null, alt: "Plenario: La Gran Oportunidad" },
      { src: null, alt: "Conversaciones en duplas" },
      { src: null, alt: "Cierre de la jornada" },
    ],
  },
];
