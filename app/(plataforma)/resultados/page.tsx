import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavorabilidadDimensiones } from "@/components/charts/favorabilidad-dimensiones";
import { BarraApilada } from "@/components/charts/barra-apilada";
import { getEncuesta } from "@/lib/content";
import { bandaDe, favorabilidadDimension } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Resultados de encuesta · Academia de Liderazgo Andritz",
};

const ESTILO_BANDA: Record<string, string> = {
  Baja: "bg-banda-baja text-magenta-ad",
  Media: "bg-banda-media text-teal-ad",
  Alta: "bg-banda-alta text-teal-ad",
};

export default async function ResultadosPage() {
  const encuesta = await getEncuesta();

  const filasDimensiones = encuesta.dimensiones.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    favorabilidad: Math.round(favorabilidadDimension(d)),
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <p className="eyebrow text-tinta-suave">Resultados de encuesta</p>
        {encuesta.esEjemplo && (
          <Badge variant="alerta">
            <AlertTriangle className="h-3 w-3" aria-hidden />
            Datos de ejemplo
          </Badge>
        )}
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
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

      {/* Bandas de percepción */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-tinta-suave">
          Bandas de percepción
        </span>
        <Chip clase={ESTILO_BANDA.Baja}>Baja 0–60%</Chip>
        <Chip clase={ESTILO_BANDA.Media}>Media 61–80%</Chip>
        <Chip clase={ESTILO_BANDA.Alta}>Alta 81–100%</Chip>
      </div>

      {/* ── Favorabilidad por dimensión ── */}
      <section
        aria-labelledby="dim-titulo"
        className="mt-10 rounded-md border border-linea bg-white p-5 md:p-7"
      >
        <h2 id="dim-titulo" className="font-display text-xl font-bold tracking-tight">
          Favorabilidad por dimensión
        </h2>
        <p className="mt-1 text-sm text-tinta-suave">
          Porcentaje de respuestas favorables (4–5) por dimensión, contra los
          umbrales de banda (60% y 80%).
        </p>

        <div className="mt-6">
          <FavorabilidadDimensiones datos={filasDimensiones} />
        </div>

        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {filasDimensiones.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between gap-3 rounded-sm border border-linea/70 px-3 py-2"
            >
              <span className="text-sm text-tinta">
                <span className="font-mono text-xs font-medium text-tinta-suave">
                  {d.id}
                </span>{" "}
                · {d.nombre}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-sm font-semibold">
                  {d.favorabilidad}%
                </span>
                <Chip clase={ESTILO_BANDA[bandaDe(d.favorabilidad)]}>
                  {bandaDe(d.favorabilidad)}
                </Chip>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Favorabilidad por pregunta ── */}
      <section
        aria-labelledby="preg-titulo"
        className="mt-8 rounded-md border border-linea bg-white p-5 md:p-7"
      >
        <h2 id="preg-titulo" className="font-display text-xl font-bold tracking-tight">
          Favorabilidad por pregunta
        </h2>
        <p className="mt-1 text-sm text-tinta-suave">
          Distribución favorable · neutral · desfavorable de cada afirmación.
          Las líneas punteadas marcan los umbrales de banda (60% y 80%).
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
                        <span className="font-mono text-sm font-semibold">
                          {p.favorable}%
                        </span>
                        <Chip clase={ESTILO_BANDA[bandaDe(p.favorable)]}>
                          {bandaDe(p.favorable)}
                        </Chip>
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
                      Favorable {p.favorable}% · Neutral {p.neutral}% ·
                      Desfavorable {p.desfavorable}%
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
        Nota: la favorabilidad de cada dimensión corresponde al promedio simple
        de la favorabilidad de sus preguntas; algunas cifras pueden diferir en
        ±1 punto por redondeo. Los casos No Sabe/No Responde se excluyen de la
        base de cálculo de cada pregunta.
      </p>
    </div>
  );
}

function Chip({ clase, children }: { clase: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "rounded-sm px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide",
        clase
      )}
    >
      {children}
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
