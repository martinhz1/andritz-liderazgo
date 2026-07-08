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
} from "@/lib/content";

export default async function InicioPage() {
  const [modulos, sesiones, proxima] = await Promise.all([
    getModulos(),
    getSesiones(),
    getProximaSesion(),
  ]);
  const moduloProximo = proxima ? await getModulo(proxima.moduloId) : undefined;
  const tareasProximas = moduloProximo
    ? await getMateriales({ moduloId: moduloProximo.id, tipo: "tareas" })
    : [];

  return (
    <div>
      {/* ── Hero: la ruta A→B ── */}
      <section aria-labelledby="hero-titulo">
        <p className="eyebrow text-tinta-suave">
          Academia de Liderazgo · Andritz Separation
        </p>
        <h1
          id="hero-titulo"
          className="mt-2 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl"
        >
          Juntos transformamos los desafíos en progreso
        </h1>

        <div className="mt-10 md:mt-14">
          <RutaAB modulos={modulos} sesiones={sesiones} />
        </div>
      </section>

      {/* ── Próxima sesión como momento ── */}
      {proxima && moduloProximo && (
        <section
          aria-labelledby="proxima-titulo"
          className="mt-12 rounded-md border border-linea bg-white p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <p id="proxima-titulo" className="eyebrow text-andritz">
              Próxima sesión
            </p>
            <Badge variant="outline">
              {proxima.fecha} · {proxima.horario}
            </Badge>
          </div>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                <span className="font-mono text-lg font-medium text-tinta-suave">
                  {String(moduloProximo.numero).padStart(2, "0")} ·{" "}
                </span>
                {moduloProximo.titulo}
              </h2>
              <p className="mt-3 border-l-2 border-andritz pl-4 text-lg italic leading-snug text-tinta-suave">
                “{moduloProximo.preguntaGuia}”
              </p>
              <p className="mt-3 font-mono text-xs text-tinta-suave">
                Lugar: {proxima.lugar}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              {tareasProximas.map((t) => (
                <Link
                  key={t.id}
                  href={`/repositorio/${t.slug}`}
                  className="flex items-center justify-between gap-3 rounded-md bg-andritz px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro"
                >
                  Tarea previa: {t.titulo.replace("Tarea: ", "")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ))}
              <Link
                href="/repositorio?modulo=m1"
                className="flex items-center justify-between gap-3 rounded-md border border-linea bg-white px-4 py-2.5 text-sm font-medium text-tinta transition-colors hover:border-andritz hover:text-andritz"
              >
                Material del Módulo 1
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Accesos a secciones ── */}
      <section aria-label="Secciones de la plataforma" className="mt-10">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
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
          ].map(({ href, icono: Icono, titulo, texto }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-md border border-linea bg-white p-5 transition-colors hover:border-andritz"
              >
                <Icono className="h-5 w-5 text-andritz" aria-hidden />
                <h3 className="mt-3 font-display text-base font-semibold group-hover:text-andritz">
                  {titulo}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-tinta-suave">
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
