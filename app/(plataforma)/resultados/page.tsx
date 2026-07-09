import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavorabilidadDimensiones } from "@/components/charts/favorabilidad-dimensiones";
import { BarraApilada } from "@/components/charts/barra-apilada";
import { MedidorFavorabilidad } from "@/components/charts/medidor-favorabilidad";
import { getEncuesta } from "@/lib/content";
import { bandaDe, favorabilidadDimension } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Resultados de encuesta · Academia de Liderazgo Andritz",
};

const surgir = (delay: string) =>
  `animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_${delay}_both]`;

const ESTILO_BANDA: Record<string, string> = {
  Baja: "bg-banda-baja text-magenta-ad",
  Media: "bg-banda-media text-teal-ad",
  Alta: "bg-banda-alta text-teal-ad",
};

const CARD =
  "rounded-2xl border border-linea bg-white p-6 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]";

export default async function ResultadosPage() {
  const encuesta = await getEncuesta();

  const dimensiones = encuesta.dimensiones.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    favorabilidad: Math.round(favorabilidadDimension(d)),
  }));

  const preguntas = encuesta.dimensiones.flatMap((d) => d.preguntas);
  const general = Math.round(
    preguntas.reduce((acc, p) => acc + p.favorable, 0) / preguntas.length
  );
  const masAlta = dimensiones.reduce((a, b) => (b.favorabilidad > a.favorabilidad ? b : a));
  const masBaja = dimensiones.reduce((a, b) => (b.favorabilidad < a.favorabilidad ? b : a));

  return (
    <div>
      {/* ── Encabezado ── */}
      <div className={surgir("0.04s")}>
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow text-andritz">Resultados de encuesta</p>
          {encuesta.esEjemplo && (
            <Badge variant="alerta">
              <AlertTriangle className="h-3 w-3" aria-hidden />
              Datos de ejemplo
            </Badge>
          )}
        </div>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          {encuesta.titulo}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-tinta-suave">
          <span>{encuesta.etapa}</span>
          <span aria-hidden>·</span>
          <span>N={encuesta.n}</span>
          <span aria-hidden>·</span>
          <span>Escala {encuesta.escala}</span>
          <span aria-hidden>·</span>
          <span>Métrica: favorabilidad (respuestas 4–5)</span>
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className={`mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${surgir("0.1s")}`}>
        <div className={CARD}>
          <p className="eyebrow text-tinta-suave">Favorabilidad general</p>
          <div className="mt-2 flex items-end gap-2.5">
            <span className="font-display text-5xl font-extrabold leading-none text-tinta">
              {general}
              <span className="text-2xl">%</span>
            </span>
            <BandaChip banda={bandaDe(general)} className="mb-1.5" />
          </div>
          <div className="mt-5">
            <MedidorFavorabilidad valor={general} />
          </div>
        </div>

        <TileDimension titulo="Dimensión más alta" dim={masAlta} />
        <TileDimension titulo="Dimensión más baja" dim={masBaja} />

        <div className={CARD}>
          <p className="eyebrow text-tinta-suave">Base</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-3xl font-bold leading-none text-tinta">
              {encuesta.n}
            </span>
            <span className="mb-0.5 text-sm text-tinta-suave">respondentes</span>
          </div>
          <div className="mt-4 space-y-1 font-mono text-xs text-tinta-suave">
            <p>{preguntas.length} afirmaciones · {encuesta.dimensiones.length} dimensiones</p>
            <p>Escala {encuesta.escala}</p>
          </div>
        </div>
      </div>

      {/* Bandas de percepción */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-tinta-suave">
          Bandas de percepción
        </span>
        <BandaChip banda="Baja">Baja 0–60%</BandaChip>
        <BandaChip banda="Media">Media 61–80%</BandaChip>
        <BandaChip banda="Alta">Alta 81–100%</BandaChip>
      </div>

      {/* ── Favorabilidad por dimensión ── */}
      <section aria-labelledby="dim-titulo" className={`mt-8 ${CARD} md:p-7 ${surgir("0.16s")}`}>
        <h2 id="dim-titulo" className="font-display text-xl font-bold tracking-tight">
          Favorabilidad por dimensión
        </h2>
        <p className="mt-1 text-sm text-tinta-suave">
          Porcentaje de respuestas favorables (4–5) por dimensión, contra los
          umbrales de banda (60% y 80%).
        </p>

        <div className="mt-6">
          <FavorabilidadDimensiones datos={dimensiones} />
        </div>

        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {dimensiones.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-linea/70 px-3 py-2"
            >
              <span className="text-sm text-tinta">
                <span className="font-mono text-xs font-medium text-tinta-suave">
                  {d.id}
                </span>{" "}
                · {d.nombre}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-sm font-semibold tabular-nums">
                  {d.favorabilidad}%
                </span>
                <BandaChip banda={bandaDe(d.favorabilidad)} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Favorabilidad por pregunta ── */}
      <section aria-labelledby="preg-titulo" className={`mt-6 ${CARD} md:p-7 ${surgir("0.22s")}`}>
        <h2 id="preg-titulo" className="font-display text-xl font-bold tracking-tight">
          Favorabilidad por pregunta
        </h2>
        <p className="mt-1 text-sm text-tinta-suave">
          Distribución de respuestas favorable · neutral · desfavorable de cada
          afirmación.
        </p>

        <Tabs defaultValue="D1" className="mt-6">
          <TabsList>
            {encuesta.dimensiones.map((d) => (
              <TabsTrigger key={d.id} value={d.id}>
                {d.id}
              </TabsTrigger>
            ))}
          </TabsList>

          {encuesta.dimensiones.map((d) => (
            <TabsContent key={d.id} value={d.id}>
              <h3 className="font-display text-base font-semibold">
                {d.id} · {d.nombre}
              </h3>

              <ol className="mt-5 space-y-6">
                {d.preguntas.map((p) => (
                  <li key={p.numero}>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm leading-relaxed text-tinta">
                        <span className="font-mono text-xs font-medium text-tinta-suave">
                          {p.numero}.
                        </span>{" "}
                        {p.texto}
                      </p>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="font-mono text-sm font-semibold tabular-nums">
                          {p.favorable}%
                        </span>
                        <BandaChip banda={bandaDe(p.favorable)} />
                      </span>
                    </div>
                    <div className="mt-2">
                      <BarraApilada
                        favorable={p.favorable}
                        neutral={p.neutral}
                        desfavorable={p.desfavorable}
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] text-tinta-suave">
                      Favorable {p.favorable}% · Neutral {p.neutral}% · Desfavorable{" "}
                      {p.desfavorable}%
                      {p.nsnr
                        ? ` · *${p.nsnr} ${
                            p.nsnr === 1 ? "persona contesta" : "personas contestan"
                          } No Sabe/No Responde`
                        : ""}
                    </p>
                  </li>
                ))}
              </ol>
            </TabsContent>
          ))}
        </Tabs>

        {/* Leyenda */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-linea pt-4 font-mono text-xs text-tinta-suave">
          <LeyendaItem color="#00B8B8" etiqueta="Favorable (4–5)" />
          <LeyendaItem color="#B9C9D3" etiqueta="Neutral (3)" />
          <LeyendaItem color="#C20C5B" etiqueta="Desfavorable (1–2)" />
        </div>
      </section>

      <p className="mt-6 max-w-3xl font-mono text-xs leading-relaxed text-tinta-suave">
        Nota: la favorabilidad de cada dimensión corresponde al promedio simple de
        la favorabilidad de sus preguntas; algunas cifras pueden diferir en ±1
        punto por redondeo. Los casos No Sabe/No Responde se excluyen de la base de
        cálculo de cada pregunta.
      </p>
    </div>
  );
}

function TileDimension({
  titulo,
  dim,
}: {
  titulo: string;
  dim: { id: string; nombre: string; favorabilidad: number };
}) {
  return (
    <div className={CARD}>
      <p className="eyebrow text-tinta-suave">{titulo}</p>
      <p className="mt-2 font-mono text-xs text-tinta-suave">{dim.id}</p>
      <p className="mt-0.5 font-display text-[15px] font-semibold leading-tight text-tinta">
        {dim.nombre}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-display text-2xl font-bold text-tinta">
          {dim.favorabilidad}%
        </span>
        <BandaChip banda={bandaDe(dim.favorabilidad)} />
      </div>
    </div>
  );
}

function BandaChip({
  banda,
  className,
  children,
}: {
  banda: "Baja" | "Media" | "Alta";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide",
        ESTILO_BANDA[banda],
        className
      )}
    >
      {children ?? banda}
    </span>
  );
}

function LeyendaItem({ color, etiqueta }: { color: string; etiqueta: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-[2px]"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {etiqueta}
    </span>
  );
}
