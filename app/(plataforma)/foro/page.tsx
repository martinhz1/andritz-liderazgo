import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { getPosts } from "@/lib/foro";
import { CompositorPost } from "@/components/foro/compositor-post";
import { TarjetaPost } from "@/components/foro/tarjeta-post";
import { MarcarVista } from "@/components/notificaciones/marcar-vista";

export const metadata = { title: "Foro · Academia de Liderazgo Andritz" };

export default async function ForoPage() {
  const store = await cookies();
  const sesion = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!sesion) redirect("/login");

  const esCoordinador = sesion.r === "admin";
  const posts = await getPosts(sesion.u);

  return (
    <div className="mx-auto max-w-3xl">
      <MarcarVista fuente="foro" />
      <div className="flex flex-wrap items-end justify-between gap-4 animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.04s_both]">
        <div>
          <p className="eyebrow text-andritz">Foro</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
            Conversación del programa
          </h1>
          <p className="mt-3 max-w-xl text-tinta-suave">
            Comparte preguntas, ideas y aprendizajes con el resto del equipo. Los
            coordinadores publican anuncios y recordatorios.
          </p>
        </div>
        <CompositorPost
          esCoordinador={esCoordinador}
          trigger={
            <button
              type="button"
              className="inline-flex flex-none items-center gap-1.5 rounded-lg bg-andritz px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Nueva publicación
            </button>
          }
        />
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-linea bg-white p-12 text-center animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.12s_both]">
          <p className="font-display text-lg font-semibold">
            Todavía no hay publicaciones
          </p>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-tinta-suave">
            Sé el primero en abrir una conversación: una pregunta, una idea o un
            aprendizaje del programa.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {posts.map((p, i) => (
            <li
              key={p.id}
              className="animate-[surgir_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${(0.06 + i * 0.04).toFixed(2)}s` }}
            >
              <TarjetaPost
                post={p}
                viewer={{ usuario: sesion.u, esCoordinador }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
