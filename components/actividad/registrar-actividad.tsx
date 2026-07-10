"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { registrarVista } from "@/app/(plataforma)/adopcion/actions";

// Registra una visita cada vez que cambia la ruta (analítica de adopción).
// Deduplica rutas consecutivas iguales. No renderiza nada.
export function RegistrarActividad() {
  const pathname = usePathname();
  const ultima = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === ultima.current) return;
    ultima.current = pathname;
    void registrarVista(pathname);
  }, [pathname]);

  return null;
}
