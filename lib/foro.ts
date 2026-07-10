import { and, count, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { posts, respuestas, reaccionesPost, reaccionesRespuesta } from "@/db/schema";
import { getUsuarioPublico } from "@/lib/content";

// Capa de lectura del Foro (Server Components). Si no hay DB configurada,
// devuelve vacío/null sin romper la app. La UI nunca toca la DB directo.

export type TipoPost = "pregunta" | "anuncio" | "discusion";

export interface AutorForo {
  usuario: string;
  nombre: string;
  esCoordinador: boolean;
}

export interface PostResumen {
  id: string;
  tipo: TipoPost;
  titulo: string;
  cuerpo: string;
  fijado: boolean;
  creadoEn: Date;
  actualizadoEn: Date | null;
  autor: AutorForo;
  nRespuestas: number;
  nReacciones: number;
  yaReacciono: boolean;
}

export interface RespuestaForo {
  id: string;
  cuerpo: string;
  creadoEn: Date;
  actualizadoEn: Date | null;
  autor: AutorForo;
  nReacciones: number;
  yaReacciono: boolean;
}

export interface PostDetalle extends Omit<PostResumen, "nRespuestas"> {
  respuestas: RespuestaForo[];
}

function autorDe(usuario: string): AutorForo {
  return (
    getUsuarioPublico(usuario) ?? { usuario, nombre: usuario, esCoordinador: false }
  );
}

/** Feed: fijados primero, luego más recientes (máx. 50). */
export async function getPosts(viewer?: string): Promise<PostResumen[]> {
  if (!db) return [];
  const filas = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.fijado), desc(posts.creadoEn))
    .limit(50);
  if (filas.length === 0) return [];

  const ids = filas.map((f) => f.id);
  const [resp, reac, misReac] = await Promise.all([
    db
      .select({ postId: respuestas.postId, n: count() })
      .from(respuestas)
      .where(inArray(respuestas.postId, ids))
      .groupBy(respuestas.postId),
    db
      .select({ postId: reaccionesPost.postId, n: count() })
      .from(reaccionesPost)
      .where(inArray(reaccionesPost.postId, ids))
      .groupBy(reaccionesPost.postId),
    viewer
      ? db
          .select({ postId: reaccionesPost.postId })
          .from(reaccionesPost)
          .where(
            and(
              inArray(reaccionesPost.postId, ids),
              eq(reaccionesPost.autorUsuario, viewer)
            )
          )
      : Promise.resolve([] as { postId: string }[]),
  ]);

  const mapResp = new Map(resp.map((r) => [r.postId, Number(r.n)]));
  const mapReac = new Map(reac.map((r) => [r.postId, Number(r.n)]));
  const mios = new Set(misReac.map((r) => r.postId));

  return filas.map((f) => ({
    id: f.id,
    tipo: f.tipo,
    titulo: f.titulo,
    cuerpo: f.cuerpo,
    fijado: f.fijado,
    creadoEn: f.creadoEn,
    actualizadoEn: f.actualizadoEn,
    autor: autorDe(f.autorUsuario),
    nRespuestas: mapResp.get(f.id) ?? 0,
    nReacciones: mapReac.get(f.id) ?? 0,
    yaReacciono: mios.has(f.id),
  }));
}

/** Post con su hilo de respuestas. null si no existe o no hay DB. */
export async function getPost(
  id: string,
  viewer?: string
): Promise<PostDetalle | null> {
  if (!db) return null;
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!post) return null;

  const listaResp = await db
    .select()
    .from(respuestas)
    .where(eq(respuestas.postId, id))
    .orderBy(respuestas.creadoEn);
  const respIds = listaResp.map((r) => r.id);

  const [reacPost, misReacPost, reacResp, misReacResp] = await Promise.all([
    db
      .select({ n: count() })
      .from(reaccionesPost)
      .where(eq(reaccionesPost.postId, id)),
    viewer
      ? db
          .select({ postId: reaccionesPost.postId })
          .from(reaccionesPost)
          .where(
            and(
              eq(reaccionesPost.postId, id),
              eq(reaccionesPost.autorUsuario, viewer)
            )
          )
      : Promise.resolve([] as { postId: string }[]),
    respIds.length
      ? db
          .select({ respuestaId: reaccionesRespuesta.respuestaId, n: count() })
          .from(reaccionesRespuesta)
          .where(inArray(reaccionesRespuesta.respuestaId, respIds))
          .groupBy(reaccionesRespuesta.respuestaId)
      : Promise.resolve([] as { respuestaId: string; n: number }[]),
    viewer && respIds.length
      ? db
          .select({ respuestaId: reaccionesRespuesta.respuestaId })
          .from(reaccionesRespuesta)
          .where(
            and(
              inArray(reaccionesRespuesta.respuestaId, respIds),
              eq(reaccionesRespuesta.autorUsuario, viewer)
            )
          )
      : Promise.resolve([] as { respuestaId: string }[]),
  ]);

  const mapReacResp = new Map(reacResp.map((r) => [r.respuestaId, Number(r.n)]));
  const miosResp = new Set(misReacResp.map((r) => r.respuestaId));

  return {
    id: post.id,
    tipo: post.tipo,
    titulo: post.titulo,
    cuerpo: post.cuerpo,
    fijado: post.fijado,
    creadoEn: post.creadoEn,
    actualizadoEn: post.actualizadoEn,
    autor: autorDe(post.autorUsuario),
    nReacciones: Number(reacPost[0]?.n ?? 0),
    yaReacciono: misReacPost.length > 0,
    respuestas: listaResp.map((r) => ({
      id: r.id,
      cuerpo: r.cuerpo,
      creadoEn: r.creadoEn,
      actualizadoEn: r.actualizadoEn,
      autor: autorDe(r.autorUsuario),
      nReacciones: mapReacResp.get(r.id) ?? 0,
      yaReacciono: miosResp.has(r.id),
    })),
  };
}
