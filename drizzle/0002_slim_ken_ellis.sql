CREATE TABLE `ai_history` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`language` text NOT NULL,
	`intent` text NOT NULL,
	`prompt_excerpt` text NOT NULL,
	`response_excerpt` text NOT NULL,
	`source` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ai_history_user_created_idx` ON `ai_history` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `classroom_members` (
	`id` text PRIMARY KEY NOT NULL,
	`classroom_id` text NOT NULL,
	`user_id` text NOT NULL,
	`joined_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `classroom_members_class_user_unique` ON `classroom_members` (`classroom_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `classroom_members_user_idx` ON `classroom_members` (`user_id`);--> statement-breakpoint
CREATE TABLE `classrooms` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`name` text NOT NULL,
	`created_by_user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `classrooms_org_name_unique` ON `classrooms` (`organization_id`,`name`);--> statement-breakpoint
CREATE INDEX `classrooms_org_idx` ON `classrooms` (`organization_id`);--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`provider_coupon_id` text,
	`percent_off` integer,
	`amount_off_cents` integer,
	`active` integer DEFAULT true NOT NULL,
	`expires_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);--> statement-breakpoint
CREATE TABLE `learning_challenges` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`title` text NOT NULL,
	`instructions` text NOT NULL,
	`validator_mode` text DEFAULT 'guided' NOT NULL,
	`position` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learning_challenges_lesson_position_unique` ON `learning_challenges` (`lesson_id`,`position`);--> statement-breakpoint
CREATE TABLE `learning_lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`track_id` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`position` integer NOT NULL,
	`duration_minutes` integer NOT NULL,
	`difficulty` text NOT NULL,
	`prerequisites_json` text DEFAULT '[]' NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`content_version` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learning_lessons_track_slug_unique` ON `learning_lessons` (`track_id`,`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `learning_lessons_track_position_unique` ON `learning_lessons` (`track_id`,`position`);--> statement-breakpoint
CREATE TABLE `learning_tracks` (
	`id` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`content_version` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learning_tracks_language_unique` ON `learning_tracks` (`language`);--> statement-breakpoint
CREATE INDEX `learning_tracks_published_idx` ON `learning_tracks` (`published`);--> statement-breakpoint
CREATE TABLE `lesson_checkpoints` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`prompt` text NOT NULL,
	`options_json` text NOT NULL,
	`answer_index` integer NOT NULL,
	`explanation` text NOT NULL,
	`position` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lesson_checkpoints_lesson_position_unique` ON `lesson_checkpoints` (`lesson_id`,`position`);--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`permission_key` text NOT NULL,
	`scope_type` text DEFAULT 'account' NOT NULL,
	`scope_id` text,
	`granted_by_user_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permissions_user_scope_key_unique` ON `permissions` (`user_id`,`permission_key`,`scope_type`,`scope_id`);--> statement-breakpoint
CREATE INDEX `permissions_scope_idx` ON `permissions` (`scope_type`,`scope_id`);--> statement-breakpoint
CREATE TABLE `system_events` (
	`id` text PRIMARY KEY NOT NULL,
	`severity` text NOT NULL,
	`source` text NOT NULL,
	`message` text NOT NULL,
	`fingerprint` text,
	`resolved_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `system_events_created_idx` ON `system_events` (`created_at`);--> statement-breakpoint
CREATE INDEX `system_events_fingerprint_idx` ON `system_events` (`fingerprint`);--> statement-breakpoint
CREATE TABLE `track_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`classroom_id` text,
	`track_id` text NOT NULL,
	`assigned_by_user_id` text NOT NULL,
	`due_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `track_assignments_org_idx` ON `track_assignments` (`organization_id`);--> statement-breakpoint
CREATE INDEX `track_assignments_class_idx` ON `track_assignments` (`classroom_id`);--> statement-breakpoint
ALTER TABLE `student_profiles` ADD `avatar_preset` text DEFAULT 'orbit' NOT NULL;--> statement-breakpoint
ALTER TABLE `student_profiles` ADD `theme_preference` text DEFAULT 'system' NOT NULL;--> statement-breakpoint
ALTER TABLE `student_profiles` ADD `ai_enabled` integer DEFAULT true NOT NULL;--> statement-breakpoint
INSERT OR IGNORE INTO `learning_tracks`
  (`id`, `language`, `title`, `description`, `published`, `content_version`, `created_at`, `updated_at`)
VALUES
  ('track-javascript', 'javascript', 'JavaScript Engineering', 'Fundamentos, navegador, dados, assincronismo e arquitetura de aplicações.', true, 1, unixepoch(), unixepoch()),
  ('track-python', 'python', 'Python Systems', 'Sintaxe, coleções, funções, orientação a objetos, automação e modelagem.', true, 1, unixepoch(), unixepoch()),
  ('track-cpp', 'cpp', 'C++ Performance', 'Compilação, tipos, memória, STL, RAII e construção de software eficiente.', true, 1, unixepoch(), unixepoch());
