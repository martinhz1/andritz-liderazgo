import type { Usuario } from "@/lib/types";

// Prototipo: usuarios mock. En producción migrar a un proveedor real
// y NUNCA versionar contraseñas en el repo.
export const USERS: Usuario[] = [
  {
    usuario: "participante",
    password: "academia2026",
    rol: "participante",
    nombre: "Líder Andritz",
  },
  {
    usuario: "admin",
    password: "adapsys2026",
    rol: "admin",
    nombre: "Equipo Adapsys",
  },
  // Admins nombrados (ven Resultados de encuesta). El login normaliza el
  // usuario a minúsculas, así que puede escribirse con o sin mayúsculas.
  {
    usuario: "isidora-diaz",
    password: "H2YudseRGK26tL",
    rol: "admin",
    nombre: "Isidora Díaz",
  },
  {
    usuario: "marcela-ferrari",
    password: "idHSDt5YMGNAd2",
    rol: "admin",
    nombre: "Marcela Ferrari",
  },
  {
    usuario: "magdalena-toral",
    password: "d5EVfZMycNxiBa",
    rol: "admin",
    nombre: "Magdalena Toral",
  },
  {
    usuario: "martin-henriquez",
    password: "SXAMbmasaWMWbL",
    rol: "admin",
    nombre: "Martín Henríquez",
  },
];
