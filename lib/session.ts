// Sesión de prototipo: cookie httpOnly con payload firmado HMAC-SHA256.
// Usa Web Crypto (crypto.subtle) para funcionar tanto en el runtime Edge
// (middleware) como en Node (route handlers). NO usa localStorage.
import type { Rol, Sesion_Auth } from "@/lib/types";

export const COOKIE_SESION = "sesion_academia";
const DURACION_MS = 1000 * 60 * 60 * 8; // 8 horas

function getSecret(): string {
  // TODO producción: definir SESSION_SECRET en Vercel y eliminar el fallback.
  return process.env.SESSION_SECRET ?? "dev-secret-academia-andritz-adapsys";
}

function bytesToB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function strToB64url(str: string): string {
  return bytesToB64url(new TextEncoder().encode(str));
}

function b64urlToStr(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return bytesToB64url(new Uint8Array(sig));
}

export async function crearToken(
  usuario: string,
  nombre: string,
  rol: Rol
): Promise<string> {
  const payload: Sesion_Auth = {
    u: usuario,
    n: nombre,
    r: rol,
    exp: Date.now() + DURACION_MS,
  };
  const cuerpo = strToB64url(JSON.stringify(payload));
  const firma = await hmac(cuerpo);
  return `${cuerpo}.${firma}`;
}

export async function verificarToken(
  token: string | undefined
): Promise<Sesion_Auth | null> {
  if (!token) return null;
  const partes = token.split(".");
  if (partes.length !== 2) return null;
  const [cuerpo, firma] = partes;
  try {
    const esperada = await hmac(cuerpo);
    if (firma !== esperada) return null;
    const payload = JSON.parse(b64urlToStr(cuerpo)) as Sesion_Auth;
    if (typeof payload.exp !== "number" || payload.exp < Date.now())
      return null;
    if (payload.r !== "admin" && payload.r !== "participante") return null;
    return payload;
  } catch {
    return null;
  }
}
