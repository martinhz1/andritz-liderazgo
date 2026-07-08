// Capa de acceso a datos de la plataforma.
// Hoy lee de /data/*.ts. Para migrar a Google Sheets o un CMS,
// reimplementa estas funciones sin tocar la UI (por eso son async desde ya).
import { MODULOS } from "@/data/modulos";
import { MATERIALES } from "@/data/materiales";
import { SESIONES } from "@/data/sesiones";
import { REGISTROS } from "@/data/registros";
import { ENCUESTA } from "@/data/encuesta";
import type {
  Encuesta,
  Material,
  Modulo,
  RegistroGrafico,
  Sesion,
  TipoMaterial,
} from "@/lib/types";

export async function getModulos(): Promise<Modulo[]> {
  return [...MODULOS].sort((a, b) => a.numero - b.numero);
}

export async function getModulo(id: string): Promise<Modulo | undefined> {
  return MODULOS.find((m) => m.id === id);
}

export interface FiltroMateriales {
  moduloId?: string;
  tipo?: TipoMaterial;
}

export async function getMateriales(
  filtro?: FiltroMateriales
): Promise<Material[]> {
  return MATERIALES.filter((mat) => {
    if (filtro?.moduloId && mat.moduloId !== filtro.moduloId) return false;
    if (filtro?.tipo && mat.tipo !== filtro.tipo) return false;
    return true;
  });
}

export async function getMaterial(slug: string): Promise<Material | undefined> {
  return MATERIALES.find((m) => m.slug === slug);
}

export async function getSesiones(): Promise<Sesion[]> {
  return SESIONES;
}

/** La próxima sesión = la primera con estado "proxima" (o la primera no realizada). */
export async function getProximaSesion(): Promise<Sesion | undefined> {
  return (
    SESIONES.find((s) => s.estado === "proxima") ??
    SESIONES.find((s) => s.estado !== "realizada")
  );
}

export async function getRegistros(): Promise<RegistroGrafico[]> {
  return REGISTROS;
}

export async function getEncuesta(): Promise<Encuesta> {
  return ENCUESTA;
}
