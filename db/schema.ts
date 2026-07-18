import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studentProfiles = sqliteTable("student_profiles", {
  email: text("email").primaryKey(),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),
  learningGoal: text("learning_goal").notNull(),
  experienceLevel: text("experience_level").notNull(),
  weeklyGoal: integer("weekly_goal").notNull().default(3),
  acceptedTermsAt: integer("accepted_terms_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
