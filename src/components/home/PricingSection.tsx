"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { authClient } from "@/lib/auth-client";
import { createCheckoutSession } from "@/lib/actions/payment";

const plans = [
  {
    role: "student" as const,
    title: "For Students",
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
    role: "tutor" as const,
    title: "For Tutors",
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
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<
    "student" | "tutor" | null
  >(null);

  const { data: session } = authClient.useSession();

  const user = session?.user as
    | {
        role?: "student" | "tutor" | "admin";
        plan?: "free" | "pro";
      }
    | undefined;

  const handleSubscribe = async (
    role: "student" | "tutor",
  ) => {
    if (!session?.user) {
      toast.error("Please sign in before subscribing.");

      router.push("/sign-in");

      return;
    }

    if (user?.role === "admin") {
      toast.error("Admin accounts cannot subscribe to Pro.");

      return;
    }

    if (user?.role !== role) {
      toast.error(
        `This plan is only available for ${role === "student" ? "students" : "tutors"}.`,
      );

      return;
    }

    if (user?.plan === "pro") {
      toast.info("You are already subscribed to Pro.");

      return;
    }

    try {
      setLoadingRole(role);

      const checkoutUrl = await createCheckoutSession();

      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to start checkout.",
      );
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {plans.map((plan) => {
            const isCurrentRole = user?.role === plan.role;
            const isPro = user?.plan === "pro";

            return (
              <Card key={plan.role} className="overflow-hidden">
                <CardHeader className="border-b bg-white p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    {plan.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Choose the plan that works best for you.
                  </p>
                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  {/* Free */}
                  <div className="space-y-5">
                    <div>
                      <Badge variant="secondary">Free</Badge>

                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-900">
                          {plan.freePrice}
                        </span>

                        <span className="text-sm text-slate-500">
                          / month
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-600">
                      {plan.freeFeatures.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      {isCurrentRole && !isPro
                        ? "Current Free Plan"
                        : "Free Plan"}
                    </Button>
                  </div>

                  {/* Pro */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                    <div>
                      <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                        Pro
                      </Badge>

                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-900">
                          {plan.proPrice}
                        </span>

                        <span className="text-sm text-slate-500">
                          / month
                        </span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-3 text-sm text-slate-700">
                      {plan.proFeatures.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="mt-6 w-full"
                      disabled={
                        !isCurrentRole ||
                        isPro ||
                        loadingRole !== null
                      }
                      onClick={() => handleSubscribe(plan.role)}
                    >
                      {loadingRole === plan.role ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Redirecting...
                        </>
                      ) : isPro && isCurrentRole ? (
                        "Already Pro"
                      ) : (
                        "Subscribe to Pro"
                      )}
                    </Button>

                    {!session?.user && (
                      <p className="mt-2 text-center text-xs text-slate-500">
                        Sign in to subscribe.
                      </p>
                    )}

                    {session?.user && !isCurrentRole && (
                      <p className="mt-2 text-center text-xs text-slate-500">
                        This plan is for{" "}
                        {plan.role === "student"
                          ? "students"
                          : "tutors"}
                        .
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;