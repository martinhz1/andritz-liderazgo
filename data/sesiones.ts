import type { Sesion } from "@/lib/types";

// TODO: Cargar fechas, horarios y lugares reales del M2 al M5 cuando se
// confirmen. El Módulo 1 ya fue realizado (01/07/26).
export const SESIONES: Sesion[] = [
  {
    id: "s1",
    moduloId: "m1",
    fecha: "01/07/26",
    horario: "09:00 – 13:00",
    lugar: "Oficinas Andritz, Santiago",
    estado: "realizada",
  },
  {
    id: "s2",
    moduloId: "m2",
    fecha: "Por confirmar",
    horario: "Por confirmar",
    lugar: "Por confirmar",
    estado: "proxima",
  },
  {
    id: "s3",
    moduloId: "m3",
    fecha: "Por confirmar",
    horario: "Por confirmar",
    lugar: "Por confirmar",
    estado: "programada",
  },
  {
    id: "s4",
    moduloId: "m4",
    fecha: "Por confirmar",
    horario: "Por confirmar",
    lugar: "Por confirmar",
    estado: "programada",
  },
  {
    id: "s5",
    moduloId: "m5",
    fecha: "Por confirmar",
    horario: "Por confirmar",
    lugar: "Por confirmar",
    estado: "programada",
  },
];
