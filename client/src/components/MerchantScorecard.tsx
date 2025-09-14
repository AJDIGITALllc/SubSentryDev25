import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Info } from "lucide-react";

interface MerchantScorecardData {
  merchantId: string;
  displayName: string;
  category: string;
  period: {
    last30: {
      winRate: number;
      medianTimeMinutes: number;
      volume: number;
    };
    last90: {
      winRate: number;
      medianTimeMinutes: number;
      volume: number;
    };
  };
  metrics: {
    successByChannel: Record<string, number>;
    escalationRate: number;
    refundRate: number;
    evidenceCompletenessPct: number;
  };
  frictionFlags: string[];
  channels: string[];
  difficulty: number;
  evidenceBadges: string[];
  howWeCancel?: string[];
  recentUpdates?: string[];
  notes?: string;
}

interface MerchantScorecardProps {
  data: MerchantScorecardData;
  'data-testid'?: string;
}

export default function MerchantScorecard({ data, 'data-testid': testId }: MerchantScorecardProps) {
  const getMerchantInitial = () => {
    return data.displayName.charAt(0).toUpperCase();
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
    return colors[data.displayName] || 'bg-primary';
  };

  const getWinRateColor = (winRate: number) => {
    if (winRate >= 0.9) return 'text-success';
    if (winRate >= 0.8) return 'text-warning';
    return 'text-destructive';
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`text-xs ${
          i < difficulty 
            ? difficulty >= 4 ? 'text-destructive fill-destructive' : 'text-warning fill-warning'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getBestChannel = () => {
    const channels = Object.entries(data.metrics.successByChannel);
    const best = channels.reduce((prev, current) => 
      prev[1] > current[1] ? prev : current
    );
    return `${best[0].charAt(0).toUpperCase() + best[0].slice(1)} (${Math.round(best[1] * 100)}%)`;
  };

  const winRate = Math.round(data.period.last30.winRate * 100);

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      data-testid={testId}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getMerchantColor()} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {getMerchantInitial()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground" data-testid="text-merchant-name">
                {data.displayName}
              </h3>
              <p className="text-xs text-muted-foreground" data-testid="text-merchant-category">
                {data.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getWinRateColor(data.period.last30.winRate)}`} data-testid="text-win-rate">
              {winRate}%
            </div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Difficulty</span>
            <div className="flex space-x-1" data-testid="difficulty-stars">
              {getDifficultyStars(data.difficulty)}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Avg Time</span>
            <span className="font-medium text-foreground" data-testid="text-avg-time">
              {data.period.last30.medianTimeMinutes} minutes
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Best Channel</span>
            <span className="font-medium text-foreground" data-testid="text-best-channel">
              {getBestChannel()}
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex flex-wrap gap-1" data-testid="evidence-badges">
              {data.evidenceBadges.map((badge) => (
                <Badge 
                  key={badge}
                  variant="outline"
                  className={
                    badge.includes('Portal') ? 'bg-success/10 text-success border-success/20' :
                    badge.includes('Email') ? 'bg-primary/10 text-primary border-primary/20' :
                    badge.includes('Call') || badge.includes('Recorded') ? 'bg-destructive/10 text-destructive border-destructive/20' :
                    'bg-warning/10 text-warning border-warning/20'
                  }
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {data.frictionFlags.length > 0 && (
            <div className="text-xs text-muted-foreground flex items-start space-x-1" data-testid="friction-info">
              <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>{data.frictionFlags[0]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
