import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { TemaProvider, type Tema } from "@/components/tema/tema-provider";

export const metadata: Metadata = {
  title: "Academia de Liderazgo · Andritz",
  description:
    "Aula virtual de la Academia de Liderazgo de Andritz. Plataforma provista por Adapsys.",
};

// Fija data-theme antes del primer paint: cookie si existe, si no, el sistema.
// Evita el parpadeo para quienes ya eligieron y para la primera visita.
const SCRIPT_TEMA = `(function(){try{var m=document.cookie.match(/(?:^|; )tema=(claro|oscuro)/);var t=m?m[1]:(window.matchMedia('(prefers-color-scheme: dark)').matches?'oscuro':'claro');document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookie = (await cookies()).get("tema")?.value;
  const temaInicial: Tema | null =
    cookie === "claro" || cookie === "oscuro" ? cookie : null;

  return (
    <html
      lang="es"
      data-theme={temaInicial ?? undefined}
      suppressHydrationWarning
    >
      <head>
        <Script id="tema-init" strategy="beforeInteractive">
          {SCRIPT_TEMA}
        </Script>
      </head>
      <body className="min-h-screen">
        <TemaProvider temaInicial={temaInicial}>{children}</TemaProvider>
      </body>
    </html>
  );
}
