import Link from "next/link";
import { MessageSquare, Pin } from "lucide-react";
import { Autor } from "./autor";
import { TipoBadge } from "./tipo-badge";
import { AccionesPost } from "./acciones-post";
import { BotonReaccion } from "./boton-reaccion";
import type { PostResumen } from "@/lib/foro";
import { cn } from "@/lib/utils";

export function TarjetaPost({
  post,
  viewer,
}: {
  post: PostResumen;
  viewer: { usuario: string; esCoordinador: boolean };
}) {
  const esAutor = viewer.usuario === post.autor.usuario;

  return (
    <article
      className={cn(
        "rounded-2xl border bg-superficie-alta p-5 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]",
        post.fijado ? "border-andritz/40" : "border-borde"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <TipoBadge tipo={post.tipo} />
          {post.fijado && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-acento">
              <Pin className="h-3 w-3" aria-hidden />
              Fijado
            </span>
          )}
        </div>
        <AccionesPost
          post={{ id: post.id, titulo: post.titulo, cuerpo: post.cuerpo, fijado: post.fijado }}
          esAutor={esAutor}
          esCoordinador={viewer.esCoordinador}
        />
      </div>

      <div className="mt-3">
        <Autor autor={post.autor} fecha={post.creadoEn} editado={!!post.actualizadoEn} />
      </div>

      <Link href={`/foro/${post.id}`} className="group mt-3 block">
        <h2 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-acento">
          {post.titulo}
        </h2>
      </Link>
      <p className="mt-1.5 line-clamp-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-suave">
        {post.cuerpo}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <BotonReaccion
          objetivo={{ tipo: "post", postId: post.id }}
          n={post.nReacciones}
          activo={post.yaReacciono}
        />
        <Link
          href={`/foro/${post.id}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-borde px-2.5 py-1 font-mono text-xs text-ink-suave transition-colors hover:border-andritz hover:text-acento"
        >
          <MessageSquare className="h-3.5 w-3.5" aria-hidden />
          {post.nRespuestas} {post.nRespuestas === 1 ? "respuesta" : "respuestas"}
        </Link>
      </div>
    </article>
  );
}
