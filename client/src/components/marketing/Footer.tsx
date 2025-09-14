import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Subsentry</span>
            </Link>
            <p className="text-slate-400 text-sm">
              AI-powered subscription management that saves you money and time. 
              Never pay for unwanted subscriptions again.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#integrations" className="text-slate-400 hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#api" className="text-slate-400 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#press" className="text-slate-400 hover:text-white transition-colors">Press Kit</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#cookies" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="#gdpr" className="text-slate-400 hover:text-white transition-colors">GDPR</Link></li>
              <li><Link href="#security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Subsentry. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Made with ❤️ for financial freedom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}