import { NextRequest, NextResponse } from "next/server";
import { USERS } from "@/data/users";
import { COOKIE_SESION, crearToken } from "@/lib/session";
import { verifyPassword } from "@/lib/password";
import { getHashOverride } from "@/lib/credenciales";
import { registrarEvento } from "@/lib/metricas";

export async function POST(req: NextRequest) {
  let body: { usuario?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  const { usuario, password } = body;
  // Normaliza el usuario a forma canónica: minúsculas y punto/espacio/guion
  // bajo → un solo guion. Así "alvaro.lassoportilla", "alvaro-lassoportilla" y
  // "Alvaro Lassoportilla" son equivalentes (la parte antes del @ del correo).
  const usuarioNorm = (usuario ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s._]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
  const user = USERS.find((u) => u.usuario === usuarioNorm);
  // Si el usuario cambió su contraseña, el hash vigente vive en Neon; si no,
  // se usa el hash inicial de data/users.ts.
  let valido = false;
  if (user) {
    const hashVigente = (await getHashOverride(user.usuario)) ?? user.hash;
    valido = await verifyPassword(password ?? "", hashVigente);
  }

  if (!user || !valido) {
    return NextResponse.json(
      { ok: false, error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  }

  await registrarEvento(user.usuario, "login");

  const token = await crearToken(user.usuario, user.nombre, user.rol);
  const res = NextResponse.json({ ok: true, rol: user.rol });
  res.cookies.set(COOKIE_SESION, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
