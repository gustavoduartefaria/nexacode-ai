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
  await client.begin(async (sql) => {
    await sql`
      CREATE TABLE IF NOT EXISTS ai_response_cache (
        cache_key text PRIMARY KEY,
        lesson_id text NOT NULL,
        intent text NOT NULL,
        response_json text NOT NULL,
        hits integer DEFAULT 0 NOT NULL,
        expires_at timestamp with time zone NOT NULL,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS mentor_attempts (
        id text PRIMARY KEY,
        user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        lesson_id text NOT NULL,
        exercise_id text DEFAULT 'lesson' NOT NULL,
        error_fingerprint text NOT NULL,
        hint_stage integer DEFAULT 1 NOT NULL,
        failed_attempts integer DEFAULT 0 NOT NULL,
        last_error text,
        last_code_hash text,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS ai_response_cache_expires_idx
      ON ai_response_cache (expires_at)
    `;
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS mentor_attempts_context_unique
      ON mentor_attempts (user_id, lesson_id, exercise_id, error_fingerprint)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS mentor_attempts_user_updated_idx
      ON mentor_attempts (user_id, updated_at)
    `;
    await sql`ALTER TABLE ai_response_cache ENABLE ROW LEVEL SECURITY`;
    await sql`ALTER TABLE mentor_attempts ENABLE ROW LEVEL SECURITY`;
  });
  console.log("Esquema incremental do mentor aplicado ao Supabase.");
} finally {
  await client.end({ timeout: 5 });
}
