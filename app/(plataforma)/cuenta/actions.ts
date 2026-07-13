"use server";

import { cookies } from "next/headers";
import { USERS } from "@/data/users";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/password";
import { getHashOverride, setHashOverride } from "@/lib/credenciales";

export type Resultado = { ok: true } | { ok: false; error: string };

const MIN = 8;
const MAX = 200;

// Cambia la contraseña del usuario autenticado. Verifica la actual contra el
// hash vigente (override de Neon o el estático de data/users.ts) y guarda el
// nuevo hash en Neon. Nunca se maneja ni registra la contraseña en texto plano.
export async function cambiarContrasena(input: {
  actual: string;
  nueva: string;
}): Promise<Resultado> {
  const store = await cookies();
  const s = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!s) return { ok: false, error: "Tu sesión expiró. Vuelve a ingresar." };

  const user = USERS.find((u) => u.usuario === s.u);
  if (!user) return { ok: false, error: "No encontramos tu cuenta." };

  const actual = typeof input.actual === "string" ? input.actual : "";
  const nueva = typeof input.nueva === "string" ? input.nueva : "";

  const hashVigente = (await getHashOverride(user.usuario)) ?? user.hash;
  const correcta = await verifyPassword(actual, hashVigente);
  if (!correcta)
    return { ok: false, error: "La contraseña actual no es correcta." };

  if (nueva.length < MIN)
    return {
      ok: false,
      error: `La nueva contraseña debe tener al menos ${MIN} caracteres.`,
    };
  if (nueva.length > MAX)
    return { ok: false, error: "La nueva contraseña es demasiado larga." };
  if (nueva === actual)
    return {
      ok: false,
      error: "La nueva contraseña debe ser distinta de la actual.",
    };

  const hash = await hashPassword(nueva);
  const guardado = await setHashOverride(user.usuario, hash);
  if (!guardado)
    return {
      ok: false,
      error: "No pudimos guardar el cambio ahora. Intenta más tarde.",
    };

  return { ok: true };
}
