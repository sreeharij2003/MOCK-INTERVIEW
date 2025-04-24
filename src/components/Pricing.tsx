
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Trial",
      description: "Perfect for exploring our platform",
      price: { monthly: 0, annual: 0 },
      features: [
        "3 mock interviews",
        "Basic AI feedback",
        "Limited question bank",
        "Email support"
      ],
      popular: false,
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      description: "Everything you need for serious prep",
      price: { monthly: 29, annual: 19 },
      features: [
        "Unlimited mock interviews",
        "Advanced AI feedback",
        "Full question bank",
        "Industry-specific questions",
        "Video recordings",
        "Priority email support"
      ],
      popular: true,
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      description: "For teams and companies",
      price: { monthly: 79, annual: 59 },
      features: [
        "Everything in Professional",
        "Team management dashboard",
        "Custom question sets",
        "Interview analytics",
        "Branded environment",
        "Dedicated account manager",
        "24/7 priority support"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choose the perfect plan for your interview preparation needs
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <span className={`text-sm ${!isAnnual ? "font-medium" : "text-gray-500"}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)} 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isAnnual ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} 
              />
            </button>
            <span className={`text-sm ${isAnnual ? "font-medium" : "text-gray-500"}`}>
              Annual <span className="text-green-600 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? "border-blue-600 shadow-lg" : "shadow-md"}`}>
              {plan.popular && (
                <div className="bg-blue-600 text-white py-1 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-4xl font-bold">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                  {isAnnual && (
                    <div className="text-sm text-gray-500">billed annually</div>
                  )}
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans come with a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
