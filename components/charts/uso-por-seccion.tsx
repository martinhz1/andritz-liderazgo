"use client";

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTema } from "@/components/tema/tema-provider";
import { coloresGrafico } from "@/lib/colores-grafico";

// Visitas por sección (recorrido). Barra horizontal, paleta de datos Adapsys.
export function UsoPorSeccion({
  datos,
}: {
  datos: { seccion: string; n: number }[];
}) {
  const alto = datos.length * 40 + 16;
  const c = coloresGrafico(useTema().tema);
  return (
    <div style={{ width: "100%", height: alto }}>
      <ResponsiveContainer>
        <BarChart
          data={datos}
          layout="vertical"
          margin={{ top: 4, right: 44, bottom: 4, left: 8 }}
          barCategoryGap={12}
        >
          <XAxis type="number" domain={[0, "dataMax"]} allowDecimals={false} hide />
          <YAxis
            type="category"
            dataKey="seccion"
            width={92}
            tick={{ fill: c.etiqueta, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="n" fill="#00B8B8" radius={[0, 4, 4, 0]} maxBarSize={22}>
            <LabelList
              dataKey="n"
              position="right"
              style={{
                fill: c.etiqueta,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "IBM Plex Mono",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
