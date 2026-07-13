import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { credenciales } from "@/db/schema";

// Hash de contraseña vigente para un usuario, si lo cambió alguna vez. El login
// usa esto por sobre el hash estático de data/users.ts. Si no hay DB o no hay
// override, devuelve null (se cae al hash estático).
export async function getHashOverride(usuario: string): Promise<string | null> {
  if (!db) return null;
  try {
    const [fila] = await db
      .select({ hash: credenciales.hash })
      .from(credenciales)
      .where(eq(credenciales.usuario, usuario))
      .limit(1);
    return fila?.hash ?? null;
  } catch {
    // Ante cualquier problema de DB, el login sigue con el hash estático.
    return null;
  }
}

// Guarda (o reemplaza) el hash de un usuario. Upsert por clave primaria.
export async function setHashOverride(
  usuario: string,
  hash: string
): Promise<boolean> {
  if (!db) return false;
  await db
    .insert(credenciales)
    .values({ usuario, hash })
    .onConflictDoUpdate({
      target: credenciales.usuario,
      set: { hash, actualizadoEn: new Date() },
    });
  return true;
}
