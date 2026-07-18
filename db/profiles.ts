import { eq } from "drizzle-orm";
import { getDb } from ".";
import { studentProfiles } from "./schema";

export type StudentProfile = typeof studentProfiles.$inferSelect;

export async function getStudentProfile(email: string) {
  const db = getDb();
  const [profile] = await db
    .select()
    .from(studentProfiles)
    .where(eq(studentProfiles.email, email.toLowerCase()))
    .limit(1);

  return profile ?? null;
}
