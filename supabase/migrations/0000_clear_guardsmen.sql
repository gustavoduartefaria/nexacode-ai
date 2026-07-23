CREATE TABLE "account_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"purpose" text NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"achievement_key" text NOT NULL,
	"earned_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_history" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"language" text NOT NULL,
	"intent" text NOT NULL,
	"prompt_excerpt" text NOT NULL,
	"response_excerpt" text NOT NULL,
	"source" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"usage_date" text NOT NULL,
	"requests" integer DEFAULT 0 NOT NULL,
	"input_units" integer DEFAULT 0 NOT NULL,
	"output_units" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_user_id" text,
	"action" text NOT NULL,
	"target_type" text NOT NULL,
	"target_id" text,
	"metadata_json" text DEFAULT '{}' NOT NULL,
	"ip_hash" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_events" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"provider_event_id" text NOT NULL,
	"user_id" text,
	"event_type" text NOT NULL,
	"status" text NOT NULL,
	"amount_cents" integer,
	"payload_json" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"language" text NOT NULL,
	"verification_code" text NOT NULL,
	"issued_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "classroom_members" (
	"id" text PRIMARY KEY NOT NULL,
	"classroom_id" text NOT NULL,
	"user_id" text NOT NULL,
	"joined_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "classrooms" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"name" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"provider_coupon_id" text,
	"percent_off" integer,
	"amount_off_cents" integer,
	"active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_challenges" (
	"id" text PRIMARY KEY NOT NULL,
	"lesson_id" text NOT NULL,
	"title" text NOT NULL,
	"instructions" text NOT NULL,
	"validator_mode" text DEFAULT 'guided' NOT NULL,
	"position" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_lessons" (
	"id" text PRIMARY KEY NOT NULL,
	"track_id" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"position" integer NOT NULL,
	"duration_minutes" integer NOT NULL,
	"difficulty" text NOT NULL,
	"prerequisites_json" text DEFAULT '[]' NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"content_version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_progress" (
	"user_id" text PRIMARY KEY NOT NULL,
	"display_name" text DEFAULT 'Explorador' NOT NULL,
	"completed_lessons_json" text DEFAULT '[]' NOT NULL,
	"completed_challenges_json" text DEFAULT '[]' NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 1 NOT NULL,
	"last_visit" text NOT NULL,
	"active_language" text DEFAULT 'javascript' NOT NULL,
	"study_minutes" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_tracks" (
	"id" text PRIMARY KEY NOT NULL,
	"language" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"content_version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_checkpoints" (
	"id" text PRIMARY KEY NOT NULL,
	"lesson_id" text NOT NULL,
	"prompt" text NOT NULL,
	"options_json" text NOT NULL,
	"answer_index" integer NOT NULL,
	"explanation" text NOT NULL,
	"position" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"kind" text DEFAULT 'info' NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"token_hash" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"invited_by_user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"joined_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_user_id" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"seat_limit" integer DEFAULT 10 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"permission_key" text NOT NULL,
	"scope_type" text DEFAULT 'account' NOT NULL,
	"scope_id" text,
	"granted_by_user_id" text,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saas_plans" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"monthly_price_cents" integer NOT NULL,
	"annual_price_cents" integer NOT NULL,
	"ai_daily_limit" integer NOT NULL,
	"seat_limit" integer DEFAULT 1 NOT NULL,
	"features_json" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_profiles" (
	"email" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"username" text NOT NULL,
	"avatar_preset" text DEFAULT 'orbit' NOT NULL,
	"learning_goal" text NOT NULL,
	"experience_level" text NOT NULL,
	"weekly_goal" integer DEFAULT 3 NOT NULL,
	"theme_preference" text DEFAULT 'system' NOT NULL,
	"ai_enabled" boolean DEFAULT true NOT NULL,
	"accepted_terms_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "student_profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_customer_id" text,
	"provider_subscription_id" text,
	"plan_id" text NOT NULL,
	"billing_cycle" text NOT NULL,
	"status" text NOT NULL,
	"current_period_end" timestamp with time zone,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_events" (
	"id" text PRIMARY KEY NOT NULL,
	"severity" text NOT NULL,
	"source" text NOT NULL,
	"message" text NOT NULL,
	"fingerprint" text,
	"resolved_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "track_assignments" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"classroom_id" text,
	"track_id" text NOT NULL,
	"assigned_by_user_id" text NOT NULL,
	"due_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"plan_id" text DEFAULT 'free' NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account_tokens" ADD CONSTRAINT "account_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_history" ADD CONSTRAINT "ai_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_events" ADD CONSTRAINT "billing_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classroom_members" ADD CONSTRAINT "classroom_members_classroom_id_classrooms_id_fk" FOREIGN KEY ("classroom_id") REFERENCES "public"."classrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classroom_members" ADD CONSTRAINT "classroom_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_challenges" ADD CONSTRAINT "learning_challenges_lesson_id_learning_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."learning_lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_lessons" ADD CONSTRAINT "learning_lessons_track_id_learning_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."learning_tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_progress" ADD CONSTRAINT "learning_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_checkpoints" ADD CONSTRAINT "lesson_checkpoints_lesson_id_learning_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."learning_lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_invited_by_user_id_users_id_fk" FOREIGN KEY ("invited_by_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_granted_by_user_id_users_id_fk" FOREIGN KEY ("granted_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_email_users_email_fk" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track_assignments" ADD CONSTRAINT "track_assignments_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track_assignments" ADD CONSTRAINT "track_assignments_classroom_id_classrooms_id_fk" FOREIGN KEY ("classroom_id") REFERENCES "public"."classrooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track_assignments" ADD CONSTRAINT "track_assignments_track_id_learning_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."learning_tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track_assignments" ADD CONSTRAINT "track_assignments_assigned_by_user_id_users_id_fk" FOREIGN KEY ("assigned_by_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_tokens_hash_unique" ON "account_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "account_tokens_user_purpose_idx" ON "account_tokens" USING btree ("user_id","purpose");--> statement-breakpoint
CREATE UNIQUE INDEX "achievements_user_key_unique" ON "achievements" USING btree ("user_id","achievement_key");--> statement-breakpoint
CREATE INDEX "ai_history_user_created_idx" ON "ai_history" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "ai_usage_user_date_unique" ON "ai_usage" USING btree ("user_id","usage_date");--> statement-breakpoint
CREATE INDEX "audit_logs_actor_idx" ON "audit_logs" USING btree ("actor_user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_created_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "billing_events_provider_event_unique" ON "billing_events" USING btree ("provider","provider_event_id");--> statement-breakpoint
CREATE INDEX "billing_events_user_idx" ON "billing_events" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "certificates_verification_unique" ON "certificates" USING btree ("verification_code");--> statement-breakpoint
CREATE UNIQUE INDEX "certificates_user_language_unique" ON "certificates" USING btree ("user_id","language");--> statement-breakpoint
CREATE UNIQUE INDEX "classroom_members_class_user_unique" ON "classroom_members" USING btree ("classroom_id","user_id");--> statement-breakpoint
CREATE INDEX "classroom_members_user_idx" ON "classroom_members" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "classrooms_org_name_unique" ON "classrooms" USING btree ("organization_id","name");--> statement-breakpoint
CREATE INDEX "classrooms_org_idx" ON "classrooms" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "coupons_code_unique" ON "coupons" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_challenges_lesson_position_unique" ON "learning_challenges" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_lessons_track_slug_unique" ON "learning_lessons" USING btree ("track_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_lessons_track_position_unique" ON "learning_lessons" USING btree ("track_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "learning_tracks_language_unique" ON "learning_tracks" USING btree ("language");--> statement-breakpoint
CREATE INDEX "learning_tracks_published_idx" ON "learning_tracks" USING btree ("published");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_checkpoints_lesson_position_unique" ON "lesson_checkpoints" USING btree ("lesson_id","position");--> statement-breakpoint
CREATE INDEX "notifications_user_created_idx" ON "notifications" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_invitations_token_unique" ON "organization_invitations" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "organization_invitations_org_idx" ON "organization_invitations" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_members_org_user_unique" ON "organization_members" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "organization_members_user_idx" ON "organization_members" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_slug_unique" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "organizations_owner_idx" ON "organizations" USING btree ("owner_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "permissions_user_scope_key_unique" ON "permissions" USING btree ("user_id","permission_key","scope_type","scope_id");--> statement-breakpoint
CREATE INDEX "permissions_scope_idx" ON "permissions" USING btree ("scope_type","scope_id");--> statement-breakpoint
CREATE INDEX "subscriptions_user_idx" ON "subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "subscriptions_provider_id_unique" ON "subscriptions" USING btree ("provider","provider_subscription_id");--> statement-breakpoint
CREATE INDEX "system_events_created_idx" ON "system_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "system_events_fingerprint_idx" ON "system_events" USING btree ("fingerprint");--> statement-breakpoint
CREATE INDEX "track_assignments_org_idx" ON "track_assignments" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "track_assignments_class_idx" ON "track_assignments" USING btree ("classroom_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_sessions_token_unique" ON "user_sessions" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "user_sessions_user_idx" ON "user_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_sessions_expiry_idx" ON "user_sessions" USING btree ("expires_at");
--> statement-breakpoint
INSERT INTO "saas_plans"
  ("id", "name", "monthly_price_cents", "annual_price_cents", "ai_daily_limit", "seat_limit", "features_json", "active", "updated_at")
VALUES
  ('free', 'Starter', 0, 0, 8, 1, '["8 aulas fundamentais","Progresso na nuvem","Mentor local","Code Lab JavaScript"]', true, now()),
  ('pro', 'Pro', 3900, 39000, 100, 1, '["44 aulas","JavaScript, Python e C++","Mentor avançado","Certificados"]', true, now()),
  ('teams', 'Equipes', 14900, 149000, 500, 10, '["Tudo do Pro","10 membros","Papéis e convites","Relatórios"]', true, now())
ON CONFLICT ("id") DO UPDATE SET
  "name" = excluded."name",
  "monthly_price_cents" = excluded."monthly_price_cents",
  "annual_price_cents" = excluded."annual_price_cents",
  "ai_daily_limit" = excluded."ai_daily_limit",
  "seat_limit" = excluded."seat_limit",
  "features_json" = excluded."features_json",
  "active" = excluded."active",
  "updated_at" = excluded."updated_at";
--> statement-breakpoint
INSERT INTO "learning_tracks"
  ("id", "language", "title", "description", "published", "content_version", "created_at", "updated_at")
VALUES
  ('track-javascript', 'javascript', 'JavaScript Engineering', 'Fundamentos, navegador, dados, assincronismo e arquitetura de aplicações.', true, 2, now(), now()),
  ('track-python', 'python', 'Python Systems', 'Sintaxe, coleções, funções, orientação a objetos, automação e modelagem.', true, 2, now(), now()),
  ('track-cpp', 'cpp', 'C++ Performance', 'Compilação, tipos, memória, STL, RAII e construção de software eficiente.', true, 2, now(), now())
ON CONFLICT ("language") DO UPDATE SET
  "title" = excluded."title",
  "description" = excluded."description",
  "published" = excluded."published",
  "content_version" = excluded."content_version",
  "updated_at" = excluded."updated_at";
--> statement-breakpoint
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "account_tokens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "student_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "learning_progress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "billing_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "organizations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "organization_members" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "organization_invitations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ai_usage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ai_history" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "certificates" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "achievements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "permissions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "classrooms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "classroom_members" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "track_assignments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "saas_plans" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "learning_tracks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "learning_lessons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "learning_challenges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lesson_checkpoints" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "coupons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "system_events" ENABLE ROW LEVEL SECURITY;
