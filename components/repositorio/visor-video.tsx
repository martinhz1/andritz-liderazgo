import { Download, PlayCircle } from "lucide-react";

/**
 * Reproductor de video embebido para materiales tipo "video". Usa el reproductor
 * nativo del navegador (<video controls>), sin autoplay; ofrece descarga.
 */
export function VisorVideo({
  src,
  titulo,
  tipoMime = "video/mp4",
  duracion,
}: {
  src: string;
  titulo: string;
  tipoMime?: string;
  duracion?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-borde bg-superficie-alta shadow-[0_12px_30px_-26px_rgba(12,42,62,0.5)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-suave">
          <PlayCircle className="h-4 w-4 text-acento" strokeWidth={1.9} aria-hidden />
          Video{duracion ? ` · ${duracion}` : ""}
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

      <div className="aspect-video w-full bg-black">
        <video
          controls
          preload="metadata"
          className="h-full w-full"
          aria-label={`Video: ${titulo}`}
        >
          <source src={src} type={tipoMime} />
          Tu navegador no puede reproducir este video.{" "}
          <a href={src} download>
            Descárgalo aquí
          </a>
          .
        </video>
      </div>
    </figure>
  );
}
