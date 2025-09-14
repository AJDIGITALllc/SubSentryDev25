import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock, TrendingUp, Shield, Phone, Mail, MessageSquare, FileText } from "lucide-react";

// Import scorecard data
import netflixScorecard from "@/data/scorecards/netflix.scorecard.json";
import comcastScorecard from "@/data/scorecards/comcast.scorecard.json";
import planetfitnessScorecard from "@/data/scorecards/planetfitness.scorecard.json";

export default function MerchantScorecardPage() {
  const { merchantId } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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

  if (isLoading) {
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

  // Get scorecard data based on merchantId
  let scorecardData;
  switch (merchantId) {
    case 'netflix':
      scorecardData = netflixScorecard;
      break;
    case 'comcast':
      scorecardData = comcastScorecard;
      break;
    case 'planetfitness':
      scorecardData = planetfitnessScorecard;
      break;
    default:
      scorecardData = netflixScorecard; // fallback
  }

  const pct = (n: number) => `${Math.round(n * 100)}%`;

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < difficulty ? 'text-destructive fill-destructive' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'portal':
        return <Shield className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'chat':
        return <MessageSquare className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'letter':
        return <FileText className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {scorecardData.displayName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-merchant-name">
                {scorecardData.displayName}
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-merchant-category">
                {scorecardData.category}
              </p>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card data-testid="card-last-30-days">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Last 30 Days</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="text-2xl font-bold text-success" data-testid="text-win-rate-30">
                  {pct(scorecardData.period.last30.winRate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Median Time</span>
                <span className="font-semibold" data-testid="text-median-time-30">
                  {scorecardData.period.last30.medianTimeMinutes}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-semibold" data-testid="text-volume-30">
                  {scorecardData.period.last30.volume}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-last-90-days">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Last 90 Days</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="text-2xl font-bold text-success" data-testid="text-win-rate-90">
                  {pct(scorecardData.period.last90.winRate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Median Time</span>
                <span className="font-semibold" data-testid="text-median-time-90">
                  {scorecardData.period.last90.medianTimeMinutes}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-semibold" data-testid="text-volume-90">
                  {scorecardData.period.last90.volume}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Channels & Metrics */}
        <Card className="mb-8" data-testid="card-channels-metrics">
          <CardHeader>
            <CardTitle>Channels & Success Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Preferred channels:</p>
              <div className="flex flex-wrap gap-2">
                {scorecardData.channels.map((channel) => (
                  <Badge key={channel} variant="outline" className="flex items-center space-x-1">
                    {getChannelIcon(channel)}
                    <span className="capitalize">{channel}</span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-3" data-testid="list-channel-success-rates">
              <p className="text-sm font-medium text-foreground">Success by channel:</p>
              {Object.entries(scorecardData.metrics.successByChannel).map(([channel, rate]) => (
                <div key={channel} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getChannelIcon(channel)}
                    <span className="capitalize text-sm">{channel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${rate * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {pct(rate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-foreground" data-testid="text-escalation-rate">
                    {pct(scorecardData.metrics.escalationRate)}
                  </div>
                  <div className="text-muted-foreground">Escalation Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground" data-testid="text-refund-rate">
                    {pct(scorecardData.metrics.refundRate)}
                  </div>
                  <div className="text-muted-foreground">Refund Rate</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground" data-testid="text-evidence-completeness">
                    {pct(scorecardData.metrics.evidenceCompletenessPct)}
                  </div>
                  <div className="text-muted-foreground">Evidence Completeness</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty & Friction */}
        <Card className="mb-8" data-testid="card-difficulty-friction">
          <CardHeader>
            <CardTitle>Difficulty & Friction Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Difficulty Rating</span>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {getDifficultyStars(scorecardData.difficulty)}
                  </div>
                  <span className="text-sm font-medium" data-testid="text-difficulty-rating">
                    {scorecardData.difficulty}/5
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Known friction points:</p>
              <ul className="space-y-2" data-testid="list-friction-flags">
                {scorecardData.frictionFlags.map((flag, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="text-sm text-foreground">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Evidence & Strategy */}
        <Card className="mb-8" data-testid="card-evidence-strategy">
          <CardHeader>
            <CardTitle>Evidence Requirements & Cancellation Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Evidence types collected:</p>
              <div className="flex flex-wrap gap-2">
                {scorecardData.evidenceBadges.map((badge) => (
                  <Badge key={badge} className="bg-primary/10 text-primary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            {scorecardData.howWeCancel && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">How we cancel:</p>
                <ol className="space-y-2" data-testid="list-cancellation-steps">
                  {scorecardData.howWeCancel.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {scorecardData.notes && (
              <div className="pt-6 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Additional Notes:</p>
                <p className="text-sm text-muted-foreground" data-testid="text-additional-notes">
                  {scorecardData.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Updates */}
        {scorecardData.recentUpdates && scorecardData.recentUpdates.length > 0 && (
          <Card className="mb-8" data-testid="card-recent-updates">
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3" data-testid="list-recent-updates">
                {scorecardData.recentUpdates.map((update, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{update}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90"
            data-testid="button-start-cancellation"
          >
            <Shield className="mr-2 h-5 w-5" />
            Start AI Cancellation for {scorecardData.displayName}
          </Button>
        </div>
      </div>
    </div>
  );
}
