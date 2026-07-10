import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pin } from "lucide-react";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { getPost } from "@/lib/foro";
import { Autor } from "@/components/foro/autor";
import { TipoBadge } from "@/components/foro/tipo-badge";
import { AccionesPost } from "@/components/foro/acciones-post";
import { BotonReaccion } from "@/components/foro/boton-reaccion";
import { CompositorRespuesta } from "@/components/foro/compositor-respuesta";
import { RespuestaItem } from "@/components/foro/respuesta-item";
import { MarcarVista } from "@/components/notificaciones/marcar-vista";

export const metadata = { title: "Publicación · Foro · Academia de Liderazgo Andritz" };

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = await cookies();
  const sesion = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!sesion) redirect("/login");

  const esCoordinador = sesion.r === "admin";
  const post = await getPost(id, sesion.u);
  if (!post) notFound();

  const esAutorPost = sesion.u === post.autor.usuario;
  const n = post.respuestas.length;

  return (
    <div className="mx-auto max-w-3xl">
      <MarcarVista fuente="foro" />
      <Link
        href="/foro"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-tinta-suave transition-colors hover:text-andritz"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Volver al foro
      </Link>

      <article className="mt-4 rounded-2xl border border-linea bg-white p-6 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <TipoBadge tipo={post.tipo} />
            {post.fijado && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-andritz">
                <Pin className="h-3 w-3" aria-hidden />
                Fijado
              </span>
            )}
          </div>
          <AccionesPost
            post={{
              id: post.id,
              titulo: post.titulo,
              cuerpo: post.cuerpo,
              fijado: post.fijado,
            }}
            esAutor={esAutorPost}
            esCoordinador={esCoordinador}
            enDetalle
          />
        </div>

        <div className="mt-3">
          <Autor autor={post.autor} fecha={post.creadoEn} editado={!!post.actualizadoEn} />
        </div>

        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          {post.titulo}
        </h1>
        <p className="mt-3 whitespace-pre-wrap leading-relaxed text-tinta">
          {post.cuerpo}
        </p>

        <div className="mt-5">
          <BotonReaccion
            objetivo={{ tipo: "post", postId: post.id }}
            n={post.nReacciones}
            activo={post.yaReacciono}
          />
        </div>
      </article>

      <section className="mt-6" aria-label="Respuestas">
        <h2 className="font-display text-lg font-bold tracking-tight">
          {n} {n === 1 ? "respuesta" : "respuestas"}
        </h2>

        <div className="mt-4 rounded-2xl border border-linea bg-white p-5">
          <CompositorRespuesta postId={post.id} />
        </div>

        {n > 0 && (
          <ul className="mt-4 rounded-2xl border border-linea bg-white px-5">
            {post.respuestas.map((r) => (
              <RespuestaItem
                key={r.id}
                respuesta={r}
                postId={post.id}
                esAutor={sesion.u === r.autor.usuario}
                esCoordinador={esCoordinador}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
