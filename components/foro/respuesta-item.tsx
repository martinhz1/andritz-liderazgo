"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Autor } from "./autor";
import { BotonReaccion } from "./boton-reaccion";
import { editarRespuesta, eliminarRespuesta } from "@/app/(plataforma)/foro/actions";
import type { RespuestaForo } from "@/lib/foro";

const BTN =
  "rounded-md p-1.5 text-tinta-suave transition-colors hover:bg-hueso hover:text-tinta disabled:opacity-50";

export function RespuestaItem({
  respuesta,
  postId,
  esAutor,
  esCoordinador,
}: {
  respuesta: RespuestaForo;
  postId: string;
  esAutor: boolean;
  esCoordinador: boolean;
}) {
  const [editando, setEditando] = useState(false);
  const [cuerpo, setCuerpo] = useState(respuesta.cuerpo);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function guardar() {
    setError(null);
    start(async () => {
      const r = await editarRespuesta({ id: respuesta.id, cuerpo });
      if (r.ok) setEditando(false);
      else setError(r.error);
    });
  }

  function eliminar() {
    if (!confirm("¿Eliminar esta respuesta?")) return;
    start(async () => {
      await eliminarRespuesta(respuesta.id);
    });
  }

  return (
    <li className="border-t border-linea/70 py-4 first:border-t-0">
      <div className="flex items-start justify-between gap-3">
        <Autor
          autor={respuesta.autor}
          fecha={respuesta.creadoEn}
          editado={!!respuesta.actualizadoEn}
        />
        {(esAutor || esCoordinador) && !editando && (
          <div className="flex flex-none gap-0.5">
            {esAutor && (
              <button
                type="button"
                onClick={() => setEditando(true)}
                aria-label="Editar respuesta"
                title="Editar"
                className={BTN}
              >
                <Pencil className="h-4 w-4" aria-hidden />
              </button>
            )}
            <button
              type="button"
              onClick={eliminar}
              disabled={pending}
              aria-label="Eliminar respuesta"
              title="Eliminar"
              className={BTN}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>

      {editando ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
            rows={3}
            maxLength={5000}
            className="w-full resize-y rounded-lg border border-linea bg-white px-3.5 py-2.5 text-sm text-tinta outline-none transition-shadow focus:border-andritz focus:ring-2 focus:ring-andritz/15"
          />
          {error && (
            <p role="alert" className="text-sm text-magenta-ad">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditando(false);
                setCuerpo(respuesta.cuerpo);
                setError(null);
              }}
              className="rounded-lg border border-linea bg-white px-3.5 py-2 text-sm font-medium text-tinta-suave transition-colors hover:border-andritz hover:text-andritz"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={guardar}
              disabled={pending}
              className="rounded-lg bg-andritz px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-andritz-oscuro disabled:opacity-60"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-tinta">
          {respuesta.cuerpo}
        </p>
      )}

      <div className="mt-3">
        <BotonReaccion
          objetivo={{ tipo: "respuesta", respuestaId: respuesta.id, postId }}
          n={respuesta.nReacciones}
          activo={respuesta.yaReacciono}
        />
      </div>
    </li>
  );
}
