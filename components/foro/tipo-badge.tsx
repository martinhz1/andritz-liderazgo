import { HelpCircle, Megaphone, MessagesSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TipoPost } from "@/lib/foro";

const MAPA: Record<TipoPost, { label: string; clase: string; Icono: LucideIcon }> = {
  pregunta: { label: "Pregunta", clase: "bg-andritz/10 text-andritz", Icono: HelpCircle },
  anuncio: { label: "Anuncio", clase: "bg-teal-ad/10 text-teal-ad", Icono: Megaphone },
  discusion: {
    label: "Discusión",
    clase: "bg-linea/60 text-tinta-suave",
    Icono: MessagesSquare,
  },
};

export function TipoBadge({ tipo }: { tipo: TipoPost }) {
  const { label, clase, Icono } = MAPA[tipo];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em]",
        clase
      )}
    >
      <Icono className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}
