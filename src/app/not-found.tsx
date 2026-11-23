import Link from "next/link";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Sorry, the page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;