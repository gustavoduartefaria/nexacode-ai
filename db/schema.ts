import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("student"),
    status: text("status").notNull().default("active"),
    planId: text("plan_id").notNull().default("free"),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("user_sessions_token_unique").on(table.tokenHash),
    index("user_sessions_user_idx").on(table.userId),
    index("user_sessions_expiry_idx").on(table.expiresAt),
  ],
);

export const accountTokens = pgTable(
  "account_tokens",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    purpose: text("purpose").notNull(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("account_tokens_hash_unique").on(table.tokenHash),
    index("account_tokens_user_purpose_idx").on(table.userId, table.purpose),
  ],
);

export const studentProfiles = pgTable("student_profiles", {
  email: text("email").primaryKey().references(() => users.email, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),
  avatarPreset: text("avatar_preset").notNull().default("orbit"),
  learningGoal: text("learning_goal").notNull(),
  experienceLevel: text("experience_level").notNull(),
  weeklyGoal: integer("weekly_goal").notNull().default(3),
  themePreference: text("theme_preference").notNull().default("system"),
  aiEnabled: boolean("ai_enabled").notNull().default(true),
  acceptedTermsAt: timestamp("accepted_terms_at", { withTimezone: true, mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const learningProgress = pgTable("learning_progress", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull().default("Explorador"),
  completedLessonsJson: text("completed_lessons_json").notNull().default("[]"),
  completedChallengesJson: text("completed_challenges_json").notNull().default("[]"),
  xp: integer("xp").notNull().default(0),
  streak: integer("streak").notNull().default(1),
  lastVisit: text("last_visit").notNull(),
  activeLanguage: text("active_language").notNull().default("javascript"),
  studyMinutes: integer("study_minutes").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const saasPlans = pgTable("saas_plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  monthlyPriceCents: integer("monthly_price_cents").notNull(),
  annualPriceCents: integer("annual_price_cents").notNull(),
  aiDailyLimit: integer("ai_daily_limit").notNull(),
  seatLimit: integer("seat_limit").notNull().default(1),
  featuresJson: text("features_json").notNull(),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerCustomerId: text("provider_customer_id"),
    providerSubscriptionId: text("provider_subscription_id"),
    planId: text("plan_id").notNull(),
    billingCycle: text("billing_cycle").notNull(),
    status: text("status").notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: "date" }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end")
      .notNull()
      .default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("subscriptions_user_idx").on(table.userId),
    uniqueIndex("subscriptions_provider_id_unique").on(
      table.provider,
      table.providerSubscriptionId,
    ),
  ],
);

export const billingEvents = pgTable(
  "billing_events",
  {
    id: text("id").primaryKey(),
    provider: text("provider").notNull(),
    providerEventId: text("provider_event_id").notNull(),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    eventType: text("event_type").notNull(),
    status: text("status").notNull(),
    amountCents: integer("amount_cents"),
    payloadJson: text("payload_json").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("billing_events_provider_event_unique").on(
      table.provider,
      table.providerEventId,
    ),
    index("billing_events_user_idx").on(table.userId),
  ],
);

export const organizations = pgTable(
  "organizations",
  {
    id: text("id").primaryKey(),
    ownerUserId: text("owner_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    seatLimit: integer("seat_limit").notNull().default(10),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("organizations_slug_unique").on(table.slug),
    index("organizations_owner_idx").on(table.ownerUserId),
  ],
);

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull().default("student"),
    joinedAt: timestamp("joined_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("organization_members_org_user_unique").on(
      table.organizationId,
      table.userId,
    ),
    index("organization_members_user_idx").on(table.userId),
  ],
);

export const organizationInvitations = pgTable(
  "organization_invitations",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role").notNull().default("student"),
    tokenHash: text("token_hash").notNull(),
    status: text("status").notNull().default("pending"),
    invitedByUserId: text("invited_by_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("organization_invitations_token_unique").on(table.tokenHash),
    index("organization_invitations_org_idx").on(table.organizationId),
  ],
);

export const aiUsage = pgTable(
  "ai_usage",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    usageDate: text("usage_date").notNull(),
    requests: integer("requests").notNull().default(0),
    inputUnits: integer("input_units").notNull().default(0),
    outputUnits: integer("output_units").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("ai_usage_user_date_unique").on(table.userId, table.usageDate),
  ],
);

export const mentorAttempts = pgTable(
  "mentor_attempts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    exerciseId: text("exercise_id").notNull().default("lesson"),
    errorFingerprint: text("error_fingerprint").notNull(),
    hintStage: integer("hint_stage").notNull().default(1),
    failedAttempts: integer("failed_attempts").notNull().default(0),
    lastError: text("last_error"),
    lastCodeHash: text("last_code_hash"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("mentor_attempts_context_unique").on(
      table.userId,
      table.lessonId,
      table.exerciseId,
      table.errorFingerprint,
    ),
    index("mentor_attempts_user_updated_idx").on(table.userId, table.updatedAt),
  ],
);

export const aiResponseCache = pgTable(
  "ai_response_cache",
  {
    cacheKey: text("cache_key").primaryKey(),
    lessonId: text("lesson_id").notNull(),
    intent: text("intent").notNull(),
    responseJson: text("response_json").notNull(),
    hits: integer("hits").notNull().default(0),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [index("ai_response_cache_expires_idx").on(table.expiresAt)],
);

export const certificates = pgTable(
  "certificates",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    language: text("language").notNull(),
    verificationCode: text("verification_code").notNull(),
    issuedAt: timestamp("issued_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("certificates_verification_unique").on(table.verificationCode),
    uniqueIndex("certificates_user_language_unique").on(table.userId, table.language),
  ],
);

export const achievements = pgTable(
  "achievements",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    achievementKey: text("achievement_key").notNull(),
    earnedAt: timestamp("earned_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("achievements_user_key_unique").on(table.userId, table.achievementKey),
  ],
);

export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    message: text("message").notNull(),
    kind: text("kind").notNull().default("info"),
    readAt: timestamp("read_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [index("notifications_user_created_idx").on(table.userId, table.createdAt)],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id").references(() => users.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: text("target_id"),
    metadataJson: text("metadata_json").notNull().default("{}"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("audit_logs_actor_idx").on(table.actorUserId),
    index("audit_logs_created_idx").on(table.createdAt),
  ],
);

export const permissions = pgTable(
  "permissions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    permissionKey: text("permission_key").notNull(),
    scopeType: text("scope_type").notNull().default("account"),
    scopeId: text("scope_id"),
    grantedByUserId: text("granted_by_user_id").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("permissions_user_scope_key_unique").on(
      table.userId,
      table.permissionKey,
      table.scopeType,
      table.scopeId,
    ),
    index("permissions_scope_idx").on(table.scopeType, table.scopeId),
  ],
);

export const learningTracks = pgTable(
  "learning_tracks",
  {
    id: text("id").primaryKey(),
    language: text("language").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    published: boolean("published").notNull().default(false),
    contentVersion: integer("content_version").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("learning_tracks_language_unique").on(table.language),
    index("learning_tracks_published_idx").on(table.published),
  ],
);

export const learningLessons = pgTable(
  "learning_lessons",
  {
    id: text("id").primaryKey(),
    trackId: text("track_id").notNull().references(() => learningTracks.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    position: integer("position").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    difficulty: text("difficulty").notNull(),
    prerequisitesJson: text("prerequisites_json").notNull().default("[]"),
    published: boolean("published").notNull().default(false),
    contentVersion: integer("content_version").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("learning_lessons_track_slug_unique").on(table.trackId, table.slug),
    uniqueIndex("learning_lessons_track_position_unique").on(table.trackId, table.position),
  ],
);

export const learningChallenges = pgTable(
  "learning_challenges",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id").notNull().references(() => learningLessons.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    instructions: text("instructions").notNull(),
    validatorMode: text("validator_mode").notNull().default("guided"),
    position: integer("position").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("learning_challenges_lesson_position_unique").on(
      table.lessonId,
      table.position,
    ),
  ],
);

export const lessonCheckpoints = pgTable(
  "lesson_checkpoints",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id").notNull().references(() => learningLessons.id, { onDelete: "cascade" }),
    prompt: text("prompt").notNull(),
    optionsJson: text("options_json").notNull(),
    answerIndex: integer("answer_index").notNull(),
    explanation: text("explanation").notNull(),
    position: integer("position").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("lesson_checkpoints_lesson_position_unique").on(
      table.lessonId,
      table.position,
    ),
  ],
);

