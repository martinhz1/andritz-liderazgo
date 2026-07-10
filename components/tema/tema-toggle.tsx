"use client";

import { Moon, Sun } from "lucide-react";
import { useTema } from "@/components/tema/tema-provider";
import { cn } from "@/lib/utils";

// Botón Sol/Luna. Usa tokens semánticos → se tematiza solo. Mismo tamaño que
// los demás botones ícono del header (h-10 w-10).
export function TemaToggle({ className }: { className?: string }) {
  const { tema, alternar } = useTema();
  const oscuro = tema === "oscuro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={oscuro ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "flex h-10 w-10 flex-none items-center justify-center rounded-[10px] border border-borde bg-superficie-alta text-ink-suave transition-colors hover:border-andritz hover:text-acento",
        className
      )}
    >
      {oscuro ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
