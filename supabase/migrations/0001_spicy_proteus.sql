CREATE TABLE "ai_response_cache" (
	"cache_key" text PRIMARY KEY NOT NULL,
	"lesson_id" text NOT NULL,
	"intent" text NOT NULL,
	"response_json" text NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentor_attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"exercise_id" text DEFAULT 'lesson' NOT NULL,
	"error_fingerprint" text NOT NULL,
	"hint_stage" integer DEFAULT 1 NOT NULL,
	"failed_attempts" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"last_code_hash" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mentor_attempts" ADD CONSTRAINT "mentor_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_response_cache_expires_idx" ON "ai_response_cache" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "mentor_attempts_context_unique" ON "mentor_attempts" USING btree ("user_id","lesson_id","exercise_id","error_fingerprint");--> statement-breakpoint
CREATE INDEX "mentor_attempts_user_updated_idx" ON "mentor_attempts" USING btree ("user_id","updated_at");--> statement-breakpoint
ALTER TABLE "ai_response_cache" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mentor_attempts" ENABLE ROW LEVEL SECURITY;
