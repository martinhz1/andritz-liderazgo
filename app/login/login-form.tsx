"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function ingresar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "No pudimos validar tus credenciales.");
        setCargando(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setCargando(false);
    }
  }

  return (
    <form onSubmit={ingresar} className="mt-8 space-y-4">
      <div>
        <label
          htmlFor="usuario"
          className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-[0.1em] text-tinta-suave"
        >
          Usuario
        </label>
        <input
          id="usuario"
          name="usuario"
          type="text"
          autoComplete="username"
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full rounded-md border border-linea bg-white px-3 py-2.5 text-sm text-tinta outline-none transition-colors focus:border-andritz"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-[0.1em] text-tinta-suave"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-linea bg-white px-3 py-2.5 text-sm text-tinta outline-none transition-colors focus:border-andritz"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-magenta-ad/30 bg-magenta-ad/5 px-3 py-2 text-sm text-magenta-ad"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={cargando}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-andritz px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro disabled:opacity-60"
      >
        {cargando ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <>
            Ingresar
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
