"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cambiarContrasena } from "@/app/(plataforma)/cuenta/actions";

const INPUT =
  "w-full rounded-lg border border-borde bg-superficie-alta px-3.5 py-2.5 text-sm text-ink outline-none transition-shadow focus:border-andritz focus:ring-2 focus:ring-andritz/15";
const LABEL =
  "mb-1.5 block font-mono text-xs font-medium uppercase tracking-[0.1em] text-ink-suave";

const MIN = 8;

export function FormContrasena() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);

    if (nueva.length < MIN) {
      setError(`La nueva contraseña debe tener al menos ${MIN} caracteres.`);
      return;
    }
    if (nueva !== confirmar) {
      setError("La confirmación no coincide con la nueva contraseña.");
      return;
    }

    setCargando(true);
    const res = await cambiarContrasena({ actual, nueva });
    setCargando(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    setOk(true);
    setActual("");
    setNueva("");
    setConfirmar("");
  }

  return (
    <form
      onSubmit={enviar}
      method="post"
      className="mt-6 space-y-4"
    >
      <div>
        <label htmlFor="actual" className={LABEL}>
          Contraseña actual
        </label>
        <input
          id="actual"
          name="actual"
          type="password"
          autoComplete="current-password"
          required
          value={actual}
          onChange={(e) => setActual(e.target.value)}
          className={INPUT}
        />
      </div>

      <div>
        <label htmlFor="nueva" className={LABEL}>
          Nueva contraseña
        </label>
        <input
          id="nueva"
          name="nueva"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN}
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className={INPUT}
        />
        <p className="mt-1.5 font-mono text-[11px] text-ink-suave">
          Mínimo {MIN} caracteres.
        </p>
      </div>

      <div>
        <label htmlFor="confirmar" className={LABEL}>
          Repite la nueva contraseña
        </label>
        <input
          id="confirmar"
          name="confirmar"
          type="password"
          autoComplete="new-password"
          required
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          className={INPUT}
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

      {ok && (
        <p
          role="status"
          className="flex items-center gap-2 rounded-md border border-borde bg-superficie-suave px-3 py-2 text-sm text-ink"
        >
          <Check className="h-4 w-4 flex-none text-teal-ad" aria-hidden />
          Listo, tu contraseña se actualizó. Úsala la próxima vez que ingreses.
        </p>
      )}

      <button
        type="submit"
        disabled={cargando}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-andritz px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,108,175,0.8)] transition-colors hover:bg-andritz-oscuro disabled:opacity-60"
      >
        {cargando ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          "Guardar contraseña"
        )}
      </button>
    </form>
  );
}
