import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Modulo, Sesion } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Elemento signature de la plataforma: la Ruta A → B.
// Un problema es la brecha entre el estado A (realidad) y el
// estado B (aspiración); los 5 módulos son el trayecto que la
// cierra. El componente codifica el estado real del programa:
// no es decoración.
//
// tono: "claro" (default) sobre fondo blanco/hueso;
//       "oscuro" sobre el hero tinta (#0C2A3E).
// ─────────────────────────────────────────────────────────────

type Tono = "claro" | "oscuro";

interface Props {
  modulos: Modulo[];
  sesiones: Sesion[];
  tono?: Tono;
  className?: string;
}

type EstadoNodo = "realizada" | "proxima" | "programada";

function estadoDelModulo(moduloId: string, sesiones: Sesion[]): EstadoNodo {
  const s = sesiones.find((x) => x.moduloId === moduloId);
  return s?.estado ?? "programada";
}

export function RutaAB({ modulos, sesiones, tono = "claro", className }: Props) {
  const oscuro = tono === "oscuro";

  const nodos = modulos.map((m) => ({
    modulo: m,
    estado: estadoDelModulo(m.id, sesiones),
    sesion: sesiones.find((s) => s.moduloId === m.id),
  }));

  const realizados = nodos.filter((n) => n.estado === "realizada").length;
  // Progreso del trazo lleno: hasta el nodo próximo (medio paso más allá del último realizado)
  const progreso =
    realizados >= nodos.length
      ? 100
      : ((realizados + 0.5) / nodos.length) * 100;

  const tituloNodo = (estado: EstadoNodo) =>
    cn(
      "font-display font-semibold leading-snug",
      oscuro
        ? estado === "programada"
          ? "text-white/70"
          : "text-white"
        : estado === "programada"
          ? "text-tinta-suave"
          : "text-tinta"
    );

  const metaNodo = oscuro ? "text-white/60" : "text-tinta-suave";
  const acento = oscuro ? "text-andritz-claro" : "text-andritz";

  return (
    <div
      className={cn("w-full", className)}
      aria-label="Ruta del programa, del estado A al estado B"
    >
      {/* ── Desktop / tablet: horizontal ── */}
      <div className="hidden md:block">
        <div className="flex items-end justify-between pb-6">
          <p className={cn("eyebrow", oscuro ? "text-white/55" : "text-tinta-suave")}>
            A · Dónde estamos
          </p>
          <p className={cn("eyebrow", acento)}>B · La gran oportunidad</p>
        </div>

        <div className="relative">
          {/* línea base */}
          <div
            className={cn(
              "absolute left-[22px] right-[24px] top-[21px] h-[2px]",
              oscuro ? "bg-white/[0.18]" : "bg-linea"
            )}
            aria-hidden
          />
          {/* trazo recorrido */}
          <div
            className={cn(
              "ruta-trazo absolute left-[22px] top-[21px] h-[2px]",
              oscuro
                ? "bg-andritz-claro shadow-[0_0_12px_rgba(95,180,228,0.7)]"
                : "bg-andritz"
            )}
            style={{ width: `${progreso}%` }}
            aria-hidden
          />
          {/* flecha hacia B */}
          <div
            className={cn(
              "absolute right-[16px] top-[16px] h-3 w-3 rotate-45 border-r-2 border-t-2",
              oscuro ? "border-white/30" : "border-linea"
            )}
            aria-hidden
          />

          <ol className="relative grid grid-cols-5 gap-2">
            {nodos.map(({ modulo, estado, sesion }) => (
              <li key={modulo.id} className="flex flex-col items-start gap-4">
                <Nodo estado={estado} numero={modulo.numero} tono={tono} />
                <div>
                  <p className={cn("font-mono text-xs font-medium tracking-wide", metaNodo)}>
                    {String(modulo.numero).padStart(2, "0")}
                    {estado === "realizada" && " · realizada"}
                    {estado === "proxima" && (
                      <span className={acento}>
                        {" · "}
                        {sesion && sesion.fecha !== "Por confirmar"
                          ? sesion.fecha
                          : "próxima"}
                      </span>
                    )}
                  </p>
                  <p className={cn("mt-1 text-[15px]", tituloNodo(estado))}>
                    {modulo.titulo}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Mobile: vertical ── */}
      <div className="md:hidden">
        <p className={cn("eyebrow mb-4", oscuro ? "text-white/55" : "text-tinta-suave")}>
          A · Dónde estamos
        </p>
        <ol
          className={cn(
            "relative ml-[21px] border-l-2",
            oscuro ? "border-white/20" : "border-linea"
          )}
        >
          {nodos.map(({ modulo, estado, sesion }) => (
            <li key={modulo.id} className="relative mb-7 pl-7 last:mb-0">
              <div className="absolute -left-[23px] top-0">
                <Nodo estado={estado} numero={modulo.numero} tono={tono} />
              </div>
              <p className={cn("font-mono text-xs font-medium tracking-wide", metaNodo)}>
                {String(modulo.numero).padStart(2, "0")}
                {estado === "realizada" && " · realizada"}
                {estado === "proxima" && (
                  <span className={acento}>
                    {" · "}
                    {sesion && sesion.fecha !== "Por confirmar"
                      ? sesion.fecha
                      : "próxima"}
                  </span>
                )}
              </p>
              <p className={cn("mt-0.5 text-base", tituloNodo(estado))}>
                {modulo.titulo}
              </p>
            </li>
          ))}
        </ol>
        <p className={cn("eyebrow mt-4", acento)}>B · La gran oportunidad</p>
      </div>
    </div>
  );
}

function Nodo({
  estado,
  numero,
  tono,
}: {
  estado: EstadoNodo;
  numero: number;
  tono: Tono;
}) {
  const oscuro = tono === "oscuro";
  const base = "relative z-[1] flex h-11 w-11 items-center justify-center rounded-full";

  if (estado === "realizada") {
    return (
      <span
        className={cn(base, "bg-andritz shadow-[0_8px_20px_-4px_rgba(0,108,175,0.8)]")}
        title={`Módulo ${numero}: realizado`}
      >
        <Check className="h-5 w-5 text-white" strokeWidth={3} aria-hidden />
        <span className="sr-only">Módulo {numero} realizado</span>
      </span>
    );
  }
  if (estado === "proxima") {
    return (
      <span
        className={cn(
          base,
          "border-2",
          oscuro
            ? "border-andritz-claro bg-tinta animate-[pulso-nodo_2.6s_ease-in-out_infinite]"
            : "border-andritz bg-white animate-[pulso-nodo-claro_2.6s_ease-in-out_infinite]"
        )}
        title={`Módulo ${numero}: próxima sesión`}
      >
        <span
          className={cn(
            "h-3.5 w-3.5 rounded-full",
            oscuro ? "bg-andritz-claro" : "bg-andritz"
          )}
          aria-hidden
        />
        <span className="sr-only">Módulo {numero}: próxima sesión</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        base,
        "border-2",
        oscuro ? "border-white/25 bg-transparent" : "border-linea bg-hueso"
      )}
      title={`Módulo ${numero}: programado`}
    >
      <span className="sr-only">Módulo {numero} programado</span>
    </span>
  );
}

/** Versión mínima para páginas de detalle: solo posición en la ruta. */
export function MiniRuta({
  modulos,
  moduloActualId,
}: {
  modulos: Modulo[];
  moduloActualId: string;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-tinta-suave">
        A
      </span>
      {modulos.map((m) => (
        <span
          key={m.id}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            m.id === moduloActualId ? "scale-125 bg-andritz" : "bg-linea"
          )}
        />
      ))}
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-tinta-suave">
        B
      </span>
    </div>
  );
}
