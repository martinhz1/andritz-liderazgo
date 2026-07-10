"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Tema = "claro" | "oscuro";

interface TemaCtx {
  tema: Tema;
  alternar: () => void;
}

const Ctx = createContext<TemaCtx | null>(null);

const UN_ANIO = 60 * 60 * 24 * 365;

// Fuente de verdad del tema en cliente. El SSR pinta según la cookie (o el
// script inline según el sistema, cuando no hay cookie); aquí sincronizamos y
// exponemos el toggle. El atributo data-theme en <html> es lo que gatilla el CSS.
export function TemaProvider({
  temaInicial,
  children,
}: {
  temaInicial: Tema | null;
  children: React.ReactNode;
}) {
  // SSR determinístico: con cookie usamos su valor; sin cookie arrancamos en
  // "claro" y sincronizamos tras montar con lo que el script inline dejó.
  const [tema, setTema] = useState<Tema>(temaInicial ?? "claro");

  useEffect(() => {
    if (temaInicial) return; // el usuario ya eligió: manda la cookie
    const actual = document.documentElement.dataset.theme;
    if (actual === "oscuro" || actual === "claro") setTema(actual);
  }, [temaInicial]);

  const alternar = useCallback(() => {
    setTema((prev) => {
      const siguiente: Tema = prev === "oscuro" ? "claro" : "oscuro";
      document.documentElement.dataset.theme = siguiente;
      document.cookie = `tema=${siguiente}; path=/; max-age=${UN_ANIO}; SameSite=Lax`;
      return siguiente;
    });
  }, []);

  return <Ctx.Provider value={{ tema, alternar }}>{children}</Ctx.Provider>;
}

export function useTema(): TemaCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTema debe usarse dentro de <TemaProvider>");
  return ctx;
}
