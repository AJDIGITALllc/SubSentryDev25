import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight, Headphones } from "lucide-react";

interface TaskProgressData {
  id: string;
  merchantName: string;
  status: string;
  progress: number;
  currentStep: string;
  estimatedCompletionTime: string;
  createdAt: string;
}

interface TaskProgressProps {
  task: TaskProgressData;
  'data-testid'?: string;
}

export default function TaskProgress({ task, 'data-testid': testId }: TaskProgressProps) {
  const getMerchantInitial = () => {
    return task.merchantName.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  const getMerchantColor = () => {
    const colors: { [key: string]: string } = {
      'Planet Fitness': 'bg-purple-600',
      'Xfinity Internet': 'bg-blue-600',
      'Comcast': 'bg-blue-600'
    };
    return colors[task.merchantName] || 'bg-primary';
  };

  const getSteps = () => {
    if (task.merchantName.includes('Planet Fitness')) {
      return [
        {
          title: "Phone Attempt Complete",
          description: "AI agent called, redirected to cancellation department",
          status: "completed",
          time: "12:34 PM"
        },
        {
          title: "Sending Certified Letter",
          description: "Generating termination letter with account details",
          status: "active",
          time: "Now"
        },
        {
          title: "Delivery Confirmation",
          description: "Track delivery and verify cancellation",
          status: "pending",
          time: "Pending"
        }
      ];
    } else {
      return [
        {
          title: "AI Voice Agent Active",
          description: "Currently in queue, estimated wait time: 12 minutes",
          status: "active",
          time: "Now"
        },
        {
          title: "Retention Discussion",
          description: "Handle upsell attempts and confirm cancellation",
          status: "pending",
          time: "Pending"
        },
        {
          title: "Confirmation & Evidence",
          description: "Secure cancellation ID and call recording",
          status: "pending",
          time: "Pending"
        }
      ];
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Check className="text-white h-3 w-3" />
          </div>
        );
      case 'active':
        return (
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-pulse">
            <Clock className="text-accent-foreground h-3 w-3" />
          </div>
        );
      default:
        return <div className="w-6 h-6 border-2 border-muted rounded-full"></div>;
    }
  };

  const steps = getSteps();
  const taskIdDisplay = task.merchantName.includes('Planet Fitness') ? '#PF-4821' : '#XF-9203';
  const stepNumber = task.merchantName.includes('Planet Fitness') ? '2 of 3' : '1 of 3';

  return (
    <Card data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${getMerchantColor()} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-xs">
                {getMerchantInitial()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground" data-testid="text-task-title">
                {task.merchantName} Cancellation
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-task-info">
                Started {task.createdAt} • Task ID: {taskIdDisplay}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-accent" data-testid="text-task-status">
              {task.status === 'in_progress' ? 'In Progress' : task.status}
            </div>
            <div className="text-xs text-muted-foreground">Step {stepNumber}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500" 
              style={{ width: `${task.progress}%` }}
              data-testid="progress-bar"
            />
          </div>

          <div className="space-y-3" data-testid="task-steps">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                {getStepIcon(step.status)}
                <div className="flex-1">
                  <div className={`font-medium ${
                    step.status === 'completed' ? 'text-foreground' :
                    step.status === 'active' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {step.description}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.time}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Estimated completion: <span className="font-medium text-foreground">{task.estimatedCompletionTime}</span>
            </div>
            {task.merchantName.includes('Xfinity') ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary/80"
                data-testid="button-listen-live"
              >
                Listen Live <Headphones className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary/80"
                data-testid="button-view-details"
              >
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
