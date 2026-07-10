"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { bandaDe, type BandaPercepcion } from "@/lib/types";
import { useTema } from "@/components/tema/tema-provider";
import { coloresGrafico } from "@/lib/colores-grafico";

// Capa de datos = paleta Adapsys (el azul Andritz no entra a los gráficos)
export const COLOR_FAVORABLE = "#00B8B8";
export const COLOR_NEUTRAL = "#B9C9D3";
export const COLOR_DESFAVORABLE = "#C20C5B";

// Color de marca por banda de favorabilidad (Baja alerta · Media · Alta).
export const COLOR_BANDA: Record<BandaPercepcion, string> = {
  Baja: "#C20C5B",
  Media: "#00B8B8",
  Alta: "#006379",
};

export interface FilaDimension {
  id: string;
  nombre: string;
  favorabilidad: number; // redondeada
}

export function FavorabilidadDimensiones({ datos }: { datos: FilaDimension[] }) {
  const alto = datos.length * 64 + 40;
  const { tema } = useTema();
  const c = coloresGrafico(tema);

  return (
    <div style={{ width: "100%", height: alto }} aria-hidden={false}>
      <ResponsiveContainer>
        <BarChart
          data={datos}
          layout="vertical"
          margin={{ top: 8, right: 56, bottom: 8, left: 8 }}
          barCategoryGap={18}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: c.eje, fontSize: 11, fontFamily: "IBM Plex Mono" }}
            axisLine={{ stroke: c.ejeLinea }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="id"
            width={40}
            tick={{ fill: c.eje, fontSize: 12, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
          />
          {/* Umbrales de banda: Baja ≤60 · Media 61–80 · Alta 81–100 */}
          <ReferenceLine
            x={60}
            stroke={c.eje}
            strokeDasharray="4 4"
            label={{
              value: "60",
              position: "top",
              fill: c.eje,
              fontSize: 10,
              fontFamily: "IBM Plex Mono",
            }}
          />
          <ReferenceLine
            x={80}
            stroke={c.eje}
            strokeDasharray="4 4"
            label={{
              value: "80",
              position: "top",
              fill: c.eje,
              fontSize: 10,
              fontFamily: "IBM Plex Mono",
            }}
          />
          <Bar dataKey="favorabilidad" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {datos.map((d) => (
              <Cell key={d.id} fill={COLOR_BANDA[bandaDe(d.favorabilidad)]} />
            ))}
            <LabelList
              dataKey="favorabilidad"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{
                fill: c.etiqueta,
                fontSize: 13,
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
