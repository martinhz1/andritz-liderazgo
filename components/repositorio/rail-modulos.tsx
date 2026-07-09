import Link from "next/link";
import { Check, LayoutGrid } from "lucide-react";
import type { ModuloConEstado } from "@/lib/content";
import type { EstadoSesion } from "@/lib/types";
import { cn } from "@/lib/utils";

// Rail de módulos: navegación + mapa del programa con estado real
// (realizada / próxima / programada). El módulo activo viaja por la URL
// (?modulo=), por lo que estos son links SSR y las URLs son compartibles.

const ESTADO_LABEL: Record<EstadoSesion, string> = {
  realizada: "realizada",
  proxima: "próxima",
  programada: "programada",
};

const CONTADOR =
  "flex-none rounded-full bg-[#eef2f5] px-2 py-0.5 font-mono text-[11px] text-[#6a7f8e]";

export function RailModulos({
  modulos,
  counts,
  total,
  moduloActivo,
  className,
}: {
  modulos: ModuloConEstado[];
  counts: Record<string, number>;
  total: number;
  moduloActivo?: string;
  className?: string;
}) {
  return (
    <aside className={cn("md:sticky md:top-28", className)}>
      <div className="rounded-2xl border border-linea bg-white p-4 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]">
        <p className="eyebrow px-2 pb-3 pt-1.5 text-tinta-suave">Ruta del programa</p>

        {/* Todo el material */}
        <Link
          href="/repositorio"
          aria-current={!moduloActivo ? "page" : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-[9px] px-2.5 py-2.5 transition-colors",
            !moduloActivo
              ? "bg-[#eef4f8] text-andritz"
              : "bg-transparent text-tinta hover:bg-[#f0f5f9]"
          )}
        >
          <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg bg-[#eef4f8] text-andritz">
            <LayoutGrid className="h-4 w-4" strokeWidth={1.9} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 font-display text-sm font-semibold">
            Todo el material
          </span>
          <span className={CONTADOR}>{total}</span>
        </Link>

        <div className="mx-1.5 my-2.5 h-px bg-[#e7edf1]" />

        <ul className="flex flex-col gap-0.5">
          {modulos.map((m) => {
            const activo = moduloActivo === m.id;
            const count = counts[m.id] ?? 0;
            const programada = m.estado === "programada";
            return (
              <li key={m.id}>
                <Link
                  href={`/repositorio?modulo=${m.id}`}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 transition-colors",
                    activo ? "bg-[#eef4f8]" : "bg-transparent hover:bg-[#f0f5f9]"
                  )}
                >
                  <DotEstado estado={m.estado} />
                  <span className="flex min-w-0 flex-1 flex-col gap-px">
                    <span
                      className={cn(
                        "font-mono text-[10.5px] tracking-[0.06em]",
                        activo
                          ? "text-andritz"
                          : programada
                            ? "text-[#8ca0af]"
                            : "text-[#6a7f8e]"
                      )}
                    >
                      {String(m.numero).padStart(2, "0")} · {ESTADO_LABEL[m.estado]}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[13.5px] font-semibold leading-tight",
                        activo
                          ? "text-andritz"
                          : programada
                            ? "text-[#5a6e7c]"
                            : "text-tinta"
                      )}
                    >
                      {m.titulo}
                    </span>
                  </span>
                  {count > 0 && <span className={CONTADOR}>{count}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-1.5 mb-2.5 mt-3 h-px bg-[#e7edf1]" />
        <ul className="flex flex-wrap gap-3 px-2 pb-1.5">
          <LeyendaItem>
            <span className="h-2.5 w-2.5 rounded-full bg-andritz" aria-hidden />
            Realizada
          </LeyendaItem>
          <LeyendaItem>
            <span
              className="h-2.5 w-2.5 rounded-full border-[1.5px] border-andritz"
              aria-hidden
            />
            Próxima
          </LeyendaItem>
          <LeyendaItem>
            <span
              className="h-2.5 w-2.5 rounded-full border-[1.5px] border-[#c4d0d9]"
              aria-hidden
            />
            Programada
          </LeyendaItem>
        </ul>
      </div>
    </aside>
  );
}

function LeyendaItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#6a7f8e]">
      {children}
    </li>
  );
}

function DotEstado({ estado }: { estado: EstadoSesion }) {
  const base = "flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full";
  if (estado === "realizada") {
    return (
      <span
        className={cn(base, "bg-andritz shadow-[0_4px_10px_-3px_rgba(0,108,175,0.7)]")}
        aria-hidden
      >
        <Check className="h-[15px] w-[15px] text-white" strokeWidth={3} />
      </span>
    );
  }
  if (estado === "proxima") {
    return (
      <span
        className={cn(
          base,
          "border-2 border-andritz bg-white animate-[pulso-nodo-claro_2.6s_ease-in-out_infinite]"
        )}
        aria-hidden
      >
        <span className="h-2.5 w-2.5 rounded-full bg-andritz" />
      </span>
    );
  }
  return <span className={cn(base, "border-2 border-[#c4d0d9] bg-hueso")} aria-hidden />;
}
