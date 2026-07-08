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
];
