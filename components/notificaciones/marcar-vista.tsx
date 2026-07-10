"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { marcarSeccionVista } from "@/app/(plataforma)/notificaciones/actions";

// Marca la sección como vista al montar (visitar la página) y refresca el
// header para actualizar la campana. No renderiza nada.
export function MarcarVista({ fuente }: { fuente: "foro" | "repositorio" }) {
  const router = useRouter();
  const hecho = useRef(false);

  useEffect(() => {
    if (hecho.current) return;
    hecho.current = true;
    (async () => {
      await marcarSeccionVista(fuente);
      router.refresh();
    })();
  }, [fuente, router]);

  return null;
}
