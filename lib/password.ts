// Hash y verificación de contraseñas con PBKDF2-SHA256 (Web Crypto).
// Funciona en Node (route handlers) y Edge. El repo guarda SOLO el hash con
// su sal, nunca la contraseña en texto plano.
//
// Formato almacenado: pbkdf2$<iteraciones>$<sal_b64url>$<hash_b64url>

const ITERACIONES = 120_000;
const LARGO_BYTES = 32;

function bytesAB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlABytes(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function derivar(
  password: string,
  sal: Uint8Array,
  iteraciones: number
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: sal as BufferSource,
      iterations: iteraciones,
      hash: "SHA-256",
    },
    key,
    LARGO_BYTES * 8
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const sal = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivar(password, sal, ITERACIONES);
  return `pbkdf2$${ITERACIONES}$${bytesAB64url(sal)}$${bytesAB64url(hash)}`;
}

export async function verifyPassword(
  password: string,
  almacenado: string
): Promise<boolean> {
  const partes = almacenado.split("$");
  if (partes.length !== 4 || partes[0] !== "pbkdf2") return false;
  const iteraciones = Number(partes[1]);
  if (!Number.isFinite(iteraciones) || iteraciones < 1) return false;
  const sal = b64urlABytes(partes[2]);
  const esperado = b64urlABytes(partes[3]);
  const actual = await derivar(password, sal, iteraciones);
  // Comparación en tiempo constante
  if (actual.length !== esperado.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ esperado[i];
  return diff === 0;
}
