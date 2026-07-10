"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import { eliminarPost, fijarPost } from "@/app/(plataforma)/foro/actions";
import { CompositorPost } from "./compositor-post";

const BTN =
  "rounded-md p-1.5 text-ink-suave transition-colors hover:bg-superficie-suave hover:text-ink disabled:opacity-50";

export function AccionesPost({
  post,
  esAutor,
  esCoordinador,
  enDetalle,
}: {
  post: { id: string; titulo: string; cuerpo: string; fijado: boolean };
  esAutor: boolean;
  esCoordinador: boolean;
  enDetalle?: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  if (!esAutor && !esCoordinador) return null;

  function alternarFijado() {
    start(async () => {
      await fijarPost(post.id, !post.fijado);
    });
  }

  function eliminar() {
    if (!confirm("¿Eliminar esta publicación? No se puede deshacer.")) return;
    start(async () => {
      const r = await eliminarPost(post.id);
      if (r.ok && enDetalle) router.push("/foro");
    });
  }

  return (
    <div className="flex flex-none items-center gap-0.5">
      {esCoordinador && (
        <button
          type="button"
          onClick={alternarFijado}
          disabled={pending}
          aria-label={post.fijado ? "Desfijar" : "Fijar"}
          title={post.fijado ? "Desfijar" : "Fijar arriba"}
          className={BTN}
        >
          {post.fijado ? (
            <PinOff className="h-4 w-4" aria-hidden />
          ) : (
            <Pin className="h-4 w-4" aria-hidden />
          )}
        </button>
      )}
      {esAutor && (
        <CompositorPost
          esCoordinador={esCoordinador}
          modo="editar"
          postInicial={{ id: post.id, titulo: post.titulo, cuerpo: post.cuerpo }}
          trigger={
            <button type="button" aria-label="Editar" title="Editar" className={BTN}>
              <Pencil className="h-4 w-4" aria-hidden />
            </button>
          }
        />
      )}
      {(esAutor || esCoordinador) && (
        <button
          type="button"
          onClick={eliminar}
          disabled={pending}
          aria-label="Eliminar"
          title="Eliminar"
          className={BTN}
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
