import { cn } from "@/lib/utils";

type Variant = "andritz" | "neutro" | "alerta" | "outline";

const estilos: Record<Variant, string> = {
  andritz: "bg-andritz text-white",
  neutro: "bg-linea/60 text-tinta-suave",
  alerta: "bg-magenta-ad/10 text-magenta-ad border border-magenta-ad/30",
  outline: "border border-linea text-tinta-suave bg-white",
};

export function Badge({
  children,
  variant = "neutro",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
        estilos[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
