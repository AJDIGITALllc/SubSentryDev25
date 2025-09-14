import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import SubscriptionCard from "@/components/SubscriptionCard";
import TaskProgress from "@/components/TaskProgress";
import EvidenceCard from "@/components/EvidenceCard";
import MerchantScorecard from "@/components/MerchantScorecard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBank, Layers, Zap, RefreshCw, Database } from "lucide-react";

// Import scorecard data
import netflixScorecard from "@/data/scorecards/netflix.scorecard.json";
import comcastScorecard from "@/data/scorecards/comcast.scorecard.json";
import planetfitnessScorecard from "@/data/scorecards/planetfitness.scorecard.json";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankName, setBankName] = useState("");

  interface DashboardData {
    stats: {
      activeSubscriptions: number;
      cancelledThisMonth: number;
      activeAITasks: number;
    };
    subscriptions: any[];
    activeTasks: any[];
    recentEvidence: any[];
  }

  const { data: dashboardData, isLoading: isDashboardLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized", 
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [error, toast]);

  if (isLoading || isDashboardLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = dashboardData?.stats || { activeSubscriptions: 0, cancelledThisMonth: 0, activeAITasks: 0 };
  const subscriptions = dashboardData?.subscriptions || [];
  const activeTasks = dashboardData?.activeTasks || [];
  const recentEvidence = dashboardData?.recentEvidence || [];

  // Helper function to get subscription category
  const getSubscriptionCategory = (name: string) => {
    const categories: { [key: string]: string } = {
      'Netflix': 'Streaming',
      'Planet Fitness': 'Gym & Wellness',
      'Xfinity': 'Telecom',
      'Spotify Premium': 'Music',
      'Adobe Creative Cloud': 'Design Software',
      '24 Hour Fitness': 'Gym & Wellness'
    };
    return categories[name] || 'Subscription';
  };

  const handleBankSync = () => {
    // Placeholder for Plaid integration
    toast({
      title: "Bank Account Connected",
      description: `Successfully connected to ${bankName}. Scanning for subscriptions...`,
    });
    setIsBankModalOpen(false);
    setBankName("");
  };

  const mockActiveTasks = [
    {
      id: "task-1",
      merchantName: "Planet Fitness",
      status: "in_progress",
      progress: 67,
      currentStep: "Sending certified letter",
      estimatedCompletionTime: "3-5 business days",
      createdAt: "2 hours ago"
    },
    {
      id: "task-2", 
      merchantName: "Xfinity Internet",
      status: "in_progress",
      progress: 33,
      currentStep: "AI Voice Agent Active",
      estimatedCompletionTime: "1-2 hours", 
      createdAt: "45 minutes ago"
    }
  ];

  const mockRecentEvidence = [
    {
      id: "evidence-1",
      merchantName: "Netflix",
      type: "screenshot",
      description: "Portal Screenshot - Cancellation confirmation page", 
      confirmationId: "NF-2024-0205-7832",
      method: "Account Portal",
      saved: "$15.99/month",
      completedDate: "2 days ago"
    },
    {
      id: "evidence-2",
      merchantName: "LA Fitness", 
      type: "recording",
      description: "Call Recording - 47 minute conversation",
      confirmationId: "LAF-2024-0129-4219",
      method: "Phone Call",
      saved: "$39.99/month",
      completedDate: "1 week ago"
    },
    {
      id: "evidence-3",
      merchantName: "Dropbox Plus",
      type: "email",
      description: "Email Receipt - Subscription cancelled confirmation",
      confirmationId: "DB-2024-0203-9167", 
      method: "Email Request",
      saved: "$11.99/month",
      completedDate: "3 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Your Subscription <span className="text-accent">Superhero</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Cancel anything. Automatically. With proof. Our AI agents fight subscription villains so you don't have to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-accent text-accent-foreground px-8 py-4 hover:bg-accent/90"
              data-testid="button-start-auto-cancellation"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Auto-Cancellation
            </Button>
            <Button 
              variant="outline"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 px-8 py-4 hover:bg-primary-foreground/30"
              data-testid="button-view-merchant-scorecards"
            >
              <Database className="mr-2 h-5 w-5" />
              View Merchant Scorecards
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card data-testid="card-monthly-savings">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Savings</h3>
                  <PiggyBank className="h-5 w-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-success mb-2" data-testid="text-monthly-savings">
                  $247.00
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-success">+12%</span> from last month
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-active-subscriptions">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Subscriptions</h3>
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2" data-testid="text-active-subscriptions">
                  {subscriptions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-destructive">3 cancelled</span> this month
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ai-tasks">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">AI Tasks Running</h3>
                  <div className="relative">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full pulse-ring"></div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent mb-2" data-testid="text-ai-tasks">
                  {activeTasks.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Planet Fitness & Comcast
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Management */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Your Subscriptions</h2>
            <Dialog open={isBankModalOpen} onOpenChange={setIsBankModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-sync-bank-account"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Bank Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect Your Bank Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input
                      id="bank-name"
                      placeholder="e.g., Chase, Bank of America, Wells Fargo"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      aria-label="Bank Name"
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setIsBankModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBankSync} disabled={!bankName.trim()}>
                      Connect Bank
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-subscriptions">
            {subscriptions.map((subscription, index) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={{
                  ...subscription,
                  merchant: {
                    displayName: subscription.subscriptionName,
                    category: getSubscriptionCategory(subscription.subscriptionName),
                    logoUrl: undefined
                  }
                }}
                isActiveTask={activeTasks.some(task => task.subscriptionId === subscription.id)}
                data-testid={`card-subscription-${subscription.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Merchant Scorecards Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Merchant Scorecards</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Intelligence reports on every merchant. Know before you cancel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-merchant-scorecards">
            <MerchantScorecard 
              data={netflixScorecard} 
              data-testid="card-merchant-netflix"
            />
            <MerchantScorecard 
              data={planetfitnessScorecard}
              data-testid="card-merchant-planetfitness" 
            />
            <MerchantScorecard 
              data={comcastScorecard}
              data-testid="card-merchant-comcast"
            />
          </div>

          <div className="text-center mt-8">
            <Button 
              className="bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90"
              data-testid="button-view-all-scorecards"
            >
              <Database className="mr-2 h-4 w-4" />
              View All Merchant Scorecards
            </Button>
          </div>
        </div>
      </section>

      {/* Task Management */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Active AI Tasks</h2>
          
          <div className="space-y-4" data-testid="list-active-tasks">
            {mockActiveTasks.map((task) => (
              <TaskProgress 
                key={task.id}
                task={task}
                data-testid={`card-task-${task.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Gallery */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Recent Cancellation Evidence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-evidence">
            {mockRecentEvidence.map((evidence) => (
              <EvidenceCard 
                key={evidence.id}
                evidence={evidence}
                data-testid={`card-evidence-${evidence.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Billing Summary */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Billing Summary</h2>
          
          <Card data-testid="card-billing-summary">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2" data-testid="text-total-saved">$67.97</div>
                  <div className="text-sm text-muted-foreground">Total Saved This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-task-fees">$24.00</div>
                  <div className="text-sm text-muted-foreground">AI Task Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2" data-testid="text-net-savings">$43.97</div>
                  <div className="text-sm text-muted-foreground">Net Savings</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
                
                <div className="space-y-3" data-testid="list-recent-transactions">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Netflix Cancellation</div>
                        <div className="text-sm text-muted-foreground">Feb 3, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">$5.00</div>
                      <div className="text-xs text-muted-foreground">Task fee</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">LA Fitness Cancellation</div>
                        <div className="text-sm text-muted-foreground">Jan 29, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">$12.00</div>
                      <div className="text-xs text-muted-foreground">Task fee</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Dropbox Plus Cancellation</div>
                        <div className="text-sm text-muted-foreground">Feb 3, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">$7.00</div>
                      <div className="text-xs text-muted-foreground">Task fee</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <span className="text-primary">ℹ</span> All failed tasks are automatically refunded
                  </div>
                  <Button 
                    onClick={() => window.open('/api/download-receipt', '_blank')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-download-receipt"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Zap className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-2xl font-bold text-primary-foreground">Subsentry</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Your subscription superhero. Fighting dark patterns and hidden cancellation flows, 
              one automated cancellation at a time.
            </p>
            <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-primary-foreground/60 text-sm">
              © 2024 Subsentry. Justice served, proof secured.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
