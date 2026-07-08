import { Galeria } from "@/components/galeria";
import { Badge } from "@/components/ui/badge";
import { getModulos, getRegistros, getSesiones } from "@/lib/content";

export const metadata = {
  title: "Registros gráficos · Academia de Liderazgo Andritz",
};

export default async function RegistrosPage() {
  const [registros, sesiones, modulos] = await Promise.all([
    getRegistros(),
    getSesiones(),
    getModulos(),
  ]);

  return (
    <div>
      <p className="eyebrow text-tinta-suave">Registros gráficos</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
        La academia en imágenes
      </h1>
      <p className="mt-2 max-w-2xl text-tinta-suave">
        Fotografías de cada jornada. Después de cada sesión publicamos aquí el
        registro del trabajo del equipo.
      </p>

      <div className="mt-10 space-y-12">
        {registros.map((registro) => {
          const sesion = sesiones.find((s) => s.id === registro.sesionId);
          const modulo = modulos.find((m) => m.id === sesion?.moduloId);
          return (
            <section key={registro.sesionId} aria-label={registro.titulo}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {registro.titulo}
                </h2>
                {sesion && <Badge variant="outline">{sesion.fecha}</Badge>}
                {modulo && (
                  <span className="font-mono text-xs text-tinta-suave">
                    Módulo {String(modulo.numero).padStart(2, "0")}
                  </span>
                )}
              </div>
              <Galeria titulo={registro.titulo} fotos={registro.fotos} />
            </section>
          );
        })}
      </div>

      {/* TODO: subir las fotos reales a /public/registros/m1/ y actualizar data/registros.ts */}
    </div>
  );
}
