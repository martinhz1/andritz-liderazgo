import Link from "next/link";
import { ArrowRight, CalendarDays, Camera, FolderOpen } from "lucide-react";
import { RutaAB } from "@/components/ruta-ab";
import { Badge } from "@/components/ui/badge";
import {
  getModulos,
  getProximaSesion,
  getSesiones,
  getMateriales,
  getModulo,
  getGranOportunidad,
} from "@/lib/content";
import { fechaCorta } from "@/lib/types";

// Curva de entrada compartida por los bloques (fade + subida escalonada).
const surgir = (delay: string) =>
  `animate-[surgir_0.7s_cubic-bezier(0.22,1,0.36,1)_${delay}_both]`;

const ACCESOS = [
  {
    href: "/repositorio",
    icono: FolderOpen,
    titulo: "Repositorio de material",
    texto:
      "Definiciones, informes de sesión, lecturas y tareas, organizados por módulo.",
  },
  {
    href: "/calendario",
    icono: CalendarDays,
    titulo: "Calendario",
    texto: "Las sesiones del programa: fechas, horarios y lugares.",
  },
  {
    href: "/registros",
    icono: Camera,
    titulo: "Registros gráficos",
    texto: "Fotografías de cada jornada de la academia.",
  },
];

const CHIPS_OPORTUNIDAD = ["Producir más", "Menos recursos", "Mejores condiciones"];

export default async function InicioPage() {
  const [modulos, sesiones, proxima, granOportunidad] = await Promise.all([
    getModulos(),
    getSesiones(),
    getProximaSesion(),
    getGranOportunidad(),
  ]);
  const moduloProximo = proxima ? await getModulo(proxima.moduloId) : undefined;
  const tareasProximas = moduloProximo
    ? await getMateriales({ moduloId: moduloProximo.id, tipo: "tareas" })
    : [];

  // La maqueta usa el "salto" de valor (párrafo 2) como cuerpo de la tarjeta;
  // cae al primero si el informe cambiara de estructura.
  const cuerpoOportunidad = granOportunidad?.[1] ?? granOportunidad?.[0];
  const fechaProxima = proxima?.fecha
    ? `${fechaCorta(proxima.fecha)} · ${proxima.horario}`
    : "Por confirmar";

  return (
    <div>
      {/* ── Hero oscuro full-bleed: la Ruta A→B ── */}
      <section
        aria-labelledby="hero-titulo"
        className="relative mx-[calc(50%_-_50vw)] w-screen overflow-hidden bg-tinta text-white"
      >
        {/* Glow decorativo (único adorno permitido, regla CLAUDE.md #6) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[90px] -top-[140px] h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,108,175,0.35), rgba(0,108,175,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <div className={surgir("0.05s")}>
            <p className="eyebrow text-andritz-claro">
              Academia de Liderazgo · Andritz
            </p>
            <h1
              id="hero-titulo"
              className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
            >
              Juntos transformamos los desafíos en progreso
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
              Tu espacio para preparar, vivir y sostener cada módulo del programa.
            </p>
          </div>

          <div className={`mt-12 ${surgir("0.2s")}`}>
            <RutaAB modulos={modulos} sesiones={sesiones} tono="oscuro" />
          </div>
        </div>
      </section>

      {/* ── Próxima sesión + La Gran Oportunidad ── */}
      <div className="mt-11 grid gap-5 md:grid-cols-[1.35fr_1fr] md:items-stretch">
        {proxima && moduloProximo && (
          <section
            aria-labelledby="proxima-titulo"
            className={`rounded-xl border border-borde bg-superficie-alta p-7 shadow-[0_18px_44px_-30px_rgba(12,42,62,0.4)] ${surgir("0.3s")}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <p id="proxima-titulo" className="eyebrow text-acento">
                Próxima sesión
              </p>
              <Badge variant="outline">{fechaProxima}</Badge>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
              <span className="font-mono text-xl font-medium text-ink-suave">
                {String(moduloProximo.numero).padStart(2, "0")} ·{" "}
              </span>
              {moduloProximo.titulo}
            </h2>
            <p className="mt-4 border-l-[3px] border-andritz pl-4 text-lg italic leading-snug text-ink-suave">
              “{moduloProximo.preguntaGuia}”
            </p>
            <p className="mt-4 font-mono text-xs text-ink-suave">
              Lugar: {proxima.lugar}
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              {tareasProximas.map((t) => (
                <Link
                  key={t.id}
                  href={`/repositorio/${t.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg bg-andritz px-4.5 py-3 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro"
                >
                  Tarea previa: {t.titulo.replace("Tarea: ", "")}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              ))}
              <Link
                href="/repositorio?modulo=m1"
                className="flex items-center justify-between gap-3 rounded-lg border border-borde bg-superficie-alta px-4.5 py-3 text-sm font-medium text-ink transition-colors hover:border-andritz hover:text-acento"
              >
                Material del Módulo 1
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </section>
        )}

        {/* La Gran Oportunidad — Estado B, desde el informe M1 */}
        <section
          aria-labelledby="oportunidad-titulo"
          className={`flex flex-col rounded-xl border border-borde bg-superficie-alta p-7 shadow-[0_18px_44px_-30px_rgba(12,42,62,0.4)] ${surgir("0.4s")}`}
        >
          <p className="eyebrow text-teal-ad dark:text-[#5fc7cf]">
            B · La gran oportunidad
          </p>
          <h2
            id="oportunidad-titulo"
            className="mt-3.5 font-display text-[22px] font-bold leading-snug text-ink"
          >
            Posicionar a ANDRITZ Separation como socio estratégico de la minería.
          </h2>
          {cuerpoOportunidad && (
            <p className="mt-3 line-clamp-4 text-[14.5px] leading-relaxed text-ink-suave">
              {cuerpoOportunidad}
            </p>
          )}
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {CHIPS_OPORTUNIDAD.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#b9dee0] bg-[#f0f8f8] px-3 py-1.5 font-mono text-[11px] text-teal-ad dark:border-teal-ad/40 dark:bg-teal-ad/15 dark:text-[#5fc7cf]"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ── Accesos a secciones ── */}
      <section aria-label="Secciones de la plataforma" className="mt-8">
        <p className="eyebrow mb-4.5 text-ink-suave">Explora la plataforma</p>
        <ul className="grid gap-4.5 sm:grid-cols-3">
          {ACCESOS.map(({ href, icono: Icono, titulo, texto }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-xl border border-borde bg-superficie-alta p-6 shadow-[0_12px_30px_-26px_rgba(12,42,62,0.5)] transition hover:-translate-y-[3px] hover:border-andritz"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-superficie-suave text-acento">
                  <Icono className="h-[22px] w-[22px]" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4.5 font-display text-[17px] font-semibold text-ink group-hover:text-acento">
                  {titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-suave">
                  {texto}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
