"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <AlertTriangle size={32} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
          Something Went Wrong!
        </h1>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          An unexpected error occurred. Please try again or return to the
          homepage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
