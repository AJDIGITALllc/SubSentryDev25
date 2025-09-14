import {
  users,
  merchants,
  subscriptions,
  cancellationTasks,
  cancellationRecipes,
  evidence,
  merchantScorecards,
  invoices,
  type User,
  type UpsertUser,
  type Merchant,
  type InsertMerchant,
  type Subscription,
  type InsertSubscription,
  type CancellationTask,
  type InsertCancellationTask,
  type CancellationRecipe,
  type Evidence,
  type InsertEvidence,
  type MerchantScorecard,
  type Invoice,
  type InsertInvoice,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string): Promise<User>;

  // Merchant operations
  getMerchant(id: string): Promise<Merchant | undefined>;
  getMerchantByMerchantId(merchantId: string): Promise<Merchant | undefined>;
  createMerchant(merchant: InsertMerchant): Promise<Merchant>;
  getAllMerchants(): Promise<Merchant[]>;

  // Subscription operations
  getUserSubscriptions(userId: string): Promise<Subscription[]>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscriptionStatus(id: string, status: string): Promise<Subscription>;

  // Cancellation task operations
  getCancellationTask(id: string): Promise<CancellationTask | undefined>;
  getUserCancellationTasks(userId: string): Promise<CancellationTask[]>;
  getActiveCancellationTasks(userId: string): Promise<CancellationTask[]>;
  createCancellationTask(task: InsertCancellationTask): Promise<CancellationTask>;
  updateCancellationTaskStatus(id: string, status: string, progress?: number): Promise<CancellationTask>;

  // Evidence operations
  getTaskEvidence(taskId: string): Promise<Evidence[]>;
  createEvidence(evidence: InsertEvidence): Promise<Evidence>;

  // Merchant scorecard operations
  getMerchantScorecard(merchantId: string, period: string): Promise<MerchantScorecard | undefined>;

  // Invoice operations
  getUserInvoices(userId: string): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoiceStatus(id: string, status: string): Promise<Invoice>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId,
        updatedAt: new Date() 
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Merchant operations
  async getMerchant(id: string): Promise<Merchant | undefined> {
    const [merchant] = await db.select().from(merchants).where(eq(merchants.id, id));
    return merchant;
  }

  async getMerchantByMerchantId(merchantId: string): Promise<Merchant | undefined> {
    const [merchant] = await db.select().from(merchants).where(eq(merchants.merchantId, merchantId));
    return merchant;
  }

  async createMerchant(merchantData: InsertMerchant): Promise<Merchant> {
    const [merchant] = await db.insert(merchants).values(merchantData).returning();
    return merchant;
  }

  async getAllMerchants(): Promise<Merchant[]> {
    return await db.select().from(merchants).orderBy(merchants.displayName);
  }

  // Subscription operations
  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.updatedAt));
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
    return subscription;
  }

  async createSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db.insert(subscriptions).values(subscriptionData).returning();
    return subscription;
  }

  async updateSubscriptionStatus(id: string, status: string): Promise<Subscription> {
    const [subscription] = await db
      .update(subscriptions)
      .set({ status, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    return subscription;
  }

  // Cancellation task operations
  async getCancellationTask(id: string): Promise<CancellationTask | undefined> {
    const [task] = await db.select().from(cancellationTasks).where(eq(cancellationTasks.id, id));
    return task;
  }

  async getUserCancellationTasks(userId: string): Promise<CancellationTask[]> {
    return await db
      .select()
      .from(cancellationTasks)
      .where(eq(cancellationTasks.userId, userId))
      .orderBy(desc(cancellationTasks.createdAt));
  }

  async getActiveCancellationTasks(userId: string): Promise<CancellationTask[]> {
    return await db
      .select()
      .from(cancellationTasks)
      .where(
        and(
          eq(cancellationTasks.userId, userId),
          eq(cancellationTasks.status, 'in_progress')
        )
      )
      .orderBy(desc(cancellationTasks.createdAt));
  }

  async createCancellationTask(taskData: InsertCancellationTask): Promise<CancellationTask> {
    const [task] = await db.insert(cancellationTasks).values(taskData).returning();
    return task;
  }

  async updateCancellationTaskStatus(id: string, status: string, progress?: number): Promise<CancellationTask> {
    const updateData: any = { status, updatedAt: new Date() };
    if (progress !== undefined) {
      updateData.progress = progress;
    }
    if (status === 'succeeded' || status === 'failed') {
      updateData.actualCompletionTime = new Date();
    }
    
    const [task] = await db
      .update(cancellationTasks)
      .set(updateData)
      .where(eq(cancellationTasks.id, id))
      .returning();
    return task;
  }

  // Evidence operations
  async getTaskEvidence(taskId: string): Promise<Evidence[]> {
    return await db
      .select()
      .from(evidence)
      .where(eq(evidence.taskId, taskId))
      .orderBy(desc(evidence.createdAt));
  }

  async createEvidence(evidenceData: InsertEvidence): Promise<Evidence> {
    const [evidenceRecord] = await db.insert(evidence).values(evidenceData).returning();
    return evidenceRecord;
  }

  // Merchant scorecard operations
  async getMerchantScorecard(merchantId: string, period: string): Promise<MerchantScorecard | undefined> {
    const [scorecard] = await db
      .select()
      .from(merchantScorecards)
      .where(
        and(
          eq(merchantScorecards.merchantId, merchantId),
          eq(merchantScorecards.period, period)
        )
      );
    return scorecard;
  }

  // Invoice operations
  async getUserInvoices(userId: string): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .orderBy(desc(invoices.createdAt));
  }

  async createInvoice(invoiceData: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db.insert(invoices).values(invoiceData).returning();
    return invoice;
  }

  async updateInvoiceStatus(id: string, status: string): Promise<Invoice> {
    const updateData: any = { status, updatedAt: new Date() };
    if (status === 'paid') {
      updateData.paidAt = new Date();
    } else if (status === 'refunded') {
      updateData.refundedAt = new Date();
    }

    const [invoice] = await db
      .update(invoices)
      .set(updateData)
      .where(eq(invoices.id, id))
      .returning();
    return invoice;
  }
}

export const storage = new DatabaseStorage();
