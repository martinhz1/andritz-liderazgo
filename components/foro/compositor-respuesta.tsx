"use client";

import { useState, useTransition } from "react";
import { crearRespuesta } from "@/app/(plataforma)/foro/actions";
import { cn } from "@/lib/utils";

export function CompositorRespuesta({ postId }: { postId: string }) {
  const [cuerpo, setCuerpo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    start(async () => {
      const r = await crearRespuesta({ postId, cuerpo });
      if (r.ok) setCuerpo("");
      else setError(r.error);
    });
  }

  return (
    <form onSubmit={enviar} className="space-y-2">
      <label htmlFor="respuesta" className="sr-only">
        Tu respuesta
      </label>
      <textarea
        id="respuesta"
        value={cuerpo}
        onChange={(e) => setCuerpo(e.target.value)}
        placeholder="Escribe una respuesta…"
        rows={3}
        maxLength={5000}
        className="w-full resize-y rounded-lg border border-borde bg-superficie-alta px-3.5 py-2.5 text-sm text-ink outline-none transition-shadow focus:border-andritz focus:ring-2 focus:ring-andritz/15"
      />
      {error && (
        <p role="alert" className="text-sm text-magenta-ad">
          {error}
        </p>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || !cuerpo.trim()}
          className={cn(
            "rounded-lg bg-andritz px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro",
            "disabled:opacity-60"
          )}
        >
          {pending ? "Enviando…" : "Responder"}
        </button>
      </div>
    </form>
  );
}
