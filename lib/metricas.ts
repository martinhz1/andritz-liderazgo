import { and, count, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db/client";
import {
  eventos,
  posts,
  respuestas,
  reaccionesPost,
  reaccionesRespuesta,
} from "@/db/schema";
import { getUsuariosReales } from "@/lib/content";

export type TipoEvento = "login" | "vista";

/** Registra un evento de uso. Nunca lanza (la analítica no debe romper la app). */
export async function registrarEvento(
  usuario: string,
  tipo: TipoEvento,
  ruta?: string
): Promise<void> {
  if (!db) return;
  try {
    await db.insert(eventos).values({ usuario, tipo, ruta: ruta ?? null });
  } catch {
    // Silencioso: la analítica es best-effort.
  }
}

export interface MetricaUsuario {
  usuario: string;
  nombre: string;
  esCoordinador: boolean;
  logins: number;
  ultimaActividad: Date | null;
  posts: number;
  respuestas: number;
}

export interface Metricas {
  hayDatos: boolean;
  totalUsuarios: number;
  activados: number;
  activos7: number;
  activos30: number;
  totalLogins: number;
  loginsPorDia: { dia: string; n: number }[];
  usoPorSeccion: { seccion: string; n: number }[];
  foro: { posts: number; respuestas: number; reacciones: number };
  usuarios: MetricaUsuario[];
}

function seccionDe(ruta: string | null): string {
  if (!ruta) return "Otro";
  if (ruta === "/") return "Inicio";
  if (ruta.startsWith("/repositorio")) return "Repositorio";
  if (ruta.startsWith("/foro")) return "Foro";
  if (ruta.startsWith("/calendario")) return "Calendario";
  if (ruta.startsWith("/registros")) return "Registros";
  if (ruta.startsWith("/resultados")) return "Diagnóstico";
  if (ruta.startsWith("/adopcion")) return "Adopción";
  return "Otro";
}

const ORDEN_SECCION = [
  "Inicio",
  "Repositorio",
  "Foro",
  "Calendario",
  "Registros",
  "Diagnóstico",
  "Adopción",
  "Otro",
];

const DIA_MS = 24 * 60 * 60 * 1000;

function vacio(usuariosReales: ReturnType<typeof getUsuariosReales>): Metricas {
  return {
    hayDatos: false,
    totalUsuarios: usuariosReales.length,
    activados: 0,
    activos7: 0,
    activos30: 0,
    totalLogins: 0,
    loginsPorDia: [],
    usoPorSeccion: [],
    foro: { posts: 0, respuestas: 0, reacciones: 0 },
    usuarios: usuariosReales.map((u) => ({
      ...u,
      logins: 0,
      ultimaActividad: null,
      posts: 0,
      respuestas: 0,
    })),
  };
}

export async function getMetricas(): Promise<Metricas> {
  const usuariosReales = getUsuariosReales();
  if (!db) return vacio(usuariosReales);

  const ahora = Date.now();
  const hace7 = new Date(ahora - 7 * DIA_MS).toISOString();
  const hace30 = new Date(ahora - 30 * DIA_MS).toISOString();

  const [porUsuario, [totales], loginsDia, porRuta, [p], [r], [rp], [rr], postsU, respU] =
    await Promise.all([
      db
        .select({
          usuario: eventos.usuario,
          logins: sql<number>`count(*) filter (where ${eventos.tipo} = 'login')`.mapWith(Number),
          ultima: sql<string | null>`max(${eventos.creadoEn})`,
        })
        .from(eventos)
        .groupBy(eventos.usuario),
      db
        .select({
          totalLogins: sql<number>`count(*) filter (where ${eventos.tipo} = 'login')`.mapWith(Number),
          activos7: sql<number>`count(distinct ${eventos.usuario}) filter (where ${eventos.creadoEn} >= ${hace7})`.mapWith(Number),
          activos30: sql<number>`count(distinct ${eventos.usuario}) filter (where ${eventos.creadoEn} >= ${hace30})`.mapWith(Number),
        })
        .from(eventos),
      db
        .select({
          dia: sql<string>`to_char(${eventos.creadoEn}, 'YYYY-MM-DD')`,
          n: count(),
        })
        .from(eventos)
        .where(and(eq(eventos.tipo, "login"), gte(eventos.creadoEn, new Date(hace30))))
        .groupBy(sql`1`),
      db
        .select({ ruta: eventos.ruta, n: count() })
        .from(eventos)
        .where(eq(eventos.tipo, "vista"))
        .groupBy(eventos.ruta),
      db.select({ n: count() }).from(posts),
      db.select({ n: count() }).from(respuestas),
      db.select({ n: count() }).from(reaccionesPost),
      db.select({ n: count() }).from(reaccionesRespuesta),
      db.select({ u: posts.autorUsuario, n: count() }).from(posts).groupBy(posts.autorUsuario),
      db
        .select({ u: respuestas.autorUsuario, n: count() })
        .from(respuestas)
        .groupBy(respuestas.autorUsuario),
    ]);

  const mapEventos = new Map(
    porUsuario.map((f) => [
      f.usuario,
      { logins: f.logins, ultima: f.ultima ? new Date(f.ultima) : null },
    ])
  );
  const mapPosts = new Map(postsU.map((x) => [x.u, Number(x.n)]));
  const mapResp = new Map(respU.map((x) => [x.u, Number(x.n)]));

  const usuarios: MetricaUsuario[] = usuariosReales
    .map((u) => {
      const ev = mapEventos.get(u.usuario);
      return {
        ...u,
        logins: ev?.logins ?? 0,
        ultimaActividad: ev?.ultima ?? null,
        posts: mapPosts.get(u.usuario) ?? 0,
        respuestas: mapResp.get(u.usuario) ?? 0,
      };
    })
    .sort((a, b) => {
      const ta = a.ultimaActividad?.getTime() ?? 0;
      const tb = b.ultimaActividad?.getTime() ?? 0;
      return tb - ta;
    });

  const activados = usuarios.filter((u) => u.logins > 0).length;

  // Serie de logins de los últimos 30 días (rellena días sin datos).
  const mapDia = new Map(loginsDia.map((d) => [d.dia, Number(d.n)]));
  const loginsPorDia: { dia: string; n: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const dia = new Date(ahora - i * DIA_MS).toISOString().slice(0, 10);
    loginsPorDia.push({ dia, n: mapDia.get(dia) ?? 0 });
  }

  // Uso por sección (bucket del pathname).
  const mapSeccion = new Map<string, number>();
  for (const row of porRuta) {
    const s = seccionDe(row.ruta);
    mapSeccion.set(s, (mapSeccion.get(s) ?? 0) + Number(row.n));
  }
  const usoPorSeccion = ORDEN_SECCION.filter((s) => mapSeccion.has(s)).map((s) => ({
    seccion: s,
    n: mapSeccion.get(s)!,
  }));

  return {
    hayDatos: true,
    totalUsuarios: usuariosReales.length,
    activados,
    activos7: totales?.activos7 ?? 0,
    activos30: totales?.activos30 ?? 0,
    totalLogins: totales?.totalLogins ?? 0,
    loginsPorDia,
    usoPorSeccion,
    foro: {
      posts: Number(p?.n ?? 0),
      respuestas: Number(r?.n ?? 0),
      reacciones: Number(rp?.n ?? 0) + Number(rr?.n ?? 0),
    },
    usuarios,
  };
}
