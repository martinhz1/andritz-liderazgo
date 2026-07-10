"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { crearPost, editarPost } from "@/app/(plataforma)/foro/actions";
import type { TipoPost } from "@/lib/foro";
import { cn } from "@/lib/utils";

const TIPOS_BASE: { valor: TipoPost; label: string }[] = [
  { valor: "discusion", label: "Discusión" },
  { valor: "pregunta", label: "Pregunta" },
];

const INPUT =
  "w-full rounded-lg border border-borde bg-superficie-alta px-3.5 py-2.5 text-sm text-ink outline-none transition-shadow focus:border-andritz focus:ring-2 focus:ring-andritz/15";

export function CompositorPost({
  trigger,
  esCoordinador,
  modo = "crear",
  postInicial,
}: {
  trigger: React.ReactNode;
  esCoordinador: boolean;
  modo?: "crear" | "editar";
  postInicial?: { id: string; titulo: string; cuerpo: string };
}) {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<TipoPost>("discusion");
  const [titulo, setTitulo] = useState(postInicial?.titulo ?? "");
  const [cuerpo, setCuerpo] = useState(postInicial?.cuerpo ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const tipos = esCoordinador
    ? [...TIPOS_BASE, { valor: "anuncio" as TipoPost, label: "Anuncio" }]
    : TIPOS_BASE;

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    start(async () => {
      const r =
        modo === "crear"
          ? await crearPost({ tipo, titulo, cuerpo })
          : await editarPost({ id: postInicial!.id, titulo, cuerpo });
      if (r && r.ok === false) {
        setError(r.error);
      } else if (modo === "editar") {
        setOpen(false);
      }
      // en "crear" la acción redirige al detalle (no hay retorno)
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[min(92vw,560px)] rounded-2xl p-6">
        <DialogTitle className="font-display text-xl font-bold tracking-tight">
          {modo === "crear" ? "Nueva publicación" : "Editar publicación"}
        </DialogTitle>

        <form onSubmit={enviar} className="mt-4 space-y-4">
          {modo === "crear" && (
            <div className="flex flex-wrap gap-2">
              {tipos.map((t) => (
                <button
                  key={t.valor}
                  type="button"
                  onClick={() => setTipo(t.valor)}
                  aria-pressed={tipo === t.valor}
                  className={cn(
                    "rounded-md border px-3 py-1.5 font-mono text-xs font-medium transition-colors",
                    tipo === t.valor
                      ? "border-andritz bg-andritz text-white"
                      : "border-borde bg-superficie-alta text-ink-suave hover:border-andritz hover:text-acento"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <div>
            <label htmlFor="post-titulo" className="sr-only">
              Título
            </label>
            <input
              id="post-titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título"
              maxLength={140}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="post-cuerpo" className="sr-only">
              Contenido
            </label>
            <textarea
              id="post-cuerpo"
              value={cuerpo}
              onChange={(e) => setCuerpo(e.target.value)}
              placeholder="Escribe tu publicación…"
              rows={6}
              maxLength={5000}
              className={cn(INPUT, "resize-y")}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-magenta-ad/30 bg-magenta-ad/5 px-3 py-2 text-sm text-magenta-ad"
            >
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-borde bg-superficie-alta px-4 py-2.5 text-sm font-medium text-ink-suave transition-colors hover:border-andritz hover:text-acento"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-andritz px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro disabled:opacity-60"
            >
              {pending
                ? "Guardando…"
                : modo === "crear"
                  ? "Publicar"
                  : "Guardar cambios"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
