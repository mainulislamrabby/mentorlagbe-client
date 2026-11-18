"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    role: "For Students",
    freePrice: "$0",
    proPrice: "$10",
    freeFeatures: [
      "Browse all approved tuitions",
      "Apply for tuition opportunities",
      "Track application status",
    ],
    proFeatures: [
      "Everything in Free",
      "Priority booking",
      "Pro membership badge",
    ],
  },
  {
    role: "For Tutors",
    freePrice: "$0",
    proPrice: "$15",
    freeFeatures: [
      "Create up to 2 tuition posts",
      "Manage tuition applications",
      "Basic tutor profile",
    ],
    proFeatures: [
      "Everything in Free",
      "Unlimited tuition posts",
      "Verified Pro badge",
    ],
  },
];

const PricingSection = () => {
  // TODO: Implement Stripe Checkout for the selected role and plan.
  const handleSubscribe = (role: string) => {
    // TODO: Create a Stripe Checkout session and redirect the user.
    console.log(`Subscribe to Pro plan for ${role}`);
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Simple & Transparent
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Plans That Fit Your Goals
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Start for free and upgrade when you need more opportunities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.role} className="overflow-hidden">
              <CardHeader className="border-b bg-white p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.role}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Choose the plan that works best for you.
                </p>
              </CardHeader>

              <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8">
                {/* Free Plan */}
                <div className="space-y-5">
                  <div>
                    <Badge variant="secondary">Free</Badge>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        {plan.freePrice}
                      </span>

                      <span className="text-sm text-slate-500">/ month</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-600">
                    {plan.freeFeatures.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-blue-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="w-full" disabled>
                    Current Free Plan
                  </Button>
                </div>

                {/* Pro Plan */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                  <div>
                    <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                      Pro
                    </Badge>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        {plan.proPrice}
                      </span>

                      <span className="text-sm text-slate-500">/ month</span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {plan.proFeatures.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="font-semibold text-blue-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-6 w-full"
                    onClick={() => handleSubscribe(plan.role)}
                  >
                    Subscribe to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
