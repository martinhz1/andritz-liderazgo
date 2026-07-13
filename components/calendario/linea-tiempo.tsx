"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Download,
  FolderOpen,
  ListChecks,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { fechaLarga, type EstadoSesion, type FechaSesion } from "@/lib/types";
import { cn } from "@/lib/utils";

// Preferencia del cliente: el bloque "Agregar a mi calendario" (Google / .ics)
// queda desactivado por ahora. Cambiar a true para habilitarlo.
const AGREGAR_CALENDARIO = false;

export interface SesionVM {
  id: string;
  numero: number;
  titulo: string;
  pregunta: string;
  estado: EstadoSesion;
  fecha: FechaSesion | null;
  horario: string;
  lugar: string;
  direccion?: string;
  materialHref: string;
  tareaHref?: string;
  tareaTitulo?: string;
}

type Filtro = "todas" | "proximas" | "realizadas";

const ESTADO_LABEL: Record<EstadoSesion, string> = {
  realizada: "Realizada",
  proxima: "Próxima sesión",
  programada: "Programada",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function LineaTiempo({ sesiones }: { sesiones: SesionVM[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [detalle, setDetalle] = useState<string | null>(null);

  const nRealizadas = sesiones.filter((s) => s.estado === "realizada").length;
  const nProximas = sesiones.length - nRealizadas;

  const lista =
    filtro === "proximas"
      ? sesiones.filter((s) => s.estado !== "realizada")
      : filtro === "realizadas"
        ? sesiones.filter((s) => s.estado === "realizada")
        : sesiones;

  const sel = sesiones.find((s) => s.id === detalle) ?? null;

  const FILTROS: { valor: Filtro; label: string; count: number }[] = [
    { valor: "todas", label: "Todas", count: sesiones.length },
    { valor: "proximas", label: "Próximas", count: nProximas },
    { valor: "realizadas", label: "Realizadas", count: nRealizadas },
  ];

  return (
    <>
      {/* Filtros */}
      <div className="mt-7 flex items-center gap-2 animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
        <span className="mr-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-suave">
          Ver
        </span>
        {FILTROS.map((f) => {
          const activo = filtro === f.valor;
          return (
            <button
              key={f.valor}
              type="button"
              onClick={() => setFiltro(f.valor)}
              aria-pressed={activo}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-xs font-medium transition-colors",
                activo
                  ? "border-andritz bg-andritz text-white"
                  : "border-borde bg-superficie-alta text-ink-suave hover:border-andritz"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-2 py-px font-mono text-[11px]",
                  activo ? "bg-white/20 text-white" : "bg-superficie-suave text-[#6a7f8e] dark:text-ink-suave"
                )}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Línea de tiempo */}
      <ol className="relative mt-8 pb-12">
        {lista.map((s, i) => {
          const primero = i === 0;
          const ultimo = i === lista.length - 1;
          const unico = lista.length === 1;
          const esProxima = s.estado === "proxima";
          const acento =
            s.estado === "proxima"
              ? "border-andritz"
              : s.estado === "realizada"
                ? "border-teal-ad"
                : "border-borde";

          return (
            <li
              key={s.id}
              className="relative grid grid-cols-[104px_1fr] gap-x-8 pb-6.5 animate-[surgir_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${(0.04 + i * 0.06).toFixed(2)}s` }}
            >
              {/* Conector */}
              {!unico && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[120px] w-[2px] -translate-x-1/2 bg-borde",
                    primero ? "top-[35px] bottom-0" : ultimo ? "top-0 h-[35px]" : "top-0 bottom-0"
                  )}
                />
              )}
              {/* Nodo */}
              <NodoTiempo estado={s.estado} />

              {/* Columna fecha */}
              <div className="pt-4 text-right">
                {s.estado === "realizada" ? (
                  <p className="font-mono text-xs font-medium leading-tight text-teal-ad dark:text-[#5fc7cf]">
                    Sesión
                    <br />
                    realizada
                  </p>
                ) : s.fecha ? (
                  <>
                    <p
                      className={cn(
                        "font-mono text-xs font-medium uppercase tracking-[0.12em]",
                        esProxima ? "text-acento" : "text-[#8ca0af] dark:text-ink-suave/70"
                      )}
                    >
                      {s.fecha.mes}
                    </p>
                    <p
                      className={cn(
                        "font-display text-[38px] font-extrabold leading-none tracking-tight",
                        esProxima ? "text-acento" : "text-ink"
                      )}
                    >
                      {s.fecha.dia}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-[#8ca0af] dark:text-ink-suave/70">
                      {s.fecha.diaSemana} · {s.fecha.anio}
                    </p>
                  </>
                ) : (
                  <p className="font-mono text-xs text-[#8ca0af] dark:text-ink-suave/70">Por confirmar</p>
                )}
              </div>

              {/* Tarjeta */}
              <div
                className={cn(
                  "rounded-2xl border bg-superficie-alta px-6 py-5.5",
                  esProxima
                    ? "border-[#b9d9ee] dark:border-andritz/40 shadow-[0_20px_42px_-26px_rgba(0,108,175,0.5)] [outline:3px_solid_rgba(0,108,175,0.08)]"
                    : "border-borde shadow-[0_12px_30px_-26px_rgba(12,42,62,0.5)]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <BadgeEstado estado={s.estado} />
                  <span className="ml-auto rounded-full border border-borde px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-ink-suave">
                    Módulo {pad(s.numero)}
                  </span>
                </div>

                <h3 className="mt-3.5 font-display text-xl font-bold tracking-tight">
                  {s.titulo}
                </h3>
                <p className={cn("mt-3 border-l-[3px] pl-3.5 text-sm italic leading-relaxed text-ink-suave", acento)}>
                  {s.pregunta}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
                  <Meta icono={Clock}>{s.horario}</Meta>
                  <Meta icono={MapPin}>{s.fecha ? s.lugar : "Por confirmar"}</Meta>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-borde pt-4">
                  <Link
                    href={s.materialHref}
                    className="flex items-center gap-1.5 rounded-md border border-borde px-2.5 py-1.5 font-mono text-[11.5px] font-medium text-acento transition-colors hover:border-andritz hover:bg-superficie-suave"
                  >
                    <FolderOpen className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                    Material
                  </Link>
                  {s.tareaHref && (
                    <Link
                      href={s.tareaHref}
                      className="flex items-center gap-1.5 rounded-md border border-borde px-2.5 py-1.5 font-mono text-[11.5px] font-medium text-acento transition-colors hover:border-andritz hover:bg-superficie-suave"
                    >
                      <ListChecks className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                      Tarea previa
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setDetalle(s.id)}
                    className="ml-auto flex items-center gap-1.5 px-1 py-1.5 font-mono text-[11.5px] font-medium tracking-[0.04em] text-acento transition-colors hover:text-andritz-oscuro"
                  >
                    Ver detalle
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {sel && <PanelDetalle sesion={sel} onCerrar={() => setDetalle(null)} />}
    </>
  );
}

function NodoTiempo({ estado }: { estado: EstadoSesion }) {
  const base =
    "absolute left-[120px] top-[22px] z-[2] flex h-[26px] w-[26px] -translate-x-1/2 items-center justify-center rounded-full";
  if (estado === "realizada") {
    return (
      <span
        aria-hidden
        className={cn(base, "bg-teal-ad shadow-[0_4px_10px_-3px_rgba(0,99,121,0.7)]")}
      >
        <Check className="h-[15px] w-[15px] text-white" strokeWidth={3} />
      </span>
    );
  }
  if (estado === "proxima") {
    return (
      <span
        aria-hidden
        className={cn(
          base,
          "border-2 border-andritz bg-superficie-alta animate-[pulso-nodo-claro_2.6s_ease-in-out_infinite]"
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-andritz" />
      </span>
    );
  }
  return <span aria-hidden className={cn(base, "border-2 border-borde bg-superficie-suave")} />;
}

function BadgeEstado({ estado }: { estado: EstadoSesion }) {
  const estilo: Record<EstadoSesion, string> = {
    proxima: "text-acento bg-[#eaf3fa] dark:bg-andritz/15 border-[#b9d9ee] dark:border-andritz/40",
    realizada: "text-teal-ad dark:text-[#5fc7cf] bg-[#f0f8f8] dark:bg-teal-ad/15 border-[#b9dee0] dark:border-teal-ad/40",
    programada: "text-[#6a7f8e] dark:text-ink-suave bg-superficie-suave border-borde",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em]",
        estilo[estado]
      )}
    >
      {ESTADO_LABEL[estado]}
    </span>
  );
}

function Meta({
  icono: Icono,
  children,
}: {
  icono: typeof Clock;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 font-mono text-xs text-ink-suave">
      <Icono className="h-[15px] w-[15px] text-acento" strokeWidth={1.9} aria-hidden />
      {children}
    </span>
  );
}

// ── Panel de detalle (slide-over) ──
function PanelDetalle({
  sesion: s,
  onCerrar,
}: {
  sesion: SesionVM;
  onCerrar: () => void;
}) {
  return (
    <div role="dialog" aria-modal="true" aria-label={`Detalle: ${s.titulo}`}>
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onCerrar}
        className="fixed inset-0 z-90 cursor-default bg-tinta/40 animate-[aparecer_0.25s_ease_both]"
      />
      <aside className="fixed inset-y-0 right-0 z-[91] w-[min(468px,92vw)] overflow-y-auto bg-superficie-alta shadow-[-30px_0_60px_-30px_rgba(12,42,62,0.6)] animate-[surgir-lateral_0.32s_cubic-bezier(0.22,1,0.36,1)_both]">
        {/* Cabecera oscura */}
        <div className="relative overflow-hidden bg-tinta px-7 pb-7 pt-6 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[70px] -top-[90px] h-[280px] w-[280px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,108,175,0.4), transparent 70%)",
            }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <BadgeEstadoOscuro estado={s.estado} />
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar detalle"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white/25 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.16]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <p className="relative mt-5 font-mono text-xs uppercase tracking-[0.1em] text-andritz-claro">
            Módulo {pad(s.numero)}
          </p>
          <h2 className="relative mt-2 font-display text-[27px] font-bold leading-tight tracking-tight">
            {s.titulo}
          </h2>
          <p className="relative mt-4 border-l-[3px] border-andritz-claro pl-3.5 text-sm italic leading-relaxed text-white/[0.82]">
            {s.pregunta}
          </p>
        </div>

        {/* Cuerpo */}
        <div className="px-7 pb-9 pt-6">
          <ul className="flex flex-col">
            <FilaDetalle icono={Calendar} label="Fecha">
              {s.fecha ? fechaLarga(s.fecha) : "Sesión ya realizada"}
            </FilaDetalle>
            <FilaDetalle icono={Clock} label="Horario">
              {s.fecha ? s.horario : "—"}
            </FilaDetalle>
            <FilaDetalle icono={MapPin} label="Lugar" sub={s.fecha ? s.direccion : undefined}>
              {s.fecha ? s.lugar : "Por confirmar"}
            </FilaDetalle>
            <FilaDetalle icono={Users} label="Modalidad" ultima>
              Presencial · Equipo de líderes
            </FilaDetalle>
          </ul>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href={s.materialHref}
              className="flex items-center justify-between gap-3 rounded-lg border border-borde bg-superficie-alta px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-andritz hover:text-acento"
            >
              Material del módulo
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            </Link>
            {s.tareaHref && (
              <Link
                href={s.tareaHref}
                className="flex items-center justify-between gap-3 rounded-lg border border-borde bg-superficie-alta px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-andritz hover:text-acento"
              >
                {s.tareaTitulo ?? "Tarea previa"}
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </Link>
            )}
          </div>

          {AGREGAR_CALENDARIO && s.fecha && (
            <div className="mt-6 border-t border-borde pt-5">
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-suave">
                Agregar a mi calendario
              </p>
              <div className="flex gap-2.5">
                <a
                  href={gcalURL(s)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-andritz px-3.5 py-3 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro"
                >
                  <Calendar className="h-4 w-4" aria-hidden />
                  Google
                </a>
                <button
                  type="button"
                  onClick={() => descargarIcs(s)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-borde bg-superficie-alta px-3.5 py-3 text-sm font-semibold text-ink transition-colors hover:border-andritz hover:text-acento"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Outlook (.ics)
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function BadgeEstadoOscuro({ estado }: { estado: EstadoSesion }) {
  const estilo: Record<EstadoSesion, string> = {
    proxima: "text-white bg-andritz-claro/[0.22] border-andritz-claro/50",
    realizada: "text-[#bee3e6] bg-teal-ad/30 border-andritz-claro/35",
    programada: "text-white/75 bg-white/[0.08] border-white/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em]",
        estilo[estado]
      )}
    >
      {ESTADO_LABEL[estado]}
    </span>
  );
}

function FilaDetalle({
  icono: Icono,
  label,
  sub,
  ultima,
  children,
}: {
  icono: typeof Clock;
  label: string;
  sub?: string;
  ultima?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={cn("flex gap-3.5 py-3.5", !ultima && "border-b border-borde")}>
      <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] bg-superficie-suave text-acento">
        <Icono className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
      </span>
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#8ca0af] dark:text-ink-suave/70">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-ink">{children}</p>
        {sub && <p className="mt-0.5 text-[13px] leading-normal text-ink-suave">{sub}</p>}
      </div>
    </li>
  );
}

function gcalURL(s: SesionVM) {
  if (!s.fecha) return "#";
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = `Academia de Liderazgo · Módulo ${pad(s.numero)} — ${s.titulo}`;
  const dates = `${s.fecha.inicio}/${s.fecha.fin}`;
  const details = `Pregunta guía: ${s.pregunta}\n\nAcademia de Liderazgo — ANDRITZ Separation.`;
  const location = s.direccion ? `${s.lugar}, ${s.direccion}` : s.lugar;
  return `${base}&text=${encodeURIComponent(text)}&dates=${dates}&ctz=America/Santiago&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

function descargarIcs(s: SesionVM) {
  if (!s.fecha) return;
  const esc = (t: string) =>
    t
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;")
      .replace(/\n/g, "\\n");
  const location = s.direccion ? `${s.lugar}, ${s.direccion}` : s.lugar;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Andritz Academia de Liderazgo//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${s.id}-academia-andritz@adapsys`,
    "DTSTAMP:20260709T120000Z",
    `DTSTART;TZID=America/Santiago:${s.fecha.inicio}`,
    `DTEND;TZID=America/Santiago:${s.fecha.fin}`,
    `SUMMARY:${esc(`Academia de Liderazgo · Módulo ${pad(s.numero)} — ${s.titulo}`)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(`Pregunta guía: ${s.pregunta}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `modulo-${pad(s.numero)}-academia-andritz.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
