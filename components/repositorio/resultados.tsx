"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Compass,
  FileText,
  List,
  ListChecks,
  MonitorPlay,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Material, TipoMaterial } from "@/lib/types";
import { cn } from "@/lib/utils";

// Panel de resultados del Repositorio. El módulo se filtra por URL (rail SSR);
// aquí la categoría y el buscador son estado de cliente para feedback inmediato,
// con conteo y estado vacío recalculados en vivo.

// Modificación de producto: el filtro de tipo se agrupa en dos categorías.
// "Material de sesión" reúne definiciones + informe + lecturas; las tarjetas
// conservan su etiqueta e ícono específicos.
type Categoria = "sesion" | "tareas";

const CATEGORIAS: { valor: Categoria; label: string; tipos: TipoMaterial[] }[] = [
  {
    valor: "sesion",
    label: "Material de sesión",
    tipos: ["definiciones", "informe", "lecturas", "presentacion"],
  },
  { valor: "tareas", label: "Tareas", tipos: ["tareas"] },
];

const ETIQUETA_TIPO: Record<TipoMaterial, string> = {
  definiciones: "Definiciones",
  informe: "Informe de sesión",
  lecturas: "Lectura",
  tareas: "Tarea",
  presentacion: "Presentación",
};

const ICONO_TIPO: Record<TipoMaterial, LucideIcon> = {
  definiciones: Compass,
  informe: FileText,
  lecturas: BookOpen,
  tareas: ListChecks,
  presentacion: MonitorPlay,
};

export function RepositorioResultados({
  materiales,
  numerosModulo,
  modulo,
}: {
  materiales: Material[];
  /** moduloId → número, para el tag de cada tarjeta (útil en "Todo el material"). */
  numerosModulo: Record<string, number>;
  modulo?: { numero: number };
}) {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [q, setQ] = useState("");

  const consulta = q.trim().toLowerCase();

  const resultados = useMemo(() => {
    const tiposActivos = categoria
      ? CATEGORIAS.find((c) => c.valor === categoria)?.tipos ?? []
      : null;
    return materiales.filter((m) => {
      if (tiposActivos && !tiposActivos.includes(m.tipo)) return false;
      if (consulta && !`${m.titulo} ${m.resumen}`.toLowerCase().includes(consulta))
        return false;
      return true;
    });
  }, [materiales, categoria, consulta]);

  const n = resultados.length;
  const metaResultados =
    `${n} ${n === 1 ? "material" : "materiales"}` +
    (modulo ? ` · Módulo ${String(modulo.numero).padStart(2, "0")}` : " en el programa");

  // Estado vacío: caso especial cuando el módulo aún no tiene material publicado
  // (sin filtros ni búsqueda activos).
  const moduloSinMaterial =
    n === 0 && modulo && materiales.length === 0 && categoria === null && consulta === "";
  const vacioTitulo = moduloSinMaterial
    ? `El material del Módulo ${String(modulo.numero).padStart(2, "0")} aún no está publicado`
    : "Sin resultados para este filtro";
  const vacioTexto = moduloSinMaterial
    ? "El material de cada módulo se publica en torno a su sesión. Vuelve cerca de la fecha o revisa los módulos ya realizados."
    : "Prueba con otro módulo, otro tipo o ajusta la búsqueda.";

  return (
    <div className="min-w-0">
      {/* Toolbar: categoría + buscador */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-suave">
            Tipo
          </span>
          <PillTipo activo={categoria === null} onClick={() => setCategoria(null)}>
            Todos
          </PillTipo>
          {CATEGORIAS.map((c) => (
            <PillTipo
              key={c.valor}
              activo={categoria === c.valor}
              onClick={() => setCategoria(c.valor)}
            >
              {c.label}
            </PillTipo>
          ))}
        </div>

        <div className="relative flex items-center">
          <Search
            className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-[#8ca0af] dark:text-ink-suave/70"
            aria-hidden
          />
          <label htmlFor="buscar-material" className="sr-only">
            Buscar material
          </label>
          <input
            id="buscar-material"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar material…"
            className="w-56 rounded-lg border border-borde bg-superficie-alta py-2.5 pl-8.5 pr-3 text-sm outline-none transition-shadow focus:border-andritz focus:ring-2 focus:ring-andritz/15"
          />
        </div>
      </div>

      <p className="mb-4 font-mono text-xs text-ink-suave">{metaResultados}</p>

      {n > 0 ? (
        <ul className="grid gap-4.5 sm:grid-cols-2">
          {resultados.map((mat, i) => (
            <li
              key={mat.id}
              className="animate-[surgir_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${(0.04 + i * 0.05).toFixed(2)}s` }}
            >
              <TarjetaMaterial
                material={mat}
                numeroModulo={numerosModulo[mat.moduloId]}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-borde bg-superficie-alta p-12 text-center">
          <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-superficie-suave text-[#8ca0af] dark:text-ink-suave/70">
            <CalendarDays className="h-[26px] w-[26px]" strokeWidth={1.7} aria-hidden />
          </span>
          <p className="mt-4 font-display text-lg font-semibold">{vacioTitulo}</p>
          <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-ink-suave">
            {vacioTexto}
          </p>
        </div>
      )}
    </div>
  );
}

function PillTipo({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        "rounded-md border px-3 py-1.5 font-mono text-xs font-medium transition-colors",
        activo
          ? "border-andritz bg-andritz text-white"
          : "border-borde bg-superficie-alta text-ink-suave hover:border-andritz hover:text-acento"
      )}
    >
      {children}
    </button>
  );
}

function TarjetaMaterial({
  material,
  numeroModulo,
}: {
  material: Material;
  numeroModulo?: number;
}) {
  const Icono = ICONO_TIPO[material.tipo];
  const nSecciones = material.secciones.length;
  const esPresentacion = material.tipo === "presentacion";
  const laminas = material.pdf?.laminas;
  return (
    <Link
      href={`/repositorio/${material.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-borde bg-superficie-alta p-5.5 shadow-[0_12px_30px_-26px_rgba(12,42,62,0.5)] transition hover:-translate-y-[3px] hover:border-andritz hover:shadow-[0_20px_40px_-28px_rgba(12,42,62,0.55)]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[11px] bg-superficie-suave text-acento">
          <Icono className="h-[22px] w-[22px]" strokeWidth={1.8} aria-hidden />
        </span>
        <Badge variant="andritz">{ETIQUETA_TIPO[material.tipo]}</Badge>
        {numeroModulo != null && (
          <Badge variant="outline" className="ml-auto">
            Módulo {String(numeroModulo).padStart(2, "0")}
          </Badge>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-acento">
        {material.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-suave">
        {material.resumen}
      </p>
      <div className="mt-4.5 flex items-center justify-between gap-3 border-t border-borde pt-4">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#6a7f8e] dark:text-ink-suave">
          {esPresentacion ? (
            <>
              <MonitorPlay className="h-[13px] w-[13px]" strokeWidth={1.9} aria-hidden />
              {laminas ? `${laminas} láminas` : "PDF"}
            </>
          ) : (
            <>
              <List className="h-[13px] w-[13px]" strokeWidth={1.9} aria-hidden />
              {nSecciones} {nSecciones === 1 ? "sección" : "secciones"}
            </>
          )}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-acento">
          Abrir
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
