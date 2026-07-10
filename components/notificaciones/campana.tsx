"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { marcarTodoLeido } from "@/app/(plataforma)/notificaciones/actions";
import { tiempoRelativo } from "@/lib/utils";
import type { Notificaciones } from "@/lib/notificaciones";

export function Campana({ notificaciones }: { notificaciones: Notificaciones }) {
  const [abierta, setAbierta] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();
  const { total, foro, repositorio } = notificaciones;

  useEffect(() => {
    if (!abierta) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [abierta]);

  function marcarLeido() {
    start(async () => {
      await marcarTodoLeido();
      router.refresh();
      setAbierta(false);
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierta((o) => !o)}
        aria-label={total ? `Notificaciones: ${total} sin leer` : "Notificaciones"}
        aria-expanded={abierta}
        className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-borde bg-superficie-alta text-ink-suave transition-colors hover:border-andritz hover:text-acento"
      >
        <Bell className="h-4 w-4" aria-hidden />
        {total > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-andritz px-1 font-mono text-[10px] font-semibold text-white">
            {total > 9 ? "9+" : total}
          </span>
        )}
      </button>

      {abierta && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setAbierta(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="dialog"
            aria-label="Notificaciones"
            className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] rounded-2xl border border-borde bg-superficie-alta p-2 shadow-[0_24px_60px_-30px_rgba(12,42,62,0.6)]"
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="eyebrow text-ink-suave">Notificaciones</p>
              {total > 0 && (
                <button
                  type="button"
                  onClick={marcarLeido}
                  disabled={pending}
                  className="font-mono text-[11px] text-acento transition-colors hover:text-andritz-oscuro disabled:opacity-60"
                >
                  Marcar todo como leído
                </button>
              )}
            </div>

            {total === 0 ? (
              <p className="px-2 py-8 text-center text-sm text-ink-suave">
                Estás al día.
              </p>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto">
                {foro.length > 0 && (
                  <Grupo titulo="Foro">
                    {foro.map((n, i) => (
                      <ItemLink
                        key={`f-${i}`}
                        href={`/foro/${n.postId}`}
                        onNavegar={() => setAbierta(false)}
                        principal={
                          n.clase === "post"
                            ? n.titulo
                            : `Respuesta en «${n.titulo}»`
                        }
                        meta={`${n.autorNombre} · ${tiempoRelativo(n.fecha)}`}
                      />
                    ))}
                  </Grupo>
                )}
                {repositorio.length > 0 && (
                  <Grupo titulo="Repositorio">
                    {repositorio.map((n) => (
                      <ItemLink
                        key={n.slug}
                        href={`/repositorio/${n.slug}`}
                        onNavegar={() => setAbierta(false)}
                        principal={n.titulo}
                        meta={`Material nuevo · ${tiempoRelativo(n.fecha)}`}
                      />
                    ))}
                  </Grupo>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-1">
      <p className="px-2 pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-suave/70">
        {titulo}
      </p>
      <ul>{children}</ul>
    </div>
  );
}

function ItemLink({
  href,
  principal,
  meta,
  onNavegar,
}: {
  href: string;
  principal: string;
  meta: string;
  onNavegar: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavegar}
        className="block rounded-lg px-2 py-2 transition-colors hover:bg-superficie-suave"
      >
        <p className="line-clamp-1 text-sm font-medium text-ink">{principal}</p>
        <p className="mt-0.5 font-mono text-[11px] text-ink-suave">{meta}</p>
      </Link>
    </li>
  );
}
