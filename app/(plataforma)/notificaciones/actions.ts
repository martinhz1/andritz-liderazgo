"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { vistasSeccion } from "@/db/schema";
import { COOKIE_SESION, verificarToken } from "@/lib/session";

async function usuarioActual(): Promise<string | null> {
  const store = await cookies();
  const s = await verificarToken(store.get(COOKIE_SESION)?.value);
  return s?.u ?? null;
}

/** Marca una sección como vista (ahora) para el usuario actual. */
export async function marcarSeccionVista(fuente: "foro" | "repositorio") {
  const usuario = await usuarioActual();
  if (!usuario || !db) return;
  const set =
    fuente === "foro" ? { foroVistoEn: new Date() } : { repoVistoEn: new Date() };
  await db
    .insert(vistasSeccion)
    .values({ usuario, ...set })
    .onConflictDoUpdate({ target: vistasSeccion.usuario, set });
  revalidatePath("/", "layout");
}

/** Marca todo como leído (ambas secciones). */
export async function marcarTodoLeido() {
  const usuario = await usuarioActual();
  if (!usuario || !db) return;
  const ahora = new Date();
  const set = { foroVistoEn: ahora, repoVistoEn: ahora };
  await db
    .insert(vistasSeccion)
    .values({ usuario, ...set })
    .onConflictDoUpdate({ target: vistasSeccion.usuario, set });
  revalidatePath("/", "layout");
}
