"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const PaymentSuccessPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  const user = session?.user as
    | {
        role?: "student" | "tutor" | "admin";
      }
    | undefined;

  const dashboardPath =
    user?.role === "student"
      ? "/dashboard/student"
      : user?.role === "tutor"
        ? "/dashboard/tutor"
        : "/";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-lg border-0 shadow-sm">
        <CardContent className="p-8 text-center sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="size-9 text-green-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Payment Successful
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your Pro subscription payment was successful. Your account will be
            upgraded to Pro after Stripe confirms the payment.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={dashboardPath}>
              <Button>Go to Dashboard</Button>
            </Link>

            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentSuccessPage;
