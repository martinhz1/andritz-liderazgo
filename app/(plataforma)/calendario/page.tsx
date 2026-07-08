import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getModulos, getSesiones } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata = { title: "Calendario · Academia de Liderazgo Andritz" };

export default async function CalendarioPage() {
  const [sesiones, modulos] = await Promise.all([getSesiones(), getModulos()]);

  return (
    <div className="max-w-4xl">
      <p className="eyebrow text-tinta-suave">Calendario</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Sesiones del programa
      </h1>
      <p className="mt-2 max-w-2xl text-tinta-suave">
        Una sesión presencial por módulo. Las fechas y lugares se confirman con
        anticipación a cada jornada.
      </p>

      <ol className="mt-10 space-y-4">
        {sesiones.map((sesion) => {
          const modulo = modulos.find((m) => m.id === sesion.moduloId);
          if (!modulo) return null;
          const esProxima = sesion.estado === "proxima";
          const realizada = sesion.estado === "realizada";

          return (
            <li
              key={sesion.id}
              className={cn(
                "rounded-md border bg-white p-5 md:p-6",
                esProxima ? "border-andritz" : "border-linea",
                realizada && "opacity-80"
              )}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-medium text-tinta-suave">
                      {String(modulo.numero).padStart(2, "0")}
                    </span>
                    {realizada && <Badge variant="neutro">Realizada</Badge>}
                    {esProxima && <Badge variant="andritz">Próxima sesión</Badge>}
                    {sesion.estado === "programada" && (
                      <Badge variant="outline">Programada</Badge>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
                    {modulo.titulo}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-tinta">
                    {modulo.descripcion}
                  </p>
                  <p className="mt-2 max-w-xl text-sm italic text-tinta-suave">
                    “{modulo.preguntaGuia}”
                  </p>
                </div>

                <dl className="flex shrink-0 flex-col gap-1.5 font-mono text-xs text-tinta-suave md:items-end">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Fecha</dt>
                    <dd className={cn(esProxima && "font-medium text-andritz")}>
                      {sesion.fecha}
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Horario</dt>
                    <dd>{sesion.horario}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    <dt className="sr-only">Lugar</dt>
                    <dd>{sesion.lugar}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 font-mono text-xs text-tinta-suave">
        {/* TODO: reemplazar fechas, horarios y lugares placeholder en data/sesiones.ts */}
        Fechas y lugares referenciales — se confirman antes de cada sesión.
      </p>
    </div>
  );
}
