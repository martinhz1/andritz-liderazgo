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

// Capa de datos = paleta Adapsys (el azul Andritz no entra a los gráficos)
export const COLOR_FAVORABLE = "#00B8B8";
export const COLOR_NEUTRAL = "#B9C9D3";
export const COLOR_DESFAVORABLE = "#C20C5B";
const COLOR_EJE = "#3D5568";

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
            tick={{ fill: COLOR_EJE, fontSize: 11, fontFamily: "IBM Plex Mono" }}
            axisLine={{ stroke: "#D7E0E7" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="id"
            width={40}
            tick={{ fill: COLOR_EJE, fontSize: 12, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
          />
          {/* Umbrales de banda: Baja ≤60 · Media 61–80 · Alta 81–100 */}
          <ReferenceLine
            x={60}
            stroke={COLOR_EJE}
            strokeDasharray="4 4"
            label={{
              value: "60",
              position: "top",
              fill: COLOR_EJE,
              fontSize: 10,
              fontFamily: "IBM Plex Mono",
            }}
          />
          <ReferenceLine
            x={80}
            stroke={COLOR_EJE}
            strokeDasharray="4 4"
            label={{
              value: "80",
              position: "top",
              fill: COLOR_EJE,
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
                fill: "#0C2A3E",
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
