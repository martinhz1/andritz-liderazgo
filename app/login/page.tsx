import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Ingresar · Academia de Liderazgo Andritz",
};

const surgir = (delay: string) =>
  `animate-[surgir_0.7s_cubic-bezier(0.22,1,0.36,1)_${delay}_both]`;

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Franja de acento — hilo de marca con el header de la plataforma */}
      <div className="h-[3px] bg-[linear-gradient(90deg,#0c2a3e_0%,#006caf_48%,#5fb4e4_100%)]" />

      <div className="grid flex-1 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Panel de marca (oscuro) ── */}
        <aside className="relative hidden overflow-hidden bg-tinta p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,108,175,0.4), rgba(0,108,175,0) 70%)",
            }}
          />

          {/* Marca */}
          <div className={surgir("0.05s")}>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.55)]">
              <Image
                src="/logos/andritz-simbolo.png"
                alt=""
                width={26}
                height={20}
                className="h-6 w-auto"
                priority
              />
              <Image
                src="/logos/andritz-logo.png"
                alt="Andritz"
                width={92}
                height={22}
                className="h-[18px] w-auto"
                priority
              />
            </div>
            <p className="eyebrow mt-4 text-white/55">Academia de Liderazgo</p>
          </div>

          {/* Tesis */}
          <div className={`max-w-lg ${surgir("0.15s")}`}>
            <p className="eyebrow text-andritz-claro">
              Programa de Liderazgo Adaptativo
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight xl:text-5xl">
              Juntos transformamos los desafíos en progreso
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Tu espacio para preparar, vivir y sostener cada módulo del programa.
            </p>
          </div>

          {/* Signature: la ruta A→B */}
          <div className={`max-w-lg ${surgir("0.25s")}`}>
            <div className="mb-5 flex items-end justify-between">
              <p className="eyebrow text-white/55">A · Dónde estamos</p>
              <p className="eyebrow text-andritz-claro">B · La gran oportunidad</p>
            </div>
            <div className="relative h-4">
              <div className="absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 bg-white/[0.18]" />
              <div className="ruta-trazo absolute inset-x-2 top-1/2 h-[2px] -translate-y-1/2 bg-andritz-claro shadow-[0_0_12px_rgba(95,180,228,0.7)]" />
              <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white/40 bg-tinta" />
              <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-andritz-claro shadow-[0_0_16px_rgba(95,180,228,0.9)] animate-[pulso-nodo_2.6s_ease-in-out_infinite]" />
            </div>
          </div>
        </aside>

        {/* ── Panel de acceso (claro) ── */}
        <div className="flex flex-col bg-white">
          <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
            <div className={`w-full max-w-sm ${surgir("0.1s")}`}>
              {/* Marca (solo móvil, sin el panel oscuro) */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <Image
                  src="/logos/andritz-simbolo.png"
                  alt=""
                  width={30}
                  height={23}
                  className="h-[23px] w-auto"
                  priority
                />
                <Image
                  src="/logos/andritz-logo.png"
                  alt="Andritz"
                  width={110}
                  height={26}
                  className="h-[22px] w-auto"
                  priority
                />
              </div>

              <p className="eyebrow text-andritz">Academia de Liderazgo · Andritz</p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                Ingresa a tu espacio
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-tinta-suave">
                El material, el calendario y los registros del programa, en un solo
                lugar.
              </p>

              <LoginForm />
            </div>
          </div>

          <footer className="px-6 pb-8 sm:px-12">
            <p className="mx-auto max-w-sm font-mono text-xs text-tinta-suave">
              Plataforma provista por{" "}
              <a
                href="https://www.adapsysgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-linea underline-offset-2 transition-colors hover:text-andritz"
              >
                Adapsys
              </a>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
