"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, LayoutDashboard, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

// Herramientas de coordinación (solo admin), fuera del nav principal para no
// mezclarlas con las secciones de participante.
const ITEMS = [
  { href: "/resultados", label: "Diagnóstico", Icono: BarChart3 },
  { href: "/adopcion", label: "Adopción", Icono: LineChart },
];

export function MenuAdmin({ pathname }: { pathname: string }) {
  const [abierto, setAbierto] = useState(false);
  const activo = ITEMS.some((i) => pathname.startsWith(i.href));

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [abierto]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((o) => !o)}
        aria-expanded={abierto}
        aria-label="Panel de coordinación"
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-[10px] border px-3 text-[13px] font-medium transition-colors",
          activo
            ? "border-andritz bg-andritz text-white"
            : "border-borde bg-superficie-alta text-ink-suave hover:border-andritz hover:text-acento"
        )}
      >
        <LayoutDashboard className="h-4 w-4" aria-hidden />
        <span className="hidden sm:block">Panel</span>
      </button>

      {abierto && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setAbierto(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-borde bg-superficie-alta p-2 shadow-[0_24px_60px_-30px_rgba(12,42,62,0.6)]"
          >
            <p className="eyebrow px-2 pb-1 pt-1 text-ink-suave">
              Panel de coordinación
            </p>
            {ITEMS.map(({ href, label, Icono }) => {
              const act = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setAbierto(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                    act ? "bg-superficie-suave text-acento" : "text-ink hover:bg-superficie-suave"
                  )}
                >
                  <Icono className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
