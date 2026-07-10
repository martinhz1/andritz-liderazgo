import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { getMetricas } from "@/lib/metricas";
import { LoginsPorDia } from "@/components/charts/logins-por-dia";
import { UsoPorSeccion } from "@/components/charts/uso-por-seccion";
import { tiempoRelativo } from "@/lib/utils";

export const metadata = { title: "Adopción · Academia de Liderazgo Andritz" };

const CARD =
  "rounded-2xl border border-borde bg-superficie-alta p-6 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]";

const surgir = (delay: string) =>
  `animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_${delay}_both]`;

export default async function AdopcionPage() {
  const store = await cookies();
  const sesion = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!sesion) redirect("/login");
  if (sesion.r !== "admin") redirect("/");

  const m = await getMetricas();
  const pct = m.totalUsuarios
    ? Math.round((m.activados / m.totalUsuarios) * 100)
    : 0;

  return (
    <div>
      {/* Encabezado */}
      <div className={surgir("0.04s")}>
        <p className="eyebrow text-acento">Adopción</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Adopción de la plataforma
        </h1>
        <p className="mt-3 max-w-2xl text-ink-suave">
          Uso de la Academia por parte del equipo, para seguimiento interno de
          Adapsys. La actividad se registra desde el lanzamiento; los tiempos son
          aproximados.
        </p>
      </div>

      {/* KPI row */}
      <div className={`mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${surgir("0.1s")}`}>
        <div className={CARD}>
          <p className="eyebrow text-ink-suave">Adopción</p>
          <div className="mt-2 flex items-end gap-2.5">
            <span className="font-display text-5xl font-extrabold leading-none text-ink">
              {pct}
              <span className="text-2xl">%</span>
            </span>
          </div>
          <p className="mt-2 font-mono text-xs text-ink-suave">
            {m.activados} de {m.totalUsuarios} han ingresado
          </p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-superficie-suave">
            <div
              className="h-full rounded-full bg-cyan-ad"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <TileNumero titulo="Activos · 7 días" valor={m.activos7} sufijo="usuarios" />
        <TileNumero titulo="Activos · 30 días" valor={m.activos30} sufijo="usuarios" />
        <TileNumero titulo="Inicios de sesión" valor={m.totalLogins} sufijo="en total" />
      </div>

      {/* Gráficos */}
      <div className={`mt-6 grid gap-4 lg:grid-cols-2 ${surgir("0.16s")}`}>
        <section aria-labelledby="logins-tit" className={CARD}>
          <h2 id="logins-tit" className="font-display text-lg font-bold tracking-tight">
            Inicios de sesión por día
          </h2>
          <p className="mt-1 text-sm text-ink-suave">Últimos 30 días.</p>
          <div className="mt-4">
            {m.totalLogins > 0 ? (
              <LoginsPorDia datos={m.loginsPorDia} />
            ) : (
              <VacioMini texto="Aún no hay inicios de sesión registrados." />
            )}
          </div>
        </section>

        <section aria-labelledby="secciones-tit" className={CARD}>
          <h2 id="secciones-tit" className="font-display text-lg font-bold tracking-tight">
            Uso por sección
          </h2>
          <p className="mt-1 text-sm text-ink-suave">
            Visitas a cada parte de la plataforma.
          </p>
          <div className="mt-4">
            {m.usoPorSeccion.length > 0 ? (
              <UsoPorSeccion datos={m.usoPorSeccion} />
            ) : (
              <VacioMini texto="Aún no hay visitas registradas." />
            )}
          </div>
        </section>
      </div>

      {/* Engagement del foro */}
      <section aria-labelledby="foro-tit" className={`mt-6 ${CARD} ${surgir("0.22s")}`}>
        <h2 id="foro-tit" className="font-display text-lg font-bold tracking-tight">
          Actividad en el foro
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <StatForo valor={m.foro.posts} etiqueta="Publicaciones" />
          <StatForo valor={m.foro.respuestas} etiqueta="Respuestas" />
          <StatForo valor={m.foro.reacciones} etiqueta="Reacciones" />
        </div>
      </section>

      {/* Tabla por persona */}
      <section aria-labelledby="tabla-tit" className={`mt-6 ${CARD} ${surgir("0.28s")}`}>
        <h2 id="tabla-tit" className="font-display text-lg font-bold tracking-tight">
          Actividad por persona
        </h2>
        <p className="mt-1 text-sm text-ink-suave">
          {m.totalUsuarios} usuarios del programa.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-borde text-left font-mono text-[11px] uppercase tracking-wide text-ink-suave">
                <th className="pb-2 pr-3 font-medium">Persona</th>
                <th className="pb-2 pr-3 text-right font-medium">Inicios</th>
                <th className="pb-2 pr-3 font-medium">Última actividad</th>
                <th className="pb-2 pr-3 text-right font-medium">Posts</th>
                <th className="pb-2 text-right font-medium">Respuestas</th>
              </tr>
            </thead>
            <tbody>
              {m.usuarios.map((u) => (
                <tr key={u.usuario} className="border-b border-borde/60 last:border-0">
                  <td className="py-2.5 pr-3">
                    <span className="flex items-center gap-1.5">
                      <span className="font-medium text-ink">{u.nombre}</span>
                      {u.esCoordinador && (
                        <BadgeCheck className="h-3.5 w-3.5 text-acento" aria-label="Coordinador/a" />
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums text-ink">
                    {u.logins}
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-ink-suave">
                    {u.ultimaActividad ? tiempoRelativo(u.ultimaActividad) : "nunca"}
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums text-ink-suave">
                    {u.posts}
                  </td>
                  <td className="py-2.5 text-right font-mono tabular-nums text-ink-suave">
                    {u.respuestas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TileNumero({
  titulo,
  valor,
  sufijo,
}: {
  titulo: string;
  valor: number;
  sufijo: string;
}) {
  return (
    <div className={CARD}>
      <p className="eyebrow text-ink-suave">{titulo}</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="font-display text-3xl font-bold leading-none text-ink">
          {valor}
        </span>
        <span className="mb-0.5 text-sm text-ink-suave">{sufijo}</span>
      </div>
    </div>
  );
}

function StatForo({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  return (
    <div className="rounded-xl border border-borde/70 p-4 text-center">
      <p className="font-display text-2xl font-bold text-ink">{valor}</p>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-suave">
        {etiqueta}
      </p>
    </div>
  );
}

function VacioMini({ texto }: { texto: string }) {
  return (
    <p className="rounded-lg border border-dashed border-borde px-3 py-8 text-center text-sm text-ink-suave">
      {texto}
    </p>
  );
}
