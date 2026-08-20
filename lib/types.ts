// Modelo de datos de la Academia de Liderazgo Andritz.
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

export type TipoMaterial =
  | "definiciones"
  | "informe"
  | "lecturas"
  | "tareas"
  | "presentacion"
  | "video";

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

/** Documento PDF embebido en un material (presentación de la sesión o lectura). */
export interface PdfAdjunto {
  /** Ruta pública, p. ej. "/materiales/m1/presentacion-modulo-1.pdf". */
  src: string;
  /** Cantidad de páginas del PDF, para la meta de la tarjeta (opcional). */
  paginas?: number;
}

/** Video embebido en un material (materiales tipo "video"). */
export interface VideoAdjunto {
  /** Ruta pública del video, p. ej. "/materiales/m3/video-pep-guardiola.mp4". */
  src: string;
  /** Tipo MIME del archivo (por defecto "video/mp4"). */
  tipoMime?: string;
  /** Duración legible, para la meta de la tarjeta (p. ej. "12 min", opcional). */
  duracion?: string;
}

export interface Material {
  id: string;
  slug: string;
  moduloId: string;
  tipo: TipoMaterial;
  titulo: string;
  resumen: string;
  /** Fecha de publicación (ISO, p. ej. "2026-07-02"). Base de las notificaciones. */
  publicadoEn: string;
  secciones: SeccionMaterial[];
  /** PDF embebido (materiales tipo "presentacion" o lecturas con visor). */
  pdf?: PdfAdjunto;
  /** Video embebido (materiales tipo "video"). */
  video?: VideoAdjunto;
}

export interface FechaSesion {
  dia: number;
  /** abreviatura en mayúsculas, p. ej. "JUL" */
  mes: string;
  /** nombre completo en minúscula, p. ej. "julio" */
  mesLargo: string;
  /** abreviatura, p. ej. "jue" */
  diaSemana: string;
  anio: number;
  /** hora local America/Santiago, YYYYMMDDTHHMMSS (para enlaces de calendario) */
  inicio: string;
  fin: string;
}

export interface Sesion {
  id: string;
  moduloId: string;
  /** null mientras la fecha no esté confirmada */
  fecha: FechaSesion | null;
  horario: string;
  lugar: string;
  direccion?: string;
  estado: EstadoSesion;
}

/** "23 jul 2026" */
export function fechaCorta(f: FechaSesion): string {
  return `${f.dia} ${f.mes.toLowerCase()} ${f.anio}`;
}

/** "Jueves 23 de julio de 2026" */
export function fechaLarga(f: FechaSesion): string {
  const dias: Record<string, string> = {
    lun: "Lunes",
    mar: "Martes",
    mié: "Miércoles",
    mie: "Miércoles",
    jue: "Jueves",
    vie: "Viernes",
    sáb: "Sábado",
    sab: "Sábado",
    dom: "Domingo",
  };
  const prefijo = dias[f.diaSemana] ? `${dias[f.diaSemana]} ` : "";
  return `${prefijo}${f.dia} de ${f.mesLargo} de ${f.anio}`;
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
  /** Hash PBKDF2 (pbkdf2$iter$sal$hash) — nunca la contraseña en texto plano. */
  hash: string;
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
