import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white" data-testid="text-logo">
              Subsentry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#security" className="text-slate-300 hover:text-white transition-colors">
              Security
            </Link>
            <Link href="#support" className="text-slate-300 hover:text-white transition-colors">
              Support
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-sign-up">
                <Zap className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col space-y-4">
              <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#security" className="text-slate-300 hover:text-white transition-colors">
                Security
              </Link>
              <Link href="#support" className="text-slate-300 hover:text-white transition-colors">
                Support
              </Link>
              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
                <Link href="/login">
                  <Button variant="ghost" className="w-full text-slate-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}