CREATE TABLE `student_profiles` (
	`email` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`username` text NOT NULL,
	`learning_goal` text NOT NULL,
	`experience_level` text NOT NULL,
	`weekly_goal` integer DEFAULT 3 NOT NULL,
	`accepted_terms_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_profiles_username_unique` ON `student_profiles` (`username`);