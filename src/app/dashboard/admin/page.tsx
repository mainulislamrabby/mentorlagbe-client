import Link from "next/link";
import {
  Users,
  GraduationCap,
  ClipboardList,
  Wallet,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Users",
    value: "—",
    description: "All registered users",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Tutors",
    value: "—",
    description: "Registered tutors",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Total Tuitions",
    value: "—",
    description: "Pending and approved listings",
    icon: ClipboardList,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Stripe Revenue",
    value: "—",
    description: "Total successful payments",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
  },
];

const adminLinks = [
  {
    title: "Manage Users",
    description: "View users and manage their roles.",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Manage Tuitions",
    description: "Review, approve, or reject tuition posts.",
    href: "/dashboard/admin/tuitions",
    icon: ClipboardList,
  },
  {
    title: "Transactions",
    description: "View subscription payment records.",
    href: "/dashboard/admin/transactions",
    icon: Wallet,
  },
];

const AdminDashboardPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Admin Panel
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor and manage the MentorLagbe platform.
            </p>
          </div>

          <div className="text-sm text-slate-500">Platform Administration</div>
        </div>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Platform Statistics
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
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
                      {stat.value}
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

        {/* Tuition Status */}
        <section className="mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Tuition Approval Status</CardTitle>
              <p className="text-sm text-slate-500">
                Overview of submitted tuition listings.
              </p>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Pending</p>
                    <p className="text-xs text-slate-500">
                      Awaiting admin review
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold">—</span>
              </div>

              <div className="flex items-center justify-between rounded-lg border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Approved</p>
                    <p className="text-xs text-slate-500">
                      Approved tuition listings
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold">—</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Management Links */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Management
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {adminLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex items-start justify-between p-5">
                      <div>
                        <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                          <Icon size={22} />
                        </div>

                        <h3 className="font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {item.description}
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

export default AdminDashboardPage;
