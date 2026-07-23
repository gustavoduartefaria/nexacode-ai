import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.SUPABASE_DATABASE_URL ?? process.env.DATABASE_URL;
if (!url) {
  throw new Error("SUPABASE_DATABASE_URL ou DATABASE_URL não está configurada.");
}

const client = postgres(url, {
  max: 1,
  connect_timeout: 15,
  idle_timeout: 5,
  prepare: false,
  ssl: "require",
});

try {
  await migrate(drizzle(client), { migrationsFolder: "supabase/migrations" });
  console.log("Migrações do Supabase aplicadas.");
} finally {
  await client.end({ timeout: 5 });
}
