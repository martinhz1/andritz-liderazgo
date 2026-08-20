import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MiniRuta } from "@/components/ruta-ab";
import { getMaterial, getMateriales, getModulo, getModulos } from "@/lib/content";
import { MarcarVista } from "@/components/notificaciones/marcar-vista";
import { VisorPdf } from "@/components/repositorio/visor-pdf";
import { VisorVideo } from "@/components/repositorio/visor-video";
import type { TipoMaterial } from "@/lib/types";
import { cn } from "@/lib/utils";

const ETIQUETA_TIPO: Record<TipoMaterial, string> = {
  definiciones: "Definiciones",
  informe: "Informe de sesión",
  lecturas: "Lectura",
  tareas: "Tarea",
  presentacion: "Presentación",
  video: "Video",
};

export async function generateStaticParams() {
  const materiales = await getMateriales();
  return materiales.map((m) => ({ slug: m.slug }));
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = await getMaterial(slug);
  if (!material) notFound();

  const [modulo, modulos] = await Promise.all([
    getModulo(material.moduloId),
    getModulos(),
  ]);
  // Las lecturas de solo texto usan el ancho de lectura; las que traen PDF
  // embebido usan el layout ancho para dar espacio al visor.
  const esLectura = material.tipo === "lecturas" && !material.pdf;

  return (
    <article className={cn(esLectura ? "mx-auto max-w-3xl" : "max-w-4xl")}>
      <MarcarVista fuente="repositorio" />
      <Link
        href="/repositorio"
        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-ink-suave transition-colors hover:text-acento"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Materiales
      </Link>

      <header className="mt-6 border-b border-borde pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="andritz">{ETIQUETA_TIPO[material.tipo]}</Badge>
          {modulo && (
            <Badge variant="outline">
              Módulo {String(modulo.numero).padStart(2, "0")} · {modulo.titulo}
            </Badge>
          )}
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {material.titulo}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-suave">{material.resumen}</p>
        {modulo && (
          <div className="mt-5">
            <MiniRuta modulos={modulos} moduloActualId={modulo.id} />
          </div>
        )}
      </header>

      {material.pdf && (
        <div className="mt-8">
          <VisorPdf
            src={material.pdf.src}
            titulo={material.titulo}
            etiqueta={ETIQUETA_TIPO[material.tipo]}
            paginas={material.pdf.paginas}
            unidad={material.tipo === "presentacion" ? "láminas" : "páginas"}
          />
        </div>
      )}

      {material.video && (
        <div className="mt-8">
          <VisorVideo
            src={material.video.src}
            titulo={material.titulo}
            tipoMime={material.video.tipoMime}
            duracion={material.video.duracion}
          />
        </div>
      )}

      <div className={cn("mt-8 space-y-10", esLectura && "lectura")}>
        {material.secciones.map((sec, i) => (
          <section key={i}>
            {sec.titulo && (
              <h2 className="mb-4 font-display text-xl font-bold tracking-tight md:text-2xl">
                {sec.titulo}
              </h2>
            )}

            {sec.parrafos?.map((p, j) => (
              <p key={j} className="mb-4 leading-relaxed text-ink">
                {p}
              </p>
            ))}

            {sec.lista && (
              <ul className="mt-2 space-y-2.5">
                {sec.lista.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ink">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-andritz"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.destacado && (
              <div className="mt-6 rounded-md border border-andritz/25 bg-andritz/5 p-5">
                <p className="font-display text-lg font-semibold leading-snug text-andritz-oscuro">
                  {sec.destacado}
                </p>
              </div>
            )}

            {sec.citas && (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {sec.citas.map((cita, j) => (
                  <li
                    key={j}
                    className="rounded-md border border-borde bg-superficie-alta p-4"
                  >
                    <Quote className="h-4 w-4 text-acento" aria-hidden />
                    <p className="mt-2 text-sm italic leading-relaxed text-ink">
                      “{cita}”
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {sec.columnas && (
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {sec.columnas.map((col, j) => (
                  <div
                    key={j}
                    className="rounded-md border border-borde bg-superficie-alta p-4"
                  >
                    <h3 className="font-mono text-xs font-medium uppercase leading-relaxed tracking-[0.08em] text-acento">
                      {col.titulo}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {col.items.map((item, k) => (
                        <li
                          key={k}
                          className="border-b border-borde/60 pb-1.5 text-sm leading-snug text-ink last:border-0"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
