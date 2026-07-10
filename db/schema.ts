import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

// Esquema del Foro. La DB guarda SOLO contenido del foro; la identidad de los
// autores vive en el cookie de sesión + data/users.ts (autorUsuario = slug).

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tipo: text("tipo", { enum: ["pregunta", "anuncio", "discusion"] })
      .notNull()
      .default("discusion"),
    titulo: text("titulo").notNull(),
    cuerpo: text("cuerpo").notNull(),
    autorUsuario: text("autor_usuario").notNull(),
    fijado: boolean("fijado").notNull().default(false),
    creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
    actualizadoEn: timestamp("actualizado_en", { withTimezone: true }),
  },
  (t) => [index("posts_orden_idx").on(t.fijado, t.creadoEn)]
);

export const respuestas = pgTable(
  "respuestas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    cuerpo: text("cuerpo").notNull(),
    autorUsuario: text("autor_usuario").notNull(),
    creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
    actualizadoEn: timestamp("actualizado_en", { withTimezone: true }),
  },
  (t) => [index("respuestas_post_idx").on(t.postId, t.creadoEn)]
);

// Reacciones "me gusta": una fila por usuario+objetivo (toggle). Tablas
// separadas para posts y respuestas para mantener el unique simple.
export const reaccionesPost = pgTable(
  "reacciones_post",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    autorUsuario: text("autor_usuario").notNull(),
    creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("reacciones_post_uniq").on(t.postId, t.autorUsuario)]
);

export const reaccionesRespuesta = pgTable(
  "reacciones_respuesta",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    respuestaId: uuid("respuesta_id")
      .notNull()
      .references(() => respuestas.id, { onDelete: "cascade" }),
    autorUsuario: text("autor_usuario").notNull(),
    creadoEn: timestamp("creado_en", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("reacciones_respuesta_uniq").on(t.respuestaId, t.autorUsuario)]
);
