# Academia de Liderazgo · Andritz Separation

Aula virtual / repositorio del programa de liderazgo de Andritz Separation
(Liderazgo Adaptativo, Heifetz). Plataforma provista por **Adapsys**.

No es e-learning: es un repositorio ordenado de material + calendario +
galería de fotos + panel de resultados de encuesta (solo admin), que acompaña
las sesiones presenciales del programa.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (tokens en `app/globals.css` → `@theme`)
- Recharts (dashboard de resultados)
- Radix UI (tabs, dialog) + lucide-react
- Fuentes autohospedadas vía Fontsource: Archivo (display), IBM Plex Sans
  (cuerpo), IBM Plex Mono (datos)
- Auth de prototipo: cookie httpOnly firmada HMAC-SHA256 + middleware

## Correr local

```bash
npm install
npm run dev
# → http://localhost:3000
```

Credenciales demo (definidas en `data/users.ts`):

| Usuario        | Contraseña     | Rol          | Ve                          |
| -------------- | -------------- | ------------ | --------------------------- |
| `participante` | `academia2026` | participante | Todo menos Resultados       |
| `admin`        | `adapsys2026`  | admin        | Todo + Resultados de encuesta |

## Estructura

```
app/
├── login/                    # Login (pública)
├── api/auth/                 # login / logout (setean/borran cookie)
└── (plataforma)/             # Requiere sesión (middleware + layout)
    ├── page.tsx              # Inicio: hero con la Ruta A→B + próxima sesión
    ├── repositorio/          # Material filtrable por módulo y tipo
    │   └── [slug]/           # Detalle (lecturas con layout de lectura)
    ├── calendario/           # Sesiones del programa
    ├── registros/            # Galería de fotos con lightbox
    └── resultados/           # Dashboard de encuesta (solo admin)
components/
├── ruta-ab.tsx               # Elemento signature: la ruta A→B del programa
├── nav.tsx / footer.tsx      # Doble branding: Andritz header / Adapsys footer
├── galeria.tsx               # Grid + lightbox
├── charts/                   # Recharts + barra apilada (paleta Adapsys)
└── ui/                       # badge, tabs, dialog (estilo shadcn)
data/                         # Contenido tipado del prototipo
lib/
├── content.ts                # ÚNICA puerta de acceso a datos (ver abajo)
├── types.ts                  # Modelo de datos + lógica de bandas
└── session.ts                # Firma/verificación de cookie (Web Crypto)
middleware.ts                 # Protege rutas; /resultados exige rol admin
public/logos/                 # Logos Andritz y Adapsys
```

## Cómo cambiar los datos

Todo el contenido vive en `/data/*.ts` (tipado según `lib/types.ts`):

- **Módulos**: `data/modulos.ts`
- **Material del repositorio**: `data/materiales.ts` (secciones con párrafos,
  listas, citas, columnas y destacados)
- **Sesiones (fechas/lugares)**: `data/sesiones.ts` — el estado
  `realizada | proxima | programada` controla la Ruta A→B y el calendario
- **Fotos**: `data/registros.ts` — sube imágenes a `/public/registros/` y
  reemplaza `src: null` por la ruta
- **Encuesta**: `data/encuesta.ts` — hoy con **datos de ejemplo**
  (`esEjemplo: true` muestra el badge de advertencia)
- **Usuarios**: `data/users.ts`

La UI consume datos **solo** a través de `lib/content.ts` (funciones async).
Para migrar a Google Sheets o un CMS, reimplementa esas funciones y no
tocas ninguna página ni componente.

## Convención de métrica (regla Adapsys)

La métrica de la encuesta es **favorabilidad** (% de respuestas 4–5 en Likert
1–5), nunca promedios. Bandas de percepción: Baja 0–60 · Media 61–80 ·
Alta 81–100. La favorabilidad por dimensión es el promedio simple de la
favorabilidad de sus preguntas (redondeo solo al mostrar).

## Deploy en Vercel

1. Sube el repo a GitHub (ver comandos abajo).
2. En Vercel: **Add New → Project → importa el repo** (framework autodetectado).
3. Define la variable de entorno `SESSION_SECRET` (Production y Preview) con
   un secreto largo aleatorio, p. ej. `openssl rand -base64 32`.
4. Deploy. No hay dependencias de servidor propias: todo corre en Vercel.

## Inicializar el repo

```bash
git init
git add .
git commit -m "Prototipo aula virtual Academia de Liderazgo Andritz"
git branch -M main
git remote add origin git@github.com:martinhz1/academia-liderazgo-andritz.git
git push -u origin main
```

## Pendientes (ver CLAUDE.md)

- Fechas, horarios y lugares reales de sesiones
- Fotos reales de la jornada del Módulo 1
- Datos reales de la encuesta de levantamiento previo
- Migración de la capa de datos a Google Sheets
