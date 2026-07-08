import {
  COLOR_DESFAVORABLE,
  COLOR_FAVORABLE,
  COLOR_NEUTRAL,
} from "./favorabilidad-dimensiones";

// Barra apilada favorable / neutral / desfavorable con umbrales de banda.
// Server-safe (sin JS de cliente): la usan las filas por pregunta.
export function BarraApilada({
  favorable,
  neutral,
  desfavorable,
}: {
  favorable: number;
  neutral: number;
  desfavorable: number;
}) {
  return (
    <div
      className="relative h-6 w-full overflow-hidden rounded-sm bg-hueso"
      role="img"
      aria-label={`Favorable ${favorable}%, neutral ${neutral}%, desfavorable ${desfavorable}%`}
    >
      <div className="flex h-full">
        <div
          style={{ width: `${favorable}%`, backgroundColor: COLOR_FAVORABLE }}
        />
        <div style={{ width: `${neutral}%`, backgroundColor: COLOR_NEUTRAL }} />
        <div
          style={{
            width: `${desfavorable}%`,
            backgroundColor: COLOR_DESFAVORABLE,
          }}
        />
      </div>
      {/* Umbrales 60 y 80 */}
      <div
        className="absolute inset-y-0 border-l border-dashed border-tinta/40"
        style={{ left: "60%" }}
        aria-hidden
      />
      <div
        className="absolute inset-y-0 border-l border-dashed border-tinta/40"
        style={{ left: "80%" }}
        aria-hidden
      />
    </div>
  );
}
