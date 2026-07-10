import { getMateriales, getModulosConEstado } from "@/lib/content";
import { RailModulos } from "@/components/repositorio/rail-modulos";
import { RepositorioResultados } from "@/components/repositorio/resultados";
import { MarcarVista } from "@/components/notificaciones/marcar-vista";

export const metadata = { title: "Repositorio · Academia de Liderazgo Andritz" };

export default async function RepositorioPage({
  searchParams,
}: {
  searchParams: Promise<{ modulo?: string }>;
}) {
  const { modulo } = await searchParams;
  const [modulos, materialesTodos] = await Promise.all([
    getModulosConEstado(),
    getMateriales(),
  ]);

  const moduloActivo = modulos.some((m) => m.id === modulo) ? modulo : undefined;
  const moduloCtx = modulos.find((m) => m.id === moduloActivo);

  // Contadores por módulo (estables: ignoran tipo/búsqueda).
  const counts: Record<string, number> = {};
  for (const mat of materialesTodos) {
    counts[mat.moduloId] = (counts[mat.moduloId] ?? 0) + 1;
  }
  const numerosModulo = Object.fromEntries(modulos.map((m) => [m.id, m.numero]));

  const materialesPanel = moduloActivo
    ? materialesTodos.filter((m) => m.moduloId === moduloActivo)
    : materialesTodos;

  return (
    <div>
      <MarcarVista fuente="repositorio" />
      <div className="animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.04s_both]">
        <p className="eyebrow text-andritz">Repositorio</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Material del programa
        </h1>
        <p className="mt-3 max-w-xl text-tinta-suave">
          Todo el material de la academia, organizado por módulo y tipo. Antes de
          cada sesión encontrarás aquí las lecturas y tareas correspondientes.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[264px_1fr]">
        <RailModulos
          modulos={modulos}
          counts={counts}
          total={materialesTodos.length}
          moduloActivo={moduloActivo}
          className="animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.12s_both]"
        />

        <div className="min-w-0 animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.18s_both]">
          {moduloCtx && (
            <div className="relative mb-5 overflow-hidden rounded-2xl bg-tinta p-6 text-white md:px-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[60px] -top-[90px] h-[280px] w-[280px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,108,175,0.4), transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="eyebrow text-andritz-claro">
                  Módulo {String(moduloCtx.numero).padStart(2, "0")} ·{" "}
                  {ESTADO_LABEL[moduloCtx.estado]}
                </p>
                <h2 className="mt-2 font-display text-[26px] font-bold tracking-tight">
                  {moduloCtx.titulo}
                </h2>
                <p className="mt-3.5 max-w-2xl border-l-[3px] border-andritz-claro pl-3.5 text-[15px] italic leading-snug text-white/[0.78]">
                  {moduloCtx.preguntaGuia}
                </p>
              </div>
            </div>
          )}

          <RepositorioResultados
            materiales={materialesPanel}
            numerosModulo={numerosModulo}
            modulo={moduloCtx ? { numero: moduloCtx.numero } : undefined}
          />
        </div>
      </div>
    </div>
  );
}

const ESTADO_LABEL: Record<string, string> = {
  realizada: "realizada",
  proxima: "próxima",
  programada: "programada",
};
