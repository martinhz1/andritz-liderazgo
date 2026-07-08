import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-tinta-suave">Error 404</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
        Esta página no existe
      </h1>
      <p className="mt-2 max-w-md text-sm text-tinta-suave">
        El contenido que buscas no está en la plataforma o fue movido.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-andritz px-4 py-2.5 text-sm font-semibold text-white hover:bg-andritz-oscuro"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
