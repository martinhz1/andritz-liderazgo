// Modelo de datos de la Academia de Liderazgo Andritz Separation.
// La capa de datos vive detrás de lib/content.ts — la UI nunca importa /data directamente.

export type EstadoSesion = "realizada" | "proxima" | "programada";

export interface Modulo {
  id: string;
  numero: 1 | 2 | 3 | 4 | 5;
  slug: string;
  titulo: string;
  descripcion: string;
  preguntaGuia: string;
}

export type TipoMaterial = "definiciones" | "informe" | "lecturas" | "tareas";

export interface ColumnaEjercicio {
  titulo: string;
  items: string[];
}

export interface SeccionMaterial {
  titulo?: string;
  parrafos?: string[];
  lista?: string[];
  citas?: string[];
  columnas?: ColumnaEjercicio[];
  destacado?: string;
}

export interface Material {
  id: string;
  slug: string;
  moduloId: string;
  tipo: TipoMaterial;
  titulo: string;
  resumen: string;
  secciones: SeccionMaterial[];
}

export interface Sesion {
  id: string;
  moduloId: string;
  /** dd/mm/aa — TODO: reemplazar por fechas reales */
  fecha: string;
  horario: string;
  lugar: string;
  estado: EstadoSesion;
}

export interface Foto {
  /** null = placeholder pendiente de subir */
  src: string | null;
  alt: string;
}

export interface RegistroGrafico {
  sesionId: string;
  titulo: string;
  fotos: Foto[];
}

export interface PreguntaEncuesta {
  numero: number;
  texto: string;
  /** Porcentajes 0–100. favorable + neutral + desfavorable = 100 */
  favorable: number;
  neutral: number;
  desfavorable: number;
  /** Cantidad de personas que contestan No Sabe / No Responde */
  nsnr?: number;
}

export interface DimensionEncuesta {
  id: "D1" | "D2" | "D3" | "D4";
  nombre: string;
  preguntas: PreguntaEncuesta[];
}

export interface Encuesta {
  titulo: string;
  etapa: string;
  n: number;
  escala: string;
  esEjemplo: boolean;
  dimensiones: DimensionEncuesta[];
}

export type Rol = "participante" | "admin";

export interface Usuario {
  usuario: string;
  password: string;
  rol: Rol;
  nombre: string;
}

export interface Sesion_Auth {
  u: string; // usuario
  n: string; // nombre
  r: Rol; // rol
  exp: number; // epoch ms
}

export type BandaPercepcion = "Baja" | "Media" | "Alta";

export function bandaDe(favorabilidad: number): BandaPercepcion {
  if (favorabilidad <= 60) return "Baja";
  if (favorabilidad <= 80) return "Media";
  return "Alta";
}

/** Favorabilidad de una dimensión = promedio simple de la favorabilidad de sus preguntas (redondeado solo al mostrar). */
export function favorabilidadDimension(d: DimensionEncuesta): number {
  const suma = d.preguntas.reduce((acc, p) => acc + p.favorable, 0);
  return suma / d.preguntas.length;
}
