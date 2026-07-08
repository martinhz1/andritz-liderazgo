import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-16 bg-tinta text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:px-6">
        <div>
          <p className="font-display text-sm font-semibold">
            Academia de Liderazgo · Andritz
          </p>
          <p className="mt-1 font-mono text-xs text-white/60">
            Programa de liderazgo centrado en resultados
          </p>
        </div>
        <a
          href="https://www.adapsysgroup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="font-mono text-xs text-white/60 transition-colors group-hover:text-white">
            Plataforma provista por Adapsys
          </span>
          <Image
            src="/logos/adapsys-metrics.png"
            alt="Adapsys Metrics"
            width={64}
            height={64}
            className="h-12 w-12 opacity-80 transition-opacity group-hover:opacity-100"
          />
        </a>
      </div>
    </footer>
  );
}
