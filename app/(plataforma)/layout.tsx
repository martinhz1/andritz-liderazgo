import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { getNotificaciones } from "@/lib/notificaciones";
import { RegistrarActividad } from "@/components/actividad/registrar-actividad";

export default async function PlataformaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defensa en profundidad: el middleware ya protege, pero el layout
  // vuelve a verificar la sesión server-side.
  const cookieStore = await cookies();
  const sesion = await verificarToken(cookieStore.get(COOKIE_SESION)?.value);
  if (!sesion) redirect("/login");

  const notificaciones = await getNotificaciones(sesion.u);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <RegistrarActividad />
      <Nav nombre={sesion.n} rol={sesion.r} notificaciones={notificaciones} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
