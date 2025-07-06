'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: 'Hobby',
    price: 'Free',
    description: 'Perfect for side projects and hobby blogs',
    features: [
      'Up to 3 blog posts',
      'Basic analytics',
      'Community support',
      'Basic customization'
    ]
  },
  {
    name: 'Pro',
    price: '$19/month',
    description: 'Best for professional bloggers and small teams',
    features: [
      'Unlimited blog posts',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'SEO optimization',
      'Collaboration tools'
    ]
  },
  {
    name: 'Enterprise',
    price: '$49/month',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Advanced security',
      'Team management'
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-muted-foreground">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.name} className="p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
            <p className="text-3xl font-bold mb-4">{tier.price}</p>
            <p className="text-muted-foreground mb-6">{tier.description}</p>
            <div className="flex-grow space-y-4">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6">
              Get started with {tier.name}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}