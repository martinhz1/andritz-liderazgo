import { iniciales, tiempoRelativo } from "@/lib/utils";
import { BadgeCoordinador } from "./badge-coordinador";
import type { AutorForo } from "@/lib/foro";

// Autor de un post/respuesta: avatar de iniciales + nombre + insignia de
// coordinador + tiempo relativo. Presentacional (server o client).
export function Autor({
  autor,
  fecha,
  editado,
}: {
  autor: AutorForo;
  fecha: Date;
  editado?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[linear-gradient(140deg,#006caf,#0c2a3e)] font-display text-xs font-bold tracking-wide text-white">
        {iniciales(autor.nombre)}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-tinta">{autor.nombre}</span>
          {autor.esCoordinador && <BadgeCoordinador />}
        </div>
        <p className="font-mono text-[11px] text-tinta-suave">
          {tiempoRelativo(fecha)}
          {editado ? " · editado" : ""}
        </p>
      </div>
    </div>
  );
}
