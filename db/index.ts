import "server-only";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

type NexaDatabase = PostgresJsDatabase<typeof schema>;

const globalDatabase = globalThis as typeof globalThis & {
  nexaPostgresClient?: Sql;
  nexaDatabase?: NexaDatabase;
};

function databaseUrl() {
  return process.env.SUPABASE_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
}

export function databaseConfigured() {
  return Boolean(databaseUrl());
}

export function getDb(): NexaDatabase {
  const url = databaseUrl();
  if (!url) {
    throw new Error(
      "SUPABASE_DATABASE_URL is not configured. Add the Supabase pooler connection string before using server data.",
    );
  }

  if (!globalDatabase.nexaPostgresClient) {
    globalDatabase.nexaPostgresClient = postgres(url, {
      max: process.env.NODE_ENV === "production" ? 3 : 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: "require",
    });
  }
  globalDatabase.nexaDatabase ??= drizzle(globalDatabase.nexaPostgresClient, { schema });
  return globalDatabase.nexaDatabase;
}
