// Capa de acceso a datos de la plataforma.
// Hoy lee de /data/*.ts. Para migrar a Google Sheets o un CMS,
// reimplementa estas funciones sin tocar la UI (por eso son async desde ya).
import { MODULOS } from "@/data/modulos";
import { MATERIALES } from "@/data/materiales";
import { SESIONES } from "@/data/sesiones";
import { REGISTROS } from "@/data/registros";
import { ENCUESTA } from "@/data/encuesta";
import { USERS } from "@/data/users";
import type {
  Encuesta,
  EstadoSesion,
  Material,
  Modulo,
  RegistroGrafico,
  Sesion,
  TipoMaterial,
} from "@/lib/types";

export async function getModulos(): Promise<Modulo[]> {
  return [...MODULOS].sort((a, b) => a.numero - b.numero);
}

export interface ModuloConEstado extends Modulo {
  estado: EstadoSesion;
}

/**
 * Módulos con su estado en la ruta (realizada / próxima / programada),
 * derivado de la próxima sesión — no es un dato del modelo Modulo. Lo usa el
 * rail del Repositorio y cualquier vista que necesite ubicar el avance.
 */
export async function getModulosConEstado(): Promise<ModuloConEstado[]> {
  const [modulos, proxima] = await Promise.all([getModulos(), getProximaSesion()]);
  const numeroProximo =
    modulos.find((m) => m.id === proxima?.moduloId)?.numero ?? Infinity;
  return modulos.map((m) => ({
    ...m,
    estado:
      m.numero < numeroProximo
        ? "realizada"
        : m.numero === numeroProximo
          ? "proxima"
          : "programada",
  }));
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

export interface UsuarioPublico {
  usuario: string;
  nombre: string;
  /** true si es coordinador/a del programa (rol admin). */
  esCoordinador: boolean;
}

/**
 * Datos públicos de un usuario para mostrar como autor en el foro (nombre e
 * insignia de coordinador). Nunca expone el hash. Lookup sincrónico sobre la
 * lista estática de usuarios.
 */
export function getUsuarioPublico(usuario: string): UsuarioPublico | undefined {
  const u = USERS.find((x) => x.usuario === usuario);
  if (!u) return undefined;
  return { usuario: u.usuario, nombre: u.nombre, esCoordinador: u.rol === "admin" };
}

/** Usuarios reales (excluye las cuentas demo). Base para métricas de adopción. */
export function getUsuariosReales(): UsuarioPublico[] {
  return USERS.filter(
    (u) => u.usuario !== "participante" && u.usuario !== "admin"
  ).map((u) => ({
    usuario: u.usuario,
    nombre: u.nombre,
    esCoordinador: u.rol === "admin",
  }));
}

/**
 * Párrafos de "La Gran Oportunidad" (Estado B) consolidada en el informe del
 * Módulo 1. La usa el hero de Inicio; devolver desde datos evita fijar el
 * texto en la UI si el informe cambia.
 */
export async function getGranOportunidad(): Promise<string[] | undefined> {
  const informe = MATERIALES.find((m) => m.slug === "informe-sesion-modulo-1");
  return informe?.secciones.find((s) => s.titulo?.startsWith("La Gran Oportunidad"))
    ?.parrafos;
}