export const aiHistory = pgTable(
  "ai_history",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    language: text("language").notNull(),
    intent: text("intent").notNull(),
    promptExcerpt: text("prompt_excerpt").notNull(),
    responseExcerpt: text("response_excerpt").notNull(),
    source: text("source").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("ai_history_user_created_idx").on(table.userId, table.createdAt),
  ],
);

export const classrooms = pgTable(
  "classrooms",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdByUserId: text("created_by_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("classrooms_org_name_unique").on(table.organizationId, table.name),
    index("classrooms_org_idx").on(table.organizationId),
  ],
);

export const classroomMembers = pgTable(
  "classroom_members",
  {
    id: text("id").primaryKey(),
    classroomId: text("classroom_id").notNull().references(() => classrooms.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    uniqueIndex("classroom_members_class_user_unique").on(
      table.classroomId,
      table.userId,
    ),
    index("classroom_members_user_idx").on(table.userId),
  ],
);

export const trackAssignments = pgTable(
  "track_assignments",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    classroomId: text("classroom_id").references(() => classrooms.id, { onDelete: "cascade" }),
    trackId: text("track_id").notNull().references(() => learningTracks.id, { onDelete: "cascade" }),
    assignedByUserId: text("assigned_by_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    dueAt: timestamp("due_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("track_assignments_org_idx").on(table.organizationId),
    index("track_assignments_class_idx").on(table.classroomId),
  ],
);

export const coupons = pgTable(
  "coupons",
  {
    id: text("id").primaryKey(),
    code: text("code").notNull(),
    providerCouponId: text("provider_coupon_id"),
    percentOff: integer("percent_off"),
    amountOffCents: integer("amount_off_cents"),
    active: boolean("active").notNull().default(true),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [uniqueIndex("coupons_code_unique").on(table.code)],
);

export const systemEvents = pgTable(
  "system_events",
  {
    id: text("id").primaryKey(),
    severity: text("severity").notNull(),
    source: text("source").notNull(),
    message: text("message").notNull(),
    fingerprint: text("fingerprint"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  },
  (table) => [
    index("system_events_created_idx").on(table.createdAt),
    index("system_events_fingerprint_idx").on(table.fingerprint),
  ],
);
