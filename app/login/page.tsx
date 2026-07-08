import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Ingresar · Academia de Liderazgo Andritz",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <div className="mb-10 flex items-center gap-3">
          <Image
            src="/logos/andritz-simbolo.png"
            alt=""
            width={34}
            height={26}
            className="h-[26px] w-auto"
            priority
          />
          <Image
            src="/logos/andritz-logo.png"
            alt="Andritz"
            width={130}
            height={31}
            className="h-[26px] w-auto"
            priority
          />
        </div>

        <p className="eyebrow text-tinta-suave">
          Academia de Liderazgo · Andritz Separation
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight">
          Juntos transformamos
          <br />
          los desafíos en progreso
        </h1>
        <p className="mt-3 text-sm text-tinta-suave">
          Ingresa con tus credenciales para acceder al material del programa.
        </p>

        <LoginForm />

        <div className="mt-8 rounded-md border border-linea bg-white p-4">
          <p className="eyebrow text-tinta-suave">Prototipo · credenciales demo</p>
          <ul className="mt-2 space-y-1 font-mono text-xs text-tinta-suave">
            <li>
              participante / academia2026 <span className="text-linea">·</span>{" "}
              vista líder
            </li>
            <li>
              admin / adapsys2026 <span className="text-linea">·</span> incluye
              resultados de encuesta
            </li>
          </ul>
        </div>
      </div>

      <footer className="border-t border-linea bg-white py-4">
        <p className="text-center font-mono text-xs text-tinta-suave">
          Plataforma provista por{" "}
          <a
            href="https://www.adapsysgroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-linea underline-offset-2 hover:text-andritz"
          >
            Adapsys
          </a>
        </p>
      </footer>
    </main>
  );
}
