"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Foto } from "@/lib/types";

// Galería con lightbox. Las fotos con src === null se muestran como
// placeholder (pendientes de subir a /public/registros/).
export function Galeria({ titulo, fotos }: { titulo: string; fotos: Foto[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);

  const anterior = () =>
    setAbierta((i) => (i === null ? null : (i - 1 + fotos.length) % fotos.length));
  const siguiente = () =>
    setAbierta((i) => (i === null ? null : (i + 1) % fotos.length));

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {fotos.map((foto, i) => (
          <li key={i}>
            <button
              onClick={() => setAbierta(i)}
              className="group block w-full overflow-hidden rounded-md border border-borde bg-superficie-alta text-left transition-colors hover:border-andritz"
              aria-label={`Ver foto: ${foto.alt}`}
            >
              <Miniatura foto={foto} indice={i} />
              <p className="truncate px-2.5 py-2 font-mono text-[11px] text-ink-suave">
                {foto.alt}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={abierta !== null} onOpenChange={(o) => !o && setAbierta(null)}>
        <DialogContent aria-describedby={undefined}>
          {abierta !== null && (
            <figure>
              <DialogTitle className="sr-only">
                {titulo} — {fotos[abierta].alt}
              </DialogTitle>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm bg-superficie-suave">
                {fotos[abierta].src ? (
                  <Image
                    src={fotos[abierta].src!}
                    alt={fotos[abierta].alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                ) : (
                  <PlaceholderGrande alt={fotos[abierta].alt} indice={abierta} />
                )}
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm text-ink-suave">{fotos[abierta].alt}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-suave">
                    {abierta + 1} / {fotos.length}
                  </span>
                  <button
                    onClick={anterior}
                    aria-label="Foto anterior"
                    className="rounded-sm border border-borde p-1.5 text-ink-suave hover:border-andritz hover:text-acento"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    onClick={siguiente}
                    aria-label="Foto siguiente"
                    className="rounded-sm border border-borde p-1.5 text-ink-suave hover:border-andritz hover:text-acento"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Miniatura({ foto, indice }: { foto: Foto; indice: number }) {
  if (foto.src) {
    return (
      <div className="relative aspect-[4/3]">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-[1.02]"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 bg-superficie-suave">
      <Camera className="h-5 w-5 text-borde" aria-hidden />
      <span className="font-mono text-[10px] uppercase tracking-wide text-ink-suave/60">
        Foto {String(indice + 1).padStart(2, "0")} · pendiente
      </span>
    </div>
  );
}

function PlaceholderGrande({ alt, indice }: { alt: string; indice: number }) {
  return (
    <div className="flex flex-col items-center gap-3 p-8 text-center">
      <Camera className="h-10 w-10 text-borde" aria-hidden />
      <p className="font-mono text-xs uppercase tracking-wide text-ink-suave">
        Foto {String(indice + 1).padStart(2, "0")} pendiente de subir
      </p>
      <p className="max-w-sm text-sm text-ink-suave">{alt}</p>
    </div>
  );
}
