import { BadgeCheck } from "lucide-react";

// Insignia que distingue los posteos de coordinadores del programa (rol admin).
export function BadgeCoordinador() {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm bg-andritz px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-white">
      <BadgeCheck className="h-3 w-3" aria-hidden />
      Coordinador/a del programa
    </span>
  );
}
