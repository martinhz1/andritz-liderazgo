"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { posts, respuestas, reaccionesPost, reaccionesRespuesta } from "@/db/schema";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import type { Sesion_Auth } from "@/lib/types";
import type { TipoPost } from "@/lib/foro";

export type Resultado = { ok: true } | { ok: false; error: string };

const TITULO_MAX = 140;
const CUERPO_MAX = 5000;
const TIPOS: TipoPost[] = ["pregunta", "anuncio", "discusion"];

async function sesionActual(): Promise<Sesion_Auth | null> {
  const store = await cookies();
  return verificarToken(store.get(COOKIE_SESION)?.value);
}

function limpio(t: unknown): string {
  return typeof t === "string" ? t.trim() : "";
}

// ── Posts ──

export async function crearPost(input: {
  tipo: TipoPost;
  titulo: string;
  cuerpo: string;
}): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const tipo = TIPOS.includes(input.tipo) ? input.tipo : "discusion";
  const titulo = limpio(input.titulo);
  const cuerpo = limpio(input.cuerpo);

  if (tipo === "anuncio" && s.r !== "admin")
    return { ok: false, error: "Solo coordinadores pueden publicar anuncios." };
  if (!titulo) return { ok: false, error: "Escribe un título." };
  if (titulo.length > TITULO_MAX)
    return { ok: false, error: `El título supera ${TITULO_MAX} caracteres.` };
  if (!cuerpo) return { ok: false, error: "Escribe el contenido." };
  if (cuerpo.length > CUERPO_MAX)
    return { ok: false, error: `El contenido supera ${CUERPO_MAX} caracteres.` };

  const [creado] = await db
    .insert(posts)
    .values({ tipo, titulo, cuerpo, autorUsuario: s.u })
    .returning({ id: posts.id });

  revalidatePath("/foro");
  redirect(`/foro/${creado.id}`);
}

export async function editarPost(input: {
  id: string;
  titulo: string;
  cuerpo: string;
}): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [post] = await db.select().from(posts).where(eq(posts.id, input.id)).limit(1);
  if (!post) return { ok: false, error: "La publicación ya no existe." };
  if (post.autorUsuario !== s.u)
    return { ok: false, error: "Solo el autor puede editar esta publicación." };

  const titulo = limpio(input.titulo);
  const cuerpo = limpio(input.cuerpo);
  if (!titulo || !cuerpo)
    return { ok: false, error: "El título y el contenido no pueden quedar vacíos." };
  if (titulo.length > TITULO_MAX || cuerpo.length > CUERPO_MAX)
    return { ok: false, error: "El texto supera el largo permitido." };

  await db
    .update(posts)
    .set({ titulo, cuerpo, actualizadoEn: new Date() })
    .where(eq(posts.id, input.id));

  revalidatePath("/foro");
  revalidatePath(`/foro/${input.id}`);
  return { ok: true };
}

export async function eliminarPost(id: string): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!post) return { ok: true };
  const esCoordinador = s.r === "admin";
  if (post.autorUsuario !== s.u && !esCoordinador)
    return { ok: false, error: "No puedes eliminar esta publicación." };

  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/foro");
  return { ok: true };
}

export async function fijarPost(id: string, fijado: boolean): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (s.r !== "admin")
    return { ok: false, error: "Solo coordinadores pueden fijar publicaciones." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  await db.update(posts).set({ fijado }).where(eq(posts.id, id));
  revalidatePath("/foro");
  revalidatePath(`/foro/${id}`);
  return { ok: true };
}

// ── Respuestas ──

export async function crearRespuesta(input: {
  postId: string;
  cuerpo: string;
}): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const cuerpo = limpio(input.cuerpo);
  if (!cuerpo) return { ok: false, error: "Escribe una respuesta." };
  if (cuerpo.length > CUERPO_MAX)
    return { ok: false, error: `La respuesta supera ${CUERPO_MAX} caracteres.` };

  const [post] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.id, input.postId))
    .limit(1);
  if (!post) return { ok: false, error: "La publicación ya no existe." };

  await db.insert(respuestas).values({ postId: input.postId, cuerpo, autorUsuario: s.u });
  revalidatePath(`/foro/${input.postId}`);
  revalidatePath("/foro");
  return { ok: true };
}

export async function editarRespuesta(input: {
  id: string;
  cuerpo: string;
}): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [r] = await db.select().from(respuestas).where(eq(respuestas.id, input.id)).limit(1);
  if (!r) return { ok: false, error: "La respuesta ya no existe." };
  if (r.autorUsuario !== s.u)
    return { ok: false, error: "Solo el autor puede editar esta respuesta." };

  const cuerpo = limpio(input.cuerpo);
  if (!cuerpo) return { ok: false, error: "La respuesta no puede quedar vacía." };
  if (cuerpo.length > CUERPO_MAX)
    return { ok: false, error: "La respuesta supera el largo permitido." };

  await db
    .update(respuestas)
    .set({ cuerpo, actualizadoEn: new Date() })
    .where(eq(respuestas.id, input.id));
  revalidatePath(`/foro/${r.postId}`);
  return { ok: true };
}

export async function eliminarRespuesta(id: string): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [r] = await db.select().from(respuestas).where(eq(respuestas.id, id)).limit(1);
  if (!r) return { ok: true };
  const esCoordinador = s.r === "admin";
  if (r.autorUsuario !== s.u && !esCoordinador)
    return { ok: false, error: "No puedes eliminar esta respuesta." };

  await db.delete(respuestas).where(eq(respuestas.id, id));
  revalidatePath(`/foro/${r.postId}`);
  return { ok: true };
}

// ── Reacciones (me gusta, toggle) ──

export async function alternarReaccionPost(postId: string): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [ya] = await db
    .select({ id: reaccionesPost.id })
    .from(reaccionesPost)
    .where(and(eq(reaccionesPost.postId, postId), eq(reaccionesPost.autorUsuario, s.u)))
    .limit(1);
  if (ya) {
    await db.delete(reaccionesPost).where(eq(reaccionesPost.id, ya.id));
  } else {
    await db.insert(reaccionesPost).values({ postId, autorUsuario: s.u });
  }
  revalidatePath("/foro");
  revalidatePath(`/foro/${postId}`);
  return { ok: true };
}

export async function alternarReaccionRespuesta(input: {
  respuestaId: string;
  postId: string;
}): Promise<Resultado> {
  const s = await sesionActual();
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };
  if (!db) return { ok: false, error: "El foro no está disponible por ahora." };

  const [ya] = await db
    .select({ id: reaccionesRespuesta.id })
    .from(reaccionesRespuesta)
    .where(
      and(
        eq(reaccionesRespuesta.respuestaId, input.respuestaId),
        eq(reaccionesRespuesta.autorUsuario, s.u)
      )
    )
    .limit(1);
  if (ya) {
    await db.delete(reaccionesRespuesta).where(eq(reaccionesRespuesta.id, ya.id));
  } else {
    await db
      .insert(reaccionesRespuesta)
      .values({ respuestaId: input.respuestaId, autorUsuario: s.u });
  }
  revalidatePath(`/foro/${input.postId}`);
  return { ok: true };
}
