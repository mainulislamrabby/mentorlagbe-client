
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  Users,
  Crown,
  Plus,
  ArrowUpRight,
  UserRoundCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTutorStats, type TutorStats } from "@/lib/actions/tutor";

const quickActions = [
  {
    title: "Post a Tuition",
    description: "Create a new tuition listing and find students.",
    href: "/dashboard/tutor/post-tuition",
    icon: Plus,
  },
  {
    title: "My Tuitions",
    description: "View, edit, and manage your tuition listings.",
    href: "/dashboard/tutor/my-tuitions",
    icon: BookOpen,
  },
  {
    title: "Manage Applicants",
    description: "Review student applications and update their status.",
    href: "/dashboard/tutor/applicants",
    icon: UserRoundCheck,
  },
];

const TutorDashboardPage = () => {
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getTutorStats();
        setStats(result);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard statistics.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Tuitions Posted",
      value: stats?.totalTuitions ?? 0,
      description: "Your total tuition listings",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active / Approved",
      value: stats?.activeApprovedTuitions ?? 0,
      description: "Approved and active tuitions",
      icon: ClipboardList,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Applicants",
      value: stats?.totalApplicants ?? 0,
      description: "Students who applied",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Current Plan",
      value: stats?.currentPlan === "pro" ? "Pro" : "Free",
      description: "Your subscription plan",
      icon: Crown,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Tutor Dashboard
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your tuition listings and connect with students.
            </p>
          </div>

          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus size={18} />
            Post New Tuition
          </Link>
        </div>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Your Statistics
          </h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.title} className="border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </CardTitle>

                    <div className={`rounded-lg p-2 ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-3xl font-bold text-slate-900">
                      {loading ? "—" : stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Subscription Banner */}
        {stats?.currentPlan !== "pro" && (
          <section className="mt-8">
            <Card className="overflow-hidden border-0 bg-blue-600 text-white shadow-sm">
              <CardContent className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Crown size={20} />

                    <h2 className="text-lg font-semibold">
                      Upgrade to Tutor Pro
                    </h2>
                  </div>

                  <p className="max-w-xl text-sm text-blue-100">
                    Unlock unlimited tuition postings and grow your teaching
                    opportunities with Tutor Pro.
                  </p>
                </div>

                <Link
                  href="/pricing"
                  className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Explore Pro Plan
                  <ArrowUpRight size={17} />
                </Link>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Quick Actions */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Manage Your Account
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex items-start justify-between p-5">
                      <div>
                        <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                          <Icon size={22} />
                        </div>

                        <h3 className="font-semibold text-slate-900">
                          {action.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {action.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="text-slate-400 transition-colors group-hover:text-blue-600"
                      />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TutorDashboardPage;
