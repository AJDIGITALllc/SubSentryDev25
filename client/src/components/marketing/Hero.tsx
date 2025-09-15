import { Button } from "@/components/ui/button";
import { Zap, Shield, Bot, CheckCircle } from "lucide-react";
import subsentryLogo from "@assets/SUBSENTRY WORD LOGO (2)_1757901036549.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img 
              src={subsentryLogo} 
              alt="Subsentry" 
              className="h-32 w-auto max-w-md"
            />
          </div>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-200 text-sm font-medium mb-6" data-testid="badge-ai-powered">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Subscription Management
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">Never Pay for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Unwanted Subscriptions
            </span>
            <br />
            <span className="text-white">Again</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            Subsentry's AI automatically identifies, monitors, and cancels subscriptions you don't want. 
            Get back control of your finances with intelligent subscription management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
              data-testid="button-get-started"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm"
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No Setup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>AI-Powered Detection</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
}