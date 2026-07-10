import type { Tema } from "@/components/tema/tema-provider";

// Cromado de los gráficos (ejes, grilla, etiquetas, tooltip) según el tema.
// Los COLORES DE DATOS (cyan/teal/magenta/neutro Adapsys) NO viven aquí: son
// constantes en ambos temas (regla de doble branding, CLAUDE.md). Esto solo
// adapta lo que sobre fondo oscuro sería invisible.
export interface CromadoGrafico {
  eje: string; // ticks / labels de eje
  ejeLinea: string; // axisLine / referencias
  etiqueta: string; // LabelList sobre las barras
  tooltipFondo: string;
  tooltipBorde: string;
  tooltipTexto: string;
  cursor: string; // relleno del cursor de hover
}

const CLARO: CromadoGrafico = {
  eje: "#3D5568",
  ejeLinea: "#D7E0E7",
  etiqueta: "#0C2A3E",
  tooltipFondo: "#ffffff",
  tooltipBorde: "#D7E0E7",
  tooltipTexto: "#0C2A3E",
  cursor: "rgba(0,184,184,0.08)",
};

const OSCURO: CromadoGrafico = {
  eje: "#9FB4C2",
  ejeLinea: "#273B4A",
  etiqueta: "#E8EEF3",
  tooltipFondo: "#12222E",
  tooltipBorde: "#273B4A",
  tooltipTexto: "#E8EEF3",
  cursor: "rgba(0,184,184,0.14)",
};

export function coloresGrafico(tema: Tema): CromadoGrafico {
  return tema === "oscuro" ? OSCURO : CLARO;
}
