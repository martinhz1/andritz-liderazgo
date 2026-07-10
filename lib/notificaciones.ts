import { and, desc, eq, gt, ne } from "drizzle-orm";
import { db } from "@/db/client";
import { posts, respuestas, vistasSeccion } from "@/db/schema";
import { getMateriales, getUsuarioPublico } from "@/lib/content";
import type { TipoMaterial } from "@/lib/types";

// Baseline de notificaciones: lo publicado antes de este momento (lanzamiento
// de la campana) no genera avisos para usuarios sin marca previa; solo lo
// posterior notifica. Fijado justo después del contenido semilla existente.
export const INICIO_NOTIFICACIONES = new Date("2026-07-10T01:30:00Z");

export interface NotifForo {
  clase: "post" | "respuesta";
  postId: string;
  titulo: string;
  autorNombre: string;
  fecha: Date;
}

export interface NotifRepo {
  slug: string;
  titulo: string;
  tipo: TipoMaterial;
  fecha: Date;
}

export interface Notificaciones {
  total: number;
  foro: NotifForo[];
  repositorio: NotifRepo[];
}

const nombreDe = (usuario: string) =>
  getUsuarioPublico(usuario)?.nombre ?? usuario;

async function marcasDe(usuario: string) {
  if (!db) return { foro: null as Date | null, repo: null as Date | null };
  const [v] = await db
    .select()
    .from(vistasSeccion)
    .where(eq(vistasSeccion.usuario, usuario))
    .limit(1);
  return { foro: v?.foroVistoEn ?? null, repo: v?.repoVistoEn ?? null };
}

/**
 * Novedades no leídas del usuario: publicaciones nuevas del foro + respuestas a
 * sus propias publicaciones + material nuevo del repositorio (por `publicadoEn`).
 */
export async function getNotificaciones(usuario: string): Promise<Notificaciones> {
  const marcas = await marcasDe(usuario);
  const sinceForo = marcas.foro ?? INICIO_NOTIFICACIONES;
  const sinceRepo = marcas.repo ?? INICIO_NOTIFICACIONES;

  // Repositorio (estático): material publicado después de la última visita.
  const materiales = await getMateriales();
  const repositorio: NotifRepo[] = materiales
    .filter((m) => new Date(m.publicadoEn) > sinceRepo)
    .map((m) => ({
      slug: m.slug,
      titulo: m.titulo,
      tipo: m.tipo,
      fecha: new Date(m.publicadoEn),
    }))
    .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

  // Foro (requiere DB).
  let foro: NotifForo[] = [];
  if (db) {
    const [nuevosPosts, respuestasAMisPosts] = await Promise.all([
      db
        .select({
          id: posts.id,
          titulo: posts.titulo,
          autor: posts.autorUsuario,
          fecha: posts.creadoEn,
        })
        .from(posts)
        .where(and(gt(posts.creadoEn, sinceForo), ne(posts.autorUsuario, usuario)))
        .orderBy(desc(posts.creadoEn))
        .limit(10),
      db
        .select({
          postId: respuestas.postId,
          titulo: posts.titulo,
          autor: respuestas.autorUsuario,
          fecha: respuestas.creadoEn,
        })
        .from(respuestas)
        .innerJoin(posts, eq(respuestas.postId, posts.id))
        .where(
          and(
            eq(posts.autorUsuario, usuario),
            ne(respuestas.autorUsuario, usuario),
            gt(respuestas.creadoEn, sinceForo)
          )
        )
        .orderBy(desc(respuestas.creadoEn))
        .limit(10),
    ]);

    foro = [
      ...nuevosPosts.map((p) => ({
        clase: "post" as const,
        postId: p.id,
        titulo: p.titulo,
        autorNombre: nombreDe(p.autor),
        fecha: p.fecha,
      })),
      ...respuestasAMisPosts.map((r) => ({
        clase: "respuesta" as const,
        postId: r.postId,
        titulo: r.titulo,
        autorNombre: nombreDe(r.autor),
        fecha: r.fecha,
      })),
    ]
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
      .slice(0, 12);
  }

  return { total: foro.length + repositorio.length, foro, repositorio };
}
