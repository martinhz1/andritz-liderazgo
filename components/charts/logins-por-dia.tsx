"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Logins por día (últimos 30). Paleta de datos Adapsys (cyan), no azul Andritz.
export function LoginsPorDia({ datos }: { datos: { dia: string; n: number }[] }) {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={datos} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
          <XAxis
            dataKey="dia"
            tickFormatter={(d: string) => d.slice(8)}
            interval={4}
            tick={{ fill: "#3D5568", fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={{ stroke: "#D7E0E7" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            width={30}
            tick={{ fill: "#3D5568", fontSize: 10, fontFamily: "IBM Plex Mono" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,184,184,0.08)" }}
            labelFormatter={(d: string) => `Día ${d}`}
            formatter={(v: number) => [`${v}`, "Inicios de sesión"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #D7E0E7",
              fontFamily: "IBM Plex Mono",
              fontSize: 12,
            }}
          />
          <Bar dataKey="n" fill="#00B8B8" radius={[3, 3, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
