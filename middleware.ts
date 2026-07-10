import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESION, verificarToken } from "@/lib/session";

// Protege toda la plataforma: sin sesión válida → /login.
// /resultados y /adopcion exigen rol admin (además de que la nav los oculta).
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_SESION)?.value;
  const sesion = await verificarToken(token);

  if (pathname === "/login") {
    if (sesion) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!sesion) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  const soloAdmin =
    pathname.startsWith("/resultados") || pathname.startsWith("/adopcion");
  if (soloAdmin && sesion.r !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Excluye estáticos, logos y los endpoints de auth.
  matcher: [
    "/((?!api/auth|_next/static|_next/image|logos|registros|favicon.ico|robots.txt).*)",
  ],
};
