import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  analyzeCancellationStrategy, 
  generateCancellationCommunication,
  analyzeCancellationEvidence 
} from "./openai";
import Stripe from "stripe";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard data route
  app.get('/api/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const [subscriptions, activeTasks, recentEvidence, invoices] = await Promise.all([
        storage.getUserSubscriptions(userId),
        storage.getActiveCancellationTasks(userId),
        storage.getUserCancellationTasks(userId).then(tasks => 
          Promise.all(tasks.slice(0, 3).map(task => storage.getTaskEvidence(task.id)))
        ),
        storage.getUserInvoices(userId)
      ]);

      // Calculate savings
      const monthlySavings = subscriptions
        .filter(sub => sub.status === 'cancelled')
        .reduce((total, sub) => total + parseFloat(sub.amount), 0);

      const totalTaskFees = invoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((total, invoice) => total + parseFloat(invoice.amount), 0);

      res.json({
        subscriptions,
        activeTasks,
        recentEvidence: recentEvidence.flat(),
        monthlySavings,
        totalTaskFees,
        netSavings: monthlySavings - totalTaskFees,
        stats: {
          activeSubscriptions: subscriptions.filter(sub => sub.status === 'active').length,
          cancelledThisMonth: subscriptions.filter(sub => 
            sub.status === 'cancelled' && 
            sub.updatedAt && 
            new Date(sub.updatedAt).getMonth() === new Date().getMonth()
          ).length,
          activeAITasks: activeTasks.length
        }
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Get user subscriptions
  app.get('/api/subscriptions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscriptions = await storage.getUserSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  // Create new subscription (manual entry)
  app.post('/api/subscriptions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscriptionData = {
        ...req.body,
        userId,
        detectionSource: 'manual'
      };
      
      const subscription = await storage.createSubscription(subscriptionData);
      res.status(201).json(subscription);
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  // Get merchants
  app.get('/api/merchants', async (req, res) => {
    try {
      const merchants = await storage.getAllMerchants();
      res.json(merchants);
    } catch (error) {
      console.error("Error fetching merchants:", error);
      res.status(500).json({ message: "Failed to fetch merchants" });
    }
  });

  // Get merchant scorecard
  app.get('/api/merchants/:merchantId/scorecard', async (req, res) => {
    try {
      const { merchantId } = req.params;
      const { period = 'last30' } = req.query;
      
      const scorecard = await storage.getMerchantScorecard(merchantId, period as string);
      
      if (!scorecard) {
        return res.status(404).json({ message: "Scorecard not found" });
      }
      
      res.json(scorecard);
    } catch (error) {
      console.error("Error fetching merchant scorecard:", error);
      res.status(500).json({ message: "Failed to fetch merchant scorecard" });
    }
  });

  // Create cancellation task
  app.post('/api/cancellation-tasks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { subscriptionId } = req.body;
      
      const subscription = await storage.getSubscription(subscriptionId);
      if (!subscription || subscription.userId !== userId) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Get or create merchant
      let merchant = subscription.merchantId ? 
        await storage.getMerchant(subscription.merchantId) : null;
      
      if (!merchant) {
        // Create merchant if it doesn't exist
        merchant = await storage.createMerchant({
          merchantId: subscription.subscriptionName.toLowerCase().replace(/\s+/g, '.'),
          displayName: subscription.subscriptionName,
          category: 'Unknown'
        });
      }

      // Analyze cancellation strategy using AI
      const strategy = await analyzeCancellationStrategy(
        merchant.displayName,
        merchant.category,
        { userId, subscription }
      );

      // Create cancellation task
      const taskData = {
        userId,
        subscriptionId,
        merchantId: merchant.id,
        status: 'queued' as const,
        currentStep: 'analyzing',
        currentChannel: strategy.recommendedStrategies[0]?.channel || 'portal',
        progress: 0,
        estimatedCompletionTime: new Date(Date.now() + (strategy.recommendedStrategies[0]?.estimatedTimeMinutes || 60) * 60000)
      };

      const task = await storage.createCancellationTask(taskData);
      
      // Start async processing (in a real app, this would be a queue/worker)
      processCancellationTask(task.id, strategy);
      
      res.status(201).json({ task, strategy });
    } catch (error) {
      console.error("Error creating cancellation task:", error);
      res.status(500).json({ message: "Failed to create cancellation task" });
    }
  });

  // Get cancellation tasks
  app.get('/api/cancellation-tasks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const tasks = await storage.getUserCancellationTasks(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching cancellation tasks:", error);
      res.status(500).json({ message: "Failed to fetch cancellation tasks" });
    }
  });

  // Get task evidence
  app.get('/api/cancellation-tasks/:taskId/evidence', isAuthenticated, async (req: any, res) => {
    try {
      const { taskId } = req.params;
      const evidence = await storage.getTaskEvidence(taskId);
      res.json(evidence);
    } catch (error) {
      console.error("Error fetching task evidence:", error);
      res.status(500).json({ message: "Failed to fetch task evidence" });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { amount, taskId, description } = req.body;
      const userId = req.user.claims.sub;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          userId,
          taskId: taskId || '',
          description: description || 'Cancellation task fee'
        }
      });

      // Create invoice record
      await storage.createInvoice({
        userId,
        taskId,
        stripePaymentIntentId: paymentIntent.id,
        amount: amount.toString(),
        status: 'pending',
        description
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook for payment confirmation (simplified)
  app.post('/api/webhooks/stripe', async (req, res) => {
    try {
      // In production, verify webhook signature
      const event = req.body;
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const { userId, taskId } = paymentIntent.metadata;
        
        // Update invoice status
        const invoices = await storage.getUserInvoices(userId);
        const invoice = invoices.find(inv => inv.stripePaymentIntentId === paymentIntent.id);
        
        if (invoice) {
          await storage.updateInvoiceStatus(invoice.id, 'paid');
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simulate cancellation task processing
async function processCancellationTask(taskId: string, strategy: any) {
  try {
    // Simulate multi-step cancellation process
    await storage.updateCancellationTaskStatus(taskId, 'in_progress', 10);
    
    // Simulate attempting first strategy
    await new Promise(resolve => setTimeout(resolve, 2000));
    await storage.updateCancellationTaskStatus(taskId, 'in_progress', 33);
    
    // Simulate generating communication
    await new Promise(resolve => setTimeout(resolve, 3000));
    await storage.updateCancellationTaskStatus(taskId, 'in_progress', 67);
    
    // Simulate evidence collection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock evidence
    await storage.createEvidence({
      taskId,
      type: 'screenshot',
      fileName: 'cancellation_confirmation.png',
      description: 'Portal cancellation confirmation screenshot',
      isVerified: true
    });
    
    // Mark as completed
    await storage.updateCancellationTaskStatus(taskId, 'succeeded', 100);
    
  } catch (error) {
    console.error("Error processing cancellation task:", error);
    await storage.updateCancellationTaskStatus(taskId, 'failed', 0);
  }
}
