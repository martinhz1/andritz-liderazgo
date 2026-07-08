"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Rol } from "@/lib/types";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/repositorio", label: "Repositorio" },
  { href: "/calendario", label: "Calendario" },
  { href: "/registros", label: "Registros gráficos" },
];

export function Nav({ nombre, rol }: { nombre: string; rol: Rol }) {
  const pathname = usePathname();
  const router = useRouter();

  const links =
    rol === "admin"
      ? [...LINKS, { href: "/resultados", label: "Resultados de encuesta" }]
      : LINKS;

  async function cerrarSesion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logos/andritz-simbolo.png"
            alt=""
            width={28}
            height={21}
            className="h-[21px] w-auto"
          />
          <Image
            src="/logos/andritz-logo.png"
            alt="Andritz"
            width={110}
            height={26}
            className="hidden h-[22px] w-auto sm:block"
          />
          <span className="hidden border-l border-linea pl-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-tinta-suave lg:block">
            Academia de Liderazgo
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs text-tinta-suave md:block">
            {nombre}
          </span>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-1.5 rounded-sm border border-linea px-2.5 py-1.5 font-mono text-xs text-tinta-suave transition-colors hover:border-andritz hover:text-andritz"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Salir
          </button>
        </div>
      </div>

      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-6xl overflow-x-auto px-4 md:px-6"
      >
        <ul className="flex gap-1">
          {links.map((l) => {
            const activo =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap border-b-2 px-3 pb-2.5 pt-1 text-sm font-medium transition-colors",
                    activo
                      ? "border-andritz text-andritz"
                      : "border-transparent text-tinta-suave hover:text-tinta"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
