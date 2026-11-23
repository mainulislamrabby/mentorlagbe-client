"use client";

import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, Clock, Crown } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getStudentStats, type StudentStats } from "@/lib/actions/student";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboardPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const studentEmail = session?.user?.email;

  useEffect(() => {
    if (isPending || !studentEmail) return;

    let cancelled = false;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentStats();

        if (!cancelled) {
          setStats(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load dashboard statistics.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [isPending, studentEmail]);

  const statCards = [
    {
      title: "Total Applied Tuitions",
      value: stats?.totalApplications ?? 0,
      description: "All your submitted applications",
      icon: BookOpen,
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      title: "Accepted Applications",
      value: stats?.acceptedApplications ?? 0,
      description: "Applications accepted by tutors",
      icon: CheckCircle2,
      iconStyle: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Applications",
      value: stats?.pendingApplications ?? 0,
      description: "Waiting for tutor responses",
      icon: Clock,
      iconStyle: "bg-amber-100 text-amber-600",
    },
    {
      title: "Current Plan",
      value: stats?.currentPlan === "pro" ? "Pro" : "Free",
      description: "Your current subscription plan",
      icon: Crown,
      iconStyle: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Student Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your tuition applications and subscription.
        </p>
      </div>

      {!isPending && !studentEmail ? (
        <p className="text-sm text-red-600">
          Unable to identify your student account.
        </p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {item.title}
                </CardTitle>

                <div className={`rounded-lg p-2 ${item.iconStyle}`}>
                  <Icon size={20} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {loading ? (
                    <span className="text-slate-400">...</span>
                  ) : error ? (
                    "—"
                  ) : (
                    item.value
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default StudentDashboardPage;
