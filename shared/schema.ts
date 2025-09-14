import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Merchants table - companies that provide subscription services
export const merchants = pgTable("merchants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().unique(), // e.g., "com.netflix"
  displayName: varchar("display_name").notNull(), // e.g., "Netflix"
  category: varchar("category").notNull(), // e.g., "Streaming"
  logoUrl: varchar("logo_url"),
  websiteUrl: varchar("website_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bank connections for transaction parsing
export const bankConnections = pgTable("bank_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  plaidItemId: varchar("plaid_item_id"),
  plaidAccessToken: varchar("plaid_access_token"),
  bankName: varchar("bank_name"),
  accountMask: varchar("account_mask"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User subscriptions detected from bank transactions
export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  merchantId: varchar("merchant_id").references(() => merchants.id),
  subscriptionName: varchar("subscription_name").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  billingCycle: varchar("billing_cycle").notNull(), // monthly, annual, etc.
  nextBillingDate: timestamp("next_billing_date"),
  status: varchar("status").notNull().default("active"), // active, cancelled, paused
  detectionSource: varchar("detection_source").notNull(), // bank, email, manual
  accountEmail: varchar("account_email"),
  accountPhone: varchar("account_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cancellation recipes - instructions for cancelling each merchant
export const cancellationRecipes = pgTable("cancellation_recipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().references(() => merchants.id),
  difficulty: integer("difficulty").notNull(), // 1-5 scale
  channels: jsonb("channels").notNull(), // ["portal", "email", "chat", "phone", "letter"]
  steps: jsonb("steps").notNull(), // Array of step objects
  frictionFlags: jsonb("friction_flags").notNull(), // Array of known issues
  evidenceRequirements: jsonb("evidence_requirements").notNull(),
  estimatedTimeMinutes: integer("estimated_time_minutes"),
  successRate: decimal("success_rate", { precision: 3, scale: 2 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI cancellation tasks
export const cancellationTasks = pgTable("cancellation_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subscriptionId: varchar("subscription_id").notNull().references(() => subscriptions.id),
  merchantId: varchar("merchant_id").notNull().references(() => merchants.id),
  status: varchar("status").notNull().default("queued"), // queued, in_progress, succeeded, failed
  currentStep: varchar("current_step"),
  currentChannel: varchar("current_channel"), // portal, email, chat, phone, letter
  progress: integer("progress").default(0), // 0-100
  aiAgentId: varchar("ai_agent_id"),
  estimatedCompletionTime: timestamp("estimated_completion_time"),
  actualCompletionTime: timestamp("actual_completion_time"),
  errorMessage: text("error_message"),
  confirmationId: varchar("confirmation_id"),
  refundIssued: boolean("refund_issued").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Communication logs for cancellation attempts
export const communicationLogs = pgTable("communication_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").notNull().references(() => cancellationTasks.id),
  channel: varchar("channel").notNull(), // portal, email, chat, phone, letter
  direction: varchar("direction").notNull(), // inbound, outbound
  content: text("content"),
  metadata: jsonb("metadata"), // Additional context like phone numbers, email addresses
  timestamp: timestamp("timestamp").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Evidence collection for cancellation proof
export const evidence = pgTable("evidence", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").notNull().references(() => cancellationTasks.id),
  type: varchar("type").notNull(), // screenshot, email, recording, letter
  fileUrl: varchar("file_url"),
  fileName: varchar("file_name"),
  fileSize: integer("file_size"),
  description: text("description"),
  isVerified: boolean("is_verified").default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Merchant scorecards for performance tracking
export const merchantScorecards = pgTable("merchant_scorecards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().references(() => merchants.id),
  period: varchar("period").notNull(), // last30, last90, all_time
  winRate: decimal("win_rate", { precision: 3, scale: 2 }).notNull(),
  medianTimeMinutes: integer("median_time_minutes").notNull(),
  volume: integer("volume").notNull(),
  successByChannel: jsonb("success_by_channel").notNull(),
  escalationRate: decimal("escalation_rate", { precision: 3, scale: 2 }),
  refundRate: decimal("refund_rate", { precision: 3, scale: 2 }),
  evidenceCompletenessPct: decimal("evidence_completeness_pct", { precision: 3, scale: 2 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Billing and payments
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  taskId: varchar("task_id").references(() => cancellationTasks.id),
  stripePaymentIntentId: varchar("stripe_payment_intent_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  status: varchar("status").notNull(), // pending, paid, failed, refunded
  description: text("description"),
  paidAt: timestamp("paid_at"),
  refundedAt: timestamp("refunded_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertMerchant = typeof merchants.$inferInsert;
export type Merchant = typeof merchants.$inferSelect;

export type InsertBankConnection = typeof bankConnections.$inferInsert;
export type BankConnection = typeof bankConnections.$inferSelect;

export type InsertSubscription = typeof subscriptions.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertCancellationRecipe = typeof cancellationRecipes.$inferInsert;
export type CancellationRecipe = typeof cancellationRecipes.$inferSelect;

export type InsertCancellationTask = typeof cancellationTasks.$inferInsert;
export type CancellationTask = typeof cancellationTasks.$inferSelect;

export type InsertCommunicationLog = typeof communicationLogs.$inferInsert;
export type CommunicationLog = typeof communicationLogs.$inferSelect;

export type InsertEvidence = typeof evidence.$inferInsert;
export type Evidence = typeof evidence.$inferSelect;

export type InsertMerchantScorecard = typeof merchantScorecards.$inferInsert;
export type MerchantScorecard = typeof merchantScorecards.$inferSelect;

export type InsertInvoice = typeof invoices.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;

// Zod schemas for validation
export const upsertUserSchema = createInsertSchema(users);
export const insertMerchantSchema = createInsertSchema(merchants);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const insertCancellationTaskSchema = createInsertSchema(cancellationTasks);
export const insertInvoiceSchema = createInsertSchema(invoices);
