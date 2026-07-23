CREATE TABLE `account_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`purpose` text NOT NULL,
	`token_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`used_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `account_tokens_hash_unique` ON `account_tokens` (`token_hash`);--> statement-breakpoint
CREATE INDEX `account_tokens_user_purpose_idx` ON `account_tokens` (`user_id`,`purpose`);--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`achievement_key` text NOT NULL,
	`earned_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `achievements_user_key_unique` ON `achievements` (`user_id`,`achievement_key`);--> statement-breakpoint
CREATE TABLE `ai_usage` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`usage_date` text NOT NULL,
	`requests` integer DEFAULT 0 NOT NULL,
	`input_units` integer DEFAULT 0 NOT NULL,
	`output_units` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ai_usage_user_date_unique` ON `ai_usage` (`user_id`,`usage_date`);--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_user_id` text,
	`action` text NOT NULL,
	`target_type` text NOT NULL,
	`target_id` text,
	`metadata_json` text DEFAULT '{}' NOT NULL,
	`ip_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_logs_actor_idx` ON `audit_logs` (`actor_user_id`);--> statement-breakpoint
CREATE INDEX `audit_logs_created_idx` ON `audit_logs` (`created_at`);--> statement-breakpoint
CREATE TABLE `billing_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`provider_event_id` text NOT NULL,
	`user_id` text,
	`event_type` text NOT NULL,
	`status` text NOT NULL,
	`amount_cents` integer,
	`payload_json` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `billing_events_provider_event_unique` ON `billing_events` (`provider`,`provider_event_id`);--> statement-breakpoint
CREATE INDEX `billing_events_user_idx` ON `billing_events` (`user_id`);--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`language` text NOT NULL,
	`verification_code` text NOT NULL,
	`issued_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_verification_unique` ON `certificates` (`verification_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_user_language_unique` ON `certificates` (`user_id`,`language`);--> statement-breakpoint
CREATE TABLE `learning_progress` (
	`user_id` text PRIMARY KEY NOT NULL,
	`display_name` text DEFAULT 'Explorador' NOT NULL,
	`completed_lessons_json` text DEFAULT '[]' NOT NULL,
	`completed_challenges_json` text DEFAULT '[]' NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`streak` integer DEFAULT 1 NOT NULL,
	`last_visit` text NOT NULL,
	`active_language` text DEFAULT 'javascript' NOT NULL,
	`study_minutes` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`kind` text DEFAULT 'info' NOT NULL,
	`read_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `notifications_user_created_idx` ON `notifications` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `organization_invitations` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`token_hash` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`invited_by_user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organization_invitations_token_unique` ON `organization_invitations` (`token_hash`);--> statement-breakpoint
CREATE INDEX `organization_invitations_org_idx` ON `organization_invitations` (`organization_id`);--> statement-breakpoint
CREATE TABLE `organization_members` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`joined_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organization_members_org_user_unique` ON `organization_members` (`organization_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `organization_members_user_idx` ON `organization_members` (`user_id`);--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_user_id` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`seat_limit` integer DEFAULT 10 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_slug_unique` ON `organizations` (`slug`);--> statement-breakpoint
CREATE INDEX `organizations_owner_idx` ON `organizations` (`owner_user_id`);--> statement-breakpoint
CREATE TABLE `saas_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`monthly_price_cents` integer NOT NULL,
	`annual_price_cents` integer NOT NULL,
	`ai_daily_limit` integer NOT NULL,
	`seat_limit` integer DEFAULT 1 NOT NULL,
	`features_json` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_customer_id` text,
	`provider_subscription_id` text,
	`plan_id` text NOT NULL,
	`billing_cycle` text NOT NULL,
	`status` text NOT NULL,
	`current_period_end` integer,
	`cancel_at_period_end` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `subscriptions_user_idx` ON `subscriptions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_provider_id_unique` ON `subscriptions` (`provider`,`provider_subscription_id`);--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`last_seen_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_token_unique` ON `user_sessions` (`token_hash`);--> statement-breakpoint
CREATE INDEX `user_sessions_user_idx` ON `user_sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_sessions_expiry_idx` ON `user_sessions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`plan_id` text DEFAULT 'free' NOT NULL,
	`email_verified_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
INSERT OR IGNORE INTO `saas_plans`
  (`id`, `name`, `monthly_price_cents`, `annual_price_cents`, `ai_daily_limit`, `seat_limit`, `features_json`, `active`, `updated_at`)
VALUES
  ('free', 'Starter', 0, 0, 8, 1, '["8 aulas fundamentais","Progresso na nuvem","Mentor local","Code Lab JavaScript"]', true, unixepoch()),
  ('pro', 'Pro', 3900, 39000, 100, 1, '["44 aulas","JavaScript, Python e C++","Mentor avançado","Certificados"]', true, unixepoch()),
  ('teams', 'Equipes', 14900, 149000, 500, 10, '["Tudo do Pro","10 membros","Papéis e convites","Relatórios"]', true, unixepoch());
