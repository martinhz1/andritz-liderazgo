import { Download, MonitorPlay } from "lucide-react";

/**
 * Visor de PDF embebido para materiales tipo "presentacion". Usa el visor
 * nativo del navegador vía <iframe>; si no está disponible, ofrece descarga.
 */
export function VisorPdf({
  src,
  titulo,
  etiqueta = "Documento",
  paginas,
  unidad = "páginas",
}: {
  src: string;
  titulo: string;
  /** Etiqueta del visor (p. ej. "Presentación" o "Lectura"). */
  etiqueta?: string;
  paginas?: number;
  /** Sustantivo de la unidad de conteo (p. ej. "láminas" o "páginas"). */
  unidad?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-borde bg-superficie-alta shadow-[0_12px_30px_-26px_rgba(12,42,62,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-suave">
          <MonitorPlay className="h-4 w-4 text-acento" strokeWidth={1.9} aria-hidden />
          {etiqueta}{paginas ? ` · ${paginas} ${unidad}` : ""}
        </span>
        <a
          href={src}
          download
          className="inline-flex items-center gap-1.5 rounded-md border border-borde px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-suave transition-colors hover:border-andritz hover:text-acento focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-andritz/40"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
          Descargar
        </a>
      </div>

      <div className="h-[72vh] min-h-[440px] w-full bg-superficie-suave">
        <iframe
          src={`${src}#view=FitH`}
          title={`${titulo} (PDF)`}
          className="h-full w-full"
        />
      </div>

      <figcaption className="border-t border-borde px-4 py-3 text-sm leading-relaxed text-ink-suave">
        ¿No ves la presentación?{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-acento underline decoration-borde underline-offset-2 hover:decoration-acento"
        >
          Ábrela en una pestaña nueva
        </a>
        .
      </figcaption>
    </figure>
  );
}
