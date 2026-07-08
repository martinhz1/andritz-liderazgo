import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMateriales, getModulos } from "@/lib/content";
import type { TipoMaterial } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata = { title: "Repositorio · Academia de Liderazgo Andritz" };

const TIPOS: { valor: TipoMaterial; etiqueta: string }[] = [
  { valor: "definiciones", etiqueta: "Definiciones" },
  { valor: "informe", etiqueta: "Informe de sesión" },
  { valor: "lecturas", etiqueta: "Lecturas" },
  { valor: "tareas", etiqueta: "Tareas" },
];

const ETIQUETA_TIPO: Record<TipoMaterial, string> = {
  definiciones: "Definiciones",
  informe: "Informe de sesión",
  lecturas: "Lectura",
  tareas: "Tarea",
};

function urlFiltro(modulo?: string, tipo?: string) {
  const params = new URLSearchParams();
  if (modulo) params.set("modulo", modulo);
  if (tipo) params.set("tipo", tipo);
  const qs = params.toString();
  return qs ? `/repositorio?${qs}` : "/repositorio";
}

export default async function RepositorioPage({
  searchParams,
}: {
  searchParams: Promise<{ modulo?: string; tipo?: string }>;
}) {
  const { modulo, tipo } = await searchParams;
  const modulos = await getModulos();
  const tipoValido = TIPOS.some((t) => t.valor === tipo)
    ? (tipo as TipoMaterial)
    : undefined;
  const moduloValido = modulos.some((m) => m.id === modulo) ? modulo : undefined;

  const materiales = await getMateriales({
    moduloId: moduloValido,
    tipo: tipoValido,
  });

  return (
    <div>
      <p className="eyebrow text-tinta-suave">Repositorio</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Material del programa
      </h1>
      <p className="mt-2 max-w-2xl text-tinta-suave">
        Todo el material de la academia, organizado por módulo y tipo. Antes de
        cada sesión encontrarás aquí las lecturas y tareas correspondientes.
      </p>

      {/* ── Filtros (links SSR, sin estado client) ── */}
      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 font-mono text-xs uppercase tracking-wide text-tinta-suave">
            Módulo
          </span>
          <FiltroLink
            activo={!moduloValido}
            href={urlFiltro(undefined, tipoValido)}
          >
            Todos
          </FiltroLink>
          {modulos.map((m) => (
            <FiltroLink
              key={m.id}
              activo={moduloValido === m.id}
              href={urlFiltro(m.id, tipoValido)}
            >
              {String(m.numero).padStart(2, "0")} · {m.titulo}
            </FiltroLink>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 font-mono text-xs uppercase tracking-wide text-tinta-suave">
            Tipo
          </span>
          <FiltroLink activo={!tipoValido} href={urlFiltro(moduloValido)}>
            Todos
          </FiltroLink>
          {TIPOS.map((t) => (
            <FiltroLink
              key={t.valor}
              activo={tipoValido === t.valor}
              href={urlFiltro(moduloValido, t.valor)}
            >
              {t.etiqueta}
            </FiltroLink>
          ))}
        </div>
      </div>

      {/* ── Resultados ── */}
      {materiales.length === 0 ? (
        <div className="mt-10 rounded-md border border-dashed border-linea bg-white p-10 text-center">
          <p className="font-display font-semibold">
            Aún no hay material con este filtro
          </p>
          <p className="mt-1 text-sm text-tinta-suave">
            El material de cada módulo se publica en torno a su sesión. Prueba
            con otro módulo u otro tipo.
          </p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {materiales.map((mat) => {
            const mod = modulos.find((m) => m.id === mat.moduloId);
            return (
              <li key={mat.id}>
                <Link
                  href={`/repositorio/${mat.slug}`}
                  className="group flex h-full flex-col rounded-md border border-linea bg-white p-5 transition-colors hover:border-andritz"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="andritz">
                      {ETIQUETA_TIPO[mat.tipo]}
                    </Badge>
                    {mod && (
                      <Badge variant="outline">
                        Módulo {String(mod.numero).padStart(2, "0")}
                      </Badge>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-andritz">
                    {mat.titulo}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-tinta-suave">
                    {mat.resumen}
                  </p>
                  <span className="mt-4 flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-andritz">
                    Abrir
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FiltroLink({
  href,
  activo,
  children,
}: {
  href: string;
  activo: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={activo ? "true" : undefined}
      className={cn(
        "rounded-sm border px-2.5 py-1 font-mono text-xs font-medium transition-colors",
        activo
          ? "border-andritz bg-andritz text-white"
          : "border-linea bg-white text-tinta-suave hover:border-andritz hover:text-andritz"
      )}
    >
      {children}
    </Link>
  );
}
