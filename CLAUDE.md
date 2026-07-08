# CLAUDE.md — Academia de Liderazgo Andritz Separation

Aula virtual / repositorio del programa de liderazgo de Andritz Separation,
provista por Adapsys (consultora de transformación organizacional). Programa
basado en Liderazgo Adaptativo (Heifetz): módulos = trayecto del estado A
(realidad) al estado B (aspiración / "La Gran Oportunidad").

**No es e-learning.** Es repositorio de material + calendario + galería +
panel de resultados. Los usuarios asisten a sesiones presenciales; la
plataforma acompaña antes/durante/después.

## Stack

- Next.js 15 App Router + TypeScript estricto
- Tailwind CSS v4 — tokens en `app/globals.css` bajo `@theme` (NO hay
  `tailwind.config`; los colores custom son clases como `bg-andritz`,
  `text-tinta`, `border-linea`)
- Recharts solo en el dashboard de resultados
- Radix (tabs/dialog), lucide-react, Fontsource (Archivo, IBM Plex Sans/Mono)
- Auth prototipo: cookie httpOnly firmada HMAC (Web Crypto, compatible Edge)
  en `lib/session.ts` + `middleware.ts`. Roles: `participante` | `admin`.

## Convenciones NO negociables

1. **Favorabilidad, nunca promedios.** Métrica de encuesta = % de respuestas
   4–5 (Likert 1–5). Neutral = 3, desfavorable = 1–2. Bandas: Baja 0–60 ·
   Media 61–80 · Alta 81–100. Jamás mostrar medias como métrica.
2. **Doble branding por capas.** Andritz es dueño de la interfaz: azul
   `#006CAF` en header, nav activa y acciones. Adapsys es dueño de la capa de
   datos: cyan `#00B8B8` (favorable), teal `#006379`, magenta `#C20C5B`
   (desfavorable/alertas, uso mínimo). El azul Andritz NO entra a los
   gráficos; la paleta Adapsys NO se usa en navegación ni botones.
3. **Español latinoamericano (chileno) en toda la UI**, código y commits en
   el idioma que ya usa el repo. Voz activa, sentence case, sin filler.
4. **Tipografía por rol**: Archivo = display (títulos), IBM Plex Sans =
   cuerpo, IBM Plex Mono = datos/fechas/etiquetas/eyebrows. No introducir
   otras fuentes.
5. **Capa de datos aislada.** La UI importa SOLO de `lib/content.ts`, nunca
   de `/data` directo. Cualquier fuente nueva (Sheets/CMS) se implementa ahí.
6. **Elemento signature = Ruta A→B** (`components/ruta-ab.tsx`). Codifica el
   estado real del programa (realizada/próxima/programada desde
   `data/sesiones.ts`). Mantener el resto de la UI disciplinada: sin barras
   decorativas, sin gradientes, sin adornos que no informen.
7. **Accesibilidad**: foco visible (anillo azul Andritz), `prefers-reduced-motion`
   respetado (ver `globals.css`), textos alternativos, responsive real.

## Comandos

```bash
npm run dev      # desarrollo
npm run build    # verificación obligatoria antes de commit
npm run start    # producción local
```

## TODO pendientes

- [ ] Fechas, horarios y lugares reales de las sesiones (`data/sesiones.ts`)
- [ ] Fotos reales de la jornada M1 → `/public/registros/m1/` +
      actualizar `data/registros.ts`
- [ ] Datos reales de la encuesta de levantamiento previo
      (`data/encuesta.ts`, poner `esEjemplo: false`)
- [ ] Migrar capa de datos a Google Sheets (reimplementar `lib/content.ts`;
      patrón de referencia: lectura vía `gviz/tq` o API con service account)
- [ ] `SESSION_SECRET` real en Vercel y eliminar fallback dev de
      `lib/session.ts`
- [ ] Evaluar migrar auth mock a un proveedor real si la plataforma escala
