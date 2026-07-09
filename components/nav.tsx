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

function iniciales(nombre: string) {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

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
    <header className="sticky top-0 z-40 bg-white/[0.86] shadow-[0_1px_0_#e4ebf0,0_14px_34px_-26px_rgba(12,42,62,0.55)] backdrop-blur-[14px] backdrop-saturate-150">
      {/* Franja de acento */}
      <div className="h-[3px] bg-[linear-gradient(90deg,#0c2a3e_0%,#006caf_48%,#5fb4e4_100%)]" />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3.5 md:px-6">
        {/* Marca */}
        <Link href="/" className="flex flex-none items-center gap-3.5">
          <span className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[14px] border border-[#dce7f0] bg-[linear-gradient(150deg,#eaf3fa,#ffffff_70%)] shadow-[0_10px_22px_-14px_rgba(0,108,175,0.6),inset_0_1px_0_#fff]">
            <Image
              src="/logos/andritz-simbolo.png"
              alt=""
              width={28}
              height={22}
              className="h-7 w-auto"
            />
          </span>
          <span className="flex flex-col items-start gap-1">
            <Image
              src="/logos/andritz-logo.png"
              alt="Andritz"
              width={110}
              height={26}
              className="h-[17px] w-auto flex-none"
            />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#6a7f8e]">
              Academia de Liderazgo
            </span>
          </span>
        </Link>

        {/* Navegación (segmented control) */}
        <nav
          aria-label="Navegación principal"
          className="order-3 w-full lg:order-2 lg:w-auto lg:flex-1 lg:flex lg:justify-center"
        >
          <ul className="flex gap-0.5 overflow-x-auto rounded-[13px] border border-[#e1e9ef] bg-[#eef3f7] p-1.5">
            {links.map((l) => {
              const activo =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "block whitespace-nowrap rounded-[9px] px-3.5 py-2 text-[13.5px] transition-colors",
                      activo
                        ? "bg-andritz font-semibold text-white shadow-[0_8px_18px_-8px_rgba(0,108,175,0.75)]"
                        : "font-medium text-tinta-suave hover:bg-white hover:text-tinta"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Usuario */}
        <div className="order-2 ml-auto flex flex-none items-center gap-2.5 lg:order-3 lg:ml-0">
          <div className="flex items-center gap-2.5 rounded-full border border-[#e4ebf0] bg-hueso p-1 pr-1.5">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[linear-gradient(140deg,#006caf,#0c2a3e)] font-display text-xs font-bold tracking-wide text-white">
              {iniciales(nombre)}
            </span>
            <span className="hidden text-[13px] font-medium text-tinta sm:block">
              {nombre}
            </span>
          </div>
          <button
            onClick={cerrarSesion}
            aria-label="Cerrar sesión"
            title="Salir"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-linea bg-white text-tinta-suave transition-colors hover:border-andritz hover:text-andritz"
          >
            <LogOut className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
