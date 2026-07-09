import { getMateriales, getModulos, getSesiones } from "@/lib/content";
import { LineaTiempo, type SesionVM } from "@/components/calendario/linea-tiempo";

export const metadata = { title: "Calendario · Academia de Liderazgo Andritz" };

export default async function CalendarioPage() {
  const [sesiones, modulos, tareas] = await Promise.all([
    getSesiones(),
    getModulos(),
    getMateriales({ tipo: "tareas" }),
  ]);

  const sesionesVM: SesionVM[] = sesiones
    .map((s): SesionVM | null => {
      const modulo = modulos.find((m) => m.id === s.moduloId);
      if (!modulo) return null;
      const tarea = tareas.find((t) => t.moduloId === s.moduloId);
      return {
        id: s.id,
        numero: modulo.numero,
        titulo: modulo.titulo,
        pregunta: modulo.preguntaGuia,
        estado: s.estado,
        fecha: s.fecha,
        horario: s.horario,
        lugar: s.lugar,
        direccion: s.direccion,
        materialHref: `/repositorio?modulo=${modulo.id}`,
        tareaHref: tarea ? `/repositorio/${tarea.slug}` : undefined,
        tareaTitulo: tarea?.titulo,
      };
    })
    .filter((s): s is SesionVM => s !== null)
    .sort((a, b) => a.numero - b.numero);

  const nRealizadas = sesionesVM.filter((s) => s.estado === "realizada").length;
  const nProximas = sesionesVM.length - nRealizadas;
  const resumen = `${nProximas} ${nProximas === 1 ? "sesión próxima" : "sesiones próximas"} · ${nRealizadas} ${nRealizadas === 1 ? "realizada" : "realizadas"}`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_0.04s_both]">
        <div>
          <p className="eyebrow text-andritz">Calendario</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
            Ruta de sesiones
          </h1>
          <p className="mt-3 max-w-xl text-tinta-suave">
            Las cinco sesiones del programa en orden cronológico: fecha, horario,
            lugar y la pregunta que guía cada módulo.
          </p>
        </div>
        <p className="whitespace-nowrap font-mono text-xs text-tinta-suave">
          {resumen}
        </p>
      </div>

      <LineaTiempo sesiones={sesionesVM} />
    </div>
  );
}
