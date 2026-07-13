import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_SESION, verificarToken } from "@/lib/session";
import { FormContrasena } from "@/components/cuenta/form-contrasena";

export const metadata = { title: "Mi cuenta · Academia de Liderazgo Andritz" };

const CARD =
  "rounded-2xl border border-borde bg-superficie-alta p-6 shadow-[0_18px_44px_-32px_rgba(12,42,62,0.5)]";

const surgir = (delay: string) =>
  `animate-[surgir_0.6s_cubic-bezier(0.22,1,0.36,1)_${delay}_both]`;

export default async function CuentaPage() {
  const store = await cookies();
  const sesion = await verificarToken(store.get(COOKIE_SESION)?.value);
  if (!sesion) redirect("/login");

  const esAdmin = sesion.r === "admin";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Encabezado */}
      <div className={surgir("0.04s")}>
        <p className="eyebrow text-acento">Mi cuenta</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Mi cuenta
        </h1>
        <p className="mt-3 text-ink-suave">
          Tus datos de acceso a la plataforma.
        </p>
      </div>

      {/* Datos de la cuenta */}
      <div className={`mt-8 ${CARD} ${surgir("0.1s")}`}>
        <dl className="grid gap-4 sm:grid-cols-3">
          <Dato etiqueta="Nombre" valor={sesion.n} />
          <Dato etiqueta="Usuario" valor={sesion.u} mono />
          <Dato
            etiqueta="Rol"
            valor={esAdmin ? "Coordinación del programa" : "Participante"}
          />
        </dl>
      </div>

      {/* Cambiar contraseña */}
      <section
        aria-labelledby="pass-tit"
        className={`mt-6 ${CARD} ${surgir("0.16s")}`}
      >
        <h2
          id="pass-tit"
          className="font-display text-lg font-bold tracking-tight"
        >
          Cambiar contraseña
        </h2>
        <p className="mt-1 text-sm text-ink-suave">
          Elige una contraseña nueva; la usarás la próxima vez que ingreses.
        </p>
        <div className="max-w-md">
          <FormContrasena />
        </div>
      </section>
    </div>
  );
}

function Dato({
  etiqueta,
  valor,
  mono,
}: {
  etiqueta: string;
  valor: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="eyebrow text-ink-suave">{etiqueta}</dt>
      <dd className={`mt-1 text-ink ${mono ? "font-mono text-sm" : ""}`}>
        {valor}
      </dd>
    </div>
  );
}
