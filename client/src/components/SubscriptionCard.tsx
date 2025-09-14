import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Bot, Clock, Phone, CircleDotDashed } from "lucide-react";
import { format } from "date-fns";

interface Subscription {
  id: string;
  subscriptionName: string;
  amount: string;
  billingCycle: string;
  nextBillingDate?: string;
  status: string;
  merchant?: {
    displayName: string;
    category: string;
    logoUrl?: string;
  };
}

interface SubscriptionCardProps {
  subscription: Subscription;
  isActiveTask?: boolean;
  'data-testid'?: string;
}

export default function SubscriptionCard({ 
  subscription, 
  isActiveTask = false,
  'data-testid': testId 
}: SubscriptionCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/cancellation-tasks", {
        subscriptionId: subscription.id
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "AI Agent Started",
        description: `Cancellation task created for ${subscription.subscriptionName}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
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
      toast({
        title: "Error",
        description: "Failed to create cancellation task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCancelWithAI = () => {
    setIsCreatingTask(true);
    createTaskMutation.mutate();
  };

  const getWinRateBadge = () => {
    // Mock win rates based on subscription name
    const winRates: { [key: string]: { rate: number; difficulty: string } } = {
      'Netflix': { rate: 95, difficulty: 'Easy' },
      'Planet Fitness': { rate: 74, difficulty: 'Hard' },
      'Xfinity': { rate: 81, difficulty: 'Very Hard' },
      'Spotify Premium': { rate: 97, difficulty: 'Easy' },
      'Adobe Creative Cloud': { rate: 88, difficulty: 'Medium' },
      '24 Hour Fitness': { rate: 82, difficulty: 'Medium' }
    };

    const data = winRates[subscription.subscriptionName] || { rate: 85, difficulty: 'Medium' };
    
    if (data.rate >= 90) {
      return <Badge className="success-badge">{data.difficulty} • {data.rate}% Win Rate</Badge>;
    } else if (data.rate >= 80) {
      return <Badge className="warning-badge">{data.difficulty} • {data.rate}% Win Rate</Badge>;
    } else {
      return <Badge className="danger-badge">{data.difficulty} • {data.rate}% Win Rate</Badge>;
    }
  };

  const getMerchantInitial = () => {
    return subscription.subscriptionName.charAt(0).toUpperCase();
  };

  const getMerchantColor = () => {
    const colors: { [key: string]: string } = {
      'Netflix': 'bg-red-600',
      'Planet Fitness': 'bg-purple-600',
      'Xfinity': 'bg-blue-600',
      'Spotify Premium': 'bg-green-500',
      'Adobe Creative Cloud': 'bg-red-500',
      '24 Hour Fitness': 'bg-orange-500'
    };
    return colors[subscription.subscriptionName] || 'bg-primary';
  };

  const formatNextBilling = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${
        isActiveTask ? 'border-accent' : 'border-border'
      }`}
      data-testid={testId}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${getMerchantColor()} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {getMerchantInitial()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground" data-testid="text-subscription-name">
                {subscription.subscriptionName}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-subscription-category">
                {subscription.merchant?.category || 'Subscription'}
              </p>
            </div>
          </div>
          {getWinRateBadge()}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {subscription.billingCycle === 'annual' ? 'Annual Cost' : 'Monthly Cost'}
            </span>
            <span className="font-semibold text-foreground" data-testid="text-subscription-amount">
              ${subscription.amount}
            </span>
          </div>
          
          {subscription.nextBillingDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Next Billing</span>
              <span className="text-sm text-foreground" data-testid="text-next-billing">
                {formatNextBilling(subscription.nextBillingDate)}
              </span>
            </div>
          )}

          {isActiveTask && (
            <div className="bg-accent/10 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-accent-foreground">AI Agent Active</span>
              </div>
              <div className="text-xs text-muted-foreground mb-2">Step 2 of 3: Sending certified letter</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          )}

          {subscription.subscriptionName === 'Xfinity' && !isActiveTask && (
            <div className="bg-warning/10 p-2 rounded text-xs text-warning flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>Phone-only cancellation required</span>
            </div>
          )}

          {subscription.subscriptionName === 'Adobe Creative Cloud' && !isActiveTask && (
            <div className="bg-warning/10 p-2 rounded text-xs text-warning flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Early termination fee may apply</span>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            {isActiveTask ? (
              <Button 
                disabled
                className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                data-testid="button-cancellation-in-progress"
              >
                <CircleDotDashed className="mr-2 h-4 w-4" />
                Cancellation in CircleDotDashed
              </Button>
            ) : subscription.subscriptionName === 'Xfinity' ? (
              <Button 
                onClick={handleCancelWithAI}
                disabled={isCreatingTask}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-schedule-ai-call"
              >
                <Phone className="mr-2 h-4 w-4" />
                {isCreatingTask ? 'Starting...' : 'Schedule AI Call'}
              </Button>
            ) : subscription.subscriptionName === 'Adobe Creative Cloud' ? (
              <Button 
                onClick={handleCancelWithAI}
                disabled={isCreatingTask}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-calculate-savings"
              >
                <Bot className="mr-2 h-4 w-4" />
                {isCreatingTask ? 'Starting...' : 'Calculate Savings'}
              </Button>
            ) : (
              <Button 
                onClick={handleCancelWithAI}
                disabled={isCreatingTask}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-cancel-with-ai"
              >
                <Bot className="mr-2 h-4 w-4" />
                {isCreatingTask ? 'Starting...' : 'Cancel with AI Agent'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
