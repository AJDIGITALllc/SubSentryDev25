import { Button } from "@/components/ui/button";
import { Shield, Zap, ChartLine } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-primary">Subsentry</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-login"
            >
              Log In
            </Button>
          </div>
        </div>
      </nav>

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
              onClick={() => window.location.href = '/api/login'}
              className="bg-accent text-accent-foreground px-8 py-4 text-lg hover:bg-accent/90"
              data-testid="button-start-cancellation"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Auto-Cancellation
            </Button>
            <Button 
              variant="outline"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 px-8 py-4 text-lg hover:bg-primary-foreground/30"
              data-testid="button-view-scorecards"
            >
              <ChartLine className="mr-2 h-5 w-5" />
              View Merchant Scorecards
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How Subsentry Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI agents use advanced strategies to cancel your subscriptions with verifiable proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
              <p className="text-muted-foreground">
                Automatically detect subscriptions from bank transactions and email receipts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Channel Cancellation</h3>
              <p className="text-muted-foreground">
                Execute cancellations across portal, email, chat, phone, and certified mail.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartLine className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifiable Proof</h3>
              <p className="text-muted-foreground">
                Collect screenshots, recordings, and confirmations as evidence of cancellation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Fight Subscription Villains?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who have saved money and time with Subsentry's AI agents.
          </p>
          <Button 
            onClick={() => window.location.href = '/api/login'}
            size="lg"
            className="bg-primary text-primary-foreground px-8 py-4 text-lg hover:bg-primary/90"
            data-testid="button-get-started"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground h-4 w-4" />
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
