import {
  COLOR_DESFAVORABLE,
  COLOR_FAVORABLE,
  COLOR_NEUTRAL,
} from "./favorabilidad-dimensiones";

// Barra apilada favorable / neutral / desfavorable. Server-safe (sin JS de
// cliente): la usan las filas por pregunta. Los segmentos se separan con un
// gap de 2px en color de superficie (no con bordes).
export function BarraApilada({
  favorable,
  neutral,
  desfavorable,
}: {
  favorable: number;
  neutral: number;
  desfavorable: number;
}) {
  const segmentos = [
    { valor: favorable, color: COLOR_FAVORABLE },
    { valor: neutral, color: COLOR_NEUTRAL },
    { valor: desfavorable, color: COLOR_DESFAVORABLE },
  ].filter((s) => s.valor > 0);

  // Límites entre segmentos consecutivos (para los gaps de superficie).
  const limites: number[] = [];
  let acumulado = 0;
  for (let i = 0; i < segmentos.length - 1; i++) {
    acumulado += segmentos[i].valor;
    limites.push(acumulado);
  }

  return (
    <div
      className="relative h-6 w-full overflow-hidden rounded-md bg-hueso"
      role="img"
      aria-label={`Favorable ${favorable}%, neutral ${neutral}%, desfavorable ${desfavorable}%`}
    >
      <div className="flex h-full">
        {segmentos.map((s, i) => (
          <div key={i} style={{ width: `${s.valor}%`, backgroundColor: s.color }} />
        ))}
      </div>
      {limites.map((x) => (
        <span
          key={x}
          className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-hueso"
          style={{ left: `${x}%` }}
          aria-hidden
        />
      ))}
    </div>
  );
}
