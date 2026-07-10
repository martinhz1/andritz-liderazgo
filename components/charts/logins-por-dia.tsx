"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTema } from "@/components/tema/tema-provider";
import { coloresGrafico } from "@/lib/colores-grafico";

// Logins por día (últimos 30). Paleta de datos Adapsys (cyan), no azul Andritz.
export function LoginsPorDia({ datos }: { datos: { dia: string; n: number }[] }) {
  const c = coloresGrafico(useTema().tema);
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={datos} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
          <XAxis
            dataKey="dia"
            tickFormatter={(d: string) => d.slice(8)}
            interval={4}
            tick={{ fill: c.eje, fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={{ stroke: c.ejeLinea }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            width={30}
            tick={{ fill: c.eje, fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: c.cursor }}
            labelFormatter={(d: string) => `Día ${d}`}
            formatter={(v: number) => [`${v}`, "Inicios de sesión"]}
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${c.tooltipBorde}`,
              backgroundColor: c.tooltipFondo,
              color: c.tooltipTexto,
              fontFamily: "IBM Plex Mono",
              fontSize: 12,
            }}
            labelStyle={{ color: c.tooltipTexto }}
            itemStyle={{ color: c.tooltipTexto }}
          />
          <Bar dataKey="n" fill="#00B8B8" radius={[3, 3, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
