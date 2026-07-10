"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import {
  alternarReaccionPost,
  alternarReaccionRespuesta,
} from "@/app/(plataforma)/foro/actions";
import { cn } from "@/lib/utils";

type Objetivo =
  | { tipo: "post"; postId: string }
  | { tipo: "respuesta"; respuestaId: string; postId: string };

export function BotonReaccion({
  objetivo,
  n,
  activo,
}: {
  objetivo: Objetivo;
  n: number;
  activo: boolean;
}) {
  const [estado, setEstado] = useState({ activo, n });
  const [pending, start] = useTransition();

  // Sincroniza cuando el servidor revalida y llegan props nuevas.
  useEffect(() => setEstado({ activo, n }), [activo, n]);

  function alternar() {
    setEstado((e) => ({ activo: !e.activo, n: e.n + (e.activo ? -1 : 1) }));
    start(async () => {
      const r =
        objetivo.tipo === "post"
          ? await alternarReaccionPost(objetivo.postId)
          : await alternarReaccionRespuesta({
              respuestaId: objetivo.respuestaId,
              postId: objetivo.postId,
            });
      if (r && r.ok === false) setEstado({ activo, n }); // revertir
    });
  }

  return (
    <button
      type="button"
      onClick={alternar}
      disabled={pending}
      aria-pressed={estado.activo}
      aria-label={estado.activo ? "Quitar me gusta" : "Me gusta"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs transition-colors",
        estado.activo
          ? "border-andritz bg-andritz/5 text-acento"
          : "border-borde text-ink-suave hover:border-andritz hover:text-acento"
      )}
    >
      <Heart className={cn("h-3.5 w-3.5", estado.activo && "fill-current")} aria-hidden />
      {estado.n}
    </button>
  );
}
