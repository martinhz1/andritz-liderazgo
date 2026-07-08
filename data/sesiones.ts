import type { Sesion } from "@/lib/types";

// TODO: Reemplazar fechas, horarios y lugares por los reales del programa.
// El Módulo 1 ya fue realizado (01/07/26 según el material de la jornada).
export const SESIONES: Sesion[] = [
  {
    id: "s1",
    moduloId: "m1",
    fecha: "01/07/26",
    horario: "09:00 – 13:00",
    lugar: "Oficinas Andritz Separation, Santiago",
    estado: "realizada",
  },
  {
    id: "s2",
    moduloId: "m2",
    fecha: "12/08/26", // TODO: fecha real
    horario: "09:00 – 13:00", // TODO: horario real
    lugar: "Por confirmar", // TODO: lugar real
    estado: "proxima",
  },
  {
    id: "s3",
    moduloId: "m3",
    fecha: "09/09/26", // TODO: fecha real
    horario: "09:00 – 13:00",
    lugar: "Por confirmar",
    estado: "programada",
  },
  {
    id: "s4",
    moduloId: "m4",
    fecha: "07/10/26", // TODO: fecha real
    horario: "09:00 – 13:00",
    lugar: "Por confirmar",
    estado: "programada",
  },
  {
    id: "s5",
    moduloId: "m5",
    fecha: "04/11/26", // TODO: fecha real
    horario: "09:00 – 13:00",
    lugar: "Por confirmar",
    estado: "programada",
  },
];
