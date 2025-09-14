import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, Bot, ArrowRight, Star } from "lucide-react";

export default function MethodologyPricing() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Methodology Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Subsentry Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our AI-powered methodology ensures you never miss a subscription and always stay in control
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">AI Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Our AI scans your bank statements and identifies recurring charges, 
                even ones you forgot about or didn't notice.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Smart Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Continuous monitoring alerts you to new subscriptions, 
                price changes, and suspicious charges in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">Auto Cancellation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                With your permission, we automatically cancel unwanted subscriptions 
                and negotiate better rates on the ones you keep.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that works best for your subscription management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Basic</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                $9<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Perfect for individuals</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Up to 10 subscriptions tracked</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Monthly spending reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Email notifications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Basic cancellation assistance</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" data-testid="button-basic-plan">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-blue-500 relative shadow-xl scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                $19<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Best for families</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Unlimited subscriptions tracked</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Real-time alerts & notifications</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>AI-powered cancellation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Price negotiation service</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Family account sharing</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-pro-plan">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">
                $49<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">For businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Team management dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" data-testid="button-enterprise-plan">
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}