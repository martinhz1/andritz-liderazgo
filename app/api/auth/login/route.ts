import { NextRequest, NextResponse } from "next/server";
import { USERS } from "@/data/users";
import { COOKIE_SESION, crearToken } from "@/lib/session";

export async function POST(req: NextRequest) {
  let body: { usuario?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  const { usuario, password } = body;
  const user = USERS.find(
    (u) => u.usuario === usuario?.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  }

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
