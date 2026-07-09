import type { Usuario } from "@/lib/types";

// Usuarios de la plataforma. Se guarda SOLO el hash PBKDF2 (ver lib/password.ts),
// nunca la contraseña en texto plano. Para agregar usuarios se genera el hash
// con el mismo esquema; las contraseñas se entregan a cada persona por un canal
// seguro y no se versionan.
export const USERS: Usuario[] = [
  {
    usuario: "participante",
    hash: "pbkdf2$120000$XS8zZgyfjHA8-wNctvqLDQ$1WyIuFWbvv8EQu7lukVVXSEu65yxLHxNthwuvOopJnQ",
    rol: "participante",
    nombre: "Líder Andritz",
  },
  {
    usuario: "admin",
    hash: "pbkdf2$120000$iLrujlrXffDO8gMGV8AePw$xKvsIDT1yEfRExuBq5ww0nyrrgH1hS0TA2XkaL2GhB0",
    rol: "admin",
    nombre: "Equipo Adapsys",
  },
  {
    usuario: "isidora-diaz",
    hash: "pbkdf2$120000$1hmvgbmy1d8k-eiCNpuVIA$Si3_W9n4guk-LWoXR7BqXfo8tpFIWnDKOav95yWblb0",
    rol: "admin",
    nombre: "Isidora Díaz",
  },
  {
    usuario: "marcela-ferrari",
    hash: "pbkdf2$120000$KVAa92K-dO7qKzGyq8o8DA$uQ0MyoyHmmMVAByEaIpqgoxxZlrDowuIzNw5rTD0hzs",
    rol: "admin",
    nombre: "Marcela Ferrari",
  },
  {
    usuario: "magdalena-toral",
    hash: "pbkdf2$120000$aEQ6mDzgZad0Vg63py2Dhg$uNkdCcHFKX8aC5WPaWeVZl8C0LjZGVxj3Vdq8zaKc0s",
    rol: "admin",
    nombre: "Magdalena Toral",
  },
  {
    usuario: "martin-henriquez",
    hash: "pbkdf2$120000$zhVkl0RQhgdQApOkc-DdyQ$-TVKgyOfYBoxFJem5uyiAwnbTWhgt73zyqSNR9ER2Jc",
    rol: "admin",
    nombre: "Martín Henríquez",
  },
];
