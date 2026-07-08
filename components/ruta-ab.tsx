import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Modulo, Sesion } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// Elemento signature de la plataforma: la Ruta A → B.
// Un problema es la brecha entre el estado A (realidad) y el
// estado B (aspiración); los 5 módulos son el trayecto que la
// cierra. El componente codifica el estado real del programa:
// no es decoración.
// ─────────────────────────────────────────────────────────────

interface Props {
  modulos: Modulo[];
  sesiones: Sesion[];
  className?: string;
}

type EstadoNodo = "realizada" | "proxima" | "programada";

function estadoDelModulo(moduloId: string, sesiones: Sesion[]): EstadoNodo {
  const s = sesiones.find((x) => x.moduloId === moduloId);
  return s?.estado ?? "programada";
}

export function RutaAB({ modulos, sesiones, className }: Props) {
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

  return (
    <div className={cn("w-full", className)} aria-label="Ruta del programa, del estado A al estado B">
      {/* ── Desktop / tablet: horizontal ── */}
      <div className="hidden md:block">
        <div className="flex items-end justify-between pb-3">
          <p className="eyebrow text-tinta-suave">
            A · Dónde estamos
          </p>
          <p className="eyebrow text-andritz">
            B · La gran oportunidad
          </p>
        </div>

        <div className="relative">
          {/* línea base */}
          <div className="absolute left-0 right-0 top-[13px] h-[2px] bg-linea" aria-hidden />
          {/* trazo recorrido */}
          <div
            className="ruta-trazo absolute left-0 top-[13px] h-[2px] bg-andritz"
            style={{ width: `${progreso}%` }}
            aria-hidden
          />
          {/* flecha hacia B */}
          <div
            className="absolute right-0 top-[8px] h-3 w-3 rotate-45 border-r-2 border-t-2 border-linea"
            aria-hidden
          />

          <ol className="relative grid grid-cols-5 gap-2">
            {nodos.map(({ modulo, estado, sesion }) => (
              <li key={modulo.id} className="flex flex-col items-start gap-2">
                <Nodo estado={estado} numero={modulo.numero} />
                <div>
                  <p className="font-mono text-xs font-medium tracking-wide text-tinta-suave">
                    {String(modulo.numero).padStart(2, "0")}
                    {estado === "realizada" && " · realizada"}
                    {estado === "proxima" && sesion && (
                      <span className="text-andritz"> · {sesion.fecha}</span>
                    )}
                  </p>
                  <p
                    className={cn(
                      "font-display text-sm font-semibold leading-snug",
                      estado === "programada" ? "text-tinta-suave" : "text-tinta"
                    )}
                  >
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
        <p className="eyebrow mb-4 text-tinta-suave">A · Dónde estamos</p>
        <ol className="relative ml-[13px] border-l-2 border-linea">
          {nodos.map(({ modulo, estado, sesion }) => (
            <li key={modulo.id} className="relative mb-6 pl-6 last:mb-0">
              <div className="absolute -left-[14px] top-0">
                <Nodo estado={estado} numero={modulo.numero} />
              </div>
              <p className="font-mono text-xs font-medium tracking-wide text-tinta-suave">
                {String(modulo.numero).padStart(2, "0")}
                {estado === "realizada" && " · realizada"}
                {estado === "proxima" && sesion && (
                  <span className="text-andritz"> · {sesion.fecha}</span>
                )}
              </p>
              <p
                className={cn(
                  "font-display text-base font-semibold",
                  estado === "programada" ? "text-tinta-suave" : "text-tinta"
                )}
              >
                {modulo.titulo}
              </p>
            </li>
          ))}
        </ol>
        <p className="eyebrow mt-4 text-andritz">B · La gran oportunidad</p>
      </div>
    </div>
  );
}

function Nodo({ estado, numero }: { estado: EstadoNodo; numero: number }) {
  if (estado === "realizada") {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-andritz text-white"
        title={`Módulo ${numero}: realizado`}
      >
        <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
        <span className="sr-only">Módulo {numero} realizado</span>
      </span>
    );
  }
  if (estado === "proxima") {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-andritz bg-white"
        title={`Módulo ${numero}: próxima sesión`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-andritz" aria-hidden />
        <span className="sr-only">Módulo {numero}: próxima sesión</span>
      </span>
    );
  }
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-linea bg-hueso"
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
