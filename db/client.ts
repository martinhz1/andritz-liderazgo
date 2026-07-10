import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Cliente Drizzle sobre Neon (HTTP). Si no hay DATABASE_URL, `db` es null: la
// app compila y el resto sigue funcionando; la capa lib/foro.ts trata ese caso
// (feed vacío) y las server actions fallan con un mensaje claro.
const url = process.env.DATABASE_URL;

export const db = url ? drizzle(neon(url), { schema }) : null;

export type DB = NonNullable<typeof db>;
