# CLAUDE.md — Academia de Liderazgo Andritz

Aula virtual / repositorio del programa de liderazgo de Andritz,
provista por Adapsys (consultora de transformación organizacional). Programa
basado en Liderazgo Adaptativo (Heifetz): módulos = trayecto del estado A
(realidad) al estado B (aspiración / "La Gran Oportunidad").

**No es e-learning.** Es repositorio de material + calendario + galería +
panel de resultados + foro. Los usuarios asisten a sesiones presenciales; la
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
  Contraseñas hasheadas (PBKDF2, `lib/password.ts`), nunca en texto plano.
  `SESSION_SECRET` obligatorio en producción (sin fallback inseguro).
- Foro = **única parte con datos dinámicos**: Neon Postgres + Drizzle ORM.
  Esquema en `db/`, lectura en `lib/foro.ts`, mutaciones vía server actions en
  `app/(plataforma)/foro/actions.ts`. Migrar esquema con `npm run db:push`.
  Todo el resto del contenido sigue estático en `/data`.

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
5. **Capa de datos aislada.** La UI importa SOLO de `lib/content.ts` (contenido
   estático) o `lib/foro.ts` (foro, Postgres), nunca de `/data` ni de la DB
   directo. Cualquier fuente nueva (Sheets/CMS) se implementa ahí.
6. **Elemento signature = Ruta A→B** (`components/ruta-ab.tsx`). Codifica el
   estado real del programa (realizada/próxima/programada desde
   `data/sesiones.ts`). Mantener el resto de la UI disciplinada: sin barras
   decorativas, sin adornos que no informen. Excepciones aprobadas al «sin
   gradientes»: la franja de acento y el tile/avatar del header
   (`components/nav.tsx`) y el glow del hero de Inicio y de la banda de
   contexto — todos sutiles y en paleta Andritz. No introducir gradientes
   nuevos fuera de esos.
7. **Accesibilidad**: foco visible (anillo azul Andritz), `prefers-reduced-motion`
   respetado (ver `globals.css`), textos alternativos, responsive real.
8. **Foro.** Insignia «Coordinador/a del programa» = `rol === "admin"`. El
   contenido de usuario se renderiza como texto plano (nunca
   `dangerouslySetInnerHTML`; saltos con `whitespace-pre-wrap`). Toda mutación
   valida sesión y permisos server-side. «Anuncio» y fijar: solo coordinadores;
   editar: solo el autor; eliminar: autor o coordinador.

## Comandos

```bash
npm run dev      # desarrollo
npm run build    # verificación obligatoria antes de commit
npm run start    # producción local
npm run db:push  # aplica el esquema del foro (db/schema.ts) a Neon
```

DB del foro: `vercel env pull .env.local` trae `DATABASE_URL`. Dev y producción
comparten la misma base Neon (sin branching).

## TODO pendientes

- [ ] Confirmar el lugar real del Módulo 1 realizado (`data/sesiones.ts`, hoy
      "Oficinas Andritz, Santiago"; M2–M5 en SAN Room Management)
- [ ] Migrar capa de datos estática a Google Sheets (reimplementar
      `lib/content.ts`; el foro ya usa Postgres aparte)
- [ ] Evaluar migrar auth mock a un proveedor real si la plataforma escala
      (hoy: usuarios en `data/users.ts` con hash PBKDF2)
