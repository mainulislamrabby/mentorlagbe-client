"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-lg border-0 shadow-sm">
        <CardContent className="p-8 text-center sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="size-9 text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Payment Cancelled
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your payment was cancelled. No subscription has been
            activated on your account.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/pricing">Return to Pricing</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentCancelPage;