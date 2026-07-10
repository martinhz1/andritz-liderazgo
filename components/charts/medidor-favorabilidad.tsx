import { bandaDe } from "@/lib/types";
import { COLOR_BANDA } from "./favorabilidad-dimensiones";

// Medidor de posición: ubica la favorabilidad sobre las tres bandas de
// percepción (Baja 0–60 · Media 61–80 · Alta 81–100). El marcador toma el
// color de la banda en que cae el valor. Server-safe.
export function MedidorFavorabilidad({ valor }: { valor: number }) {
  const color = COLOR_BANDA[bandaDe(valor)];
  const pos = Math.min(100, Math.max(0, valor));

  return (
    <div>
      <div className="relative h-2.5 w-full">
        <div className="flex h-full w-full overflow-hidden rounded-full">
          <div className="bg-banda-baja" style={{ width: "60%" }} />
          <div className="bg-banda-media" style={{ width: "20%" }} />
          <div className="bg-banda-alta" style={{ width: "20%" }} />
        </div>
        <span
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-superficie-alta shadow-[0_1px_5px_rgba(12,42,62,0.45)]"
          style={{ left: `${pos}%`, backgroundColor: color }}
          aria-hidden
        />
      </div>
      <div className="relative mt-1.5 h-3 font-mono text-[10px] text-ink-suave">
        <span className="absolute -translate-x-1/2" style={{ left: "60%" }}>
          60
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: "80%" }}>
          80
        </span>
      </div>
    </div>
  );
}
