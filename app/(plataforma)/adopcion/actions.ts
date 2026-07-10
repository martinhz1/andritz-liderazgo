"use server";

import { cookies } from "next/headers";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { registrarEvento } from "@/lib/metricas";

/** Registra una visita a una ruta (analítica de adopción). Best-effort. */
export async function registrarVista(ruta: string) {
  const store = await cookies();
  const sesion = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!sesion) return;
  await registrarEvento(sesion.u, "vista", ruta);
}
