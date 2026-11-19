"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    href: "/dashboard/tutor",
    icon: LayoutDashboard,
  },
  {
    title: "Post a Tuition",
    href: "/dashboard/tutor/post-tuition",
    icon: Plus,
  },
  {
    title: "My Tuitions",
    href: "/dashboard/tutor/my-tuitions",
    icon: BookOpen,
  },
  {
    title: "Applicants",
    href: "/dashboard/tutor/applicants",
    icon: Users,
  },
];

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Desktop Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-white p-5 lg:block">
          <Link
            href="/dashboard/tutor"
            className="mb-10 flex items-center gap-2"
          >
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">MentorLagbe</h2>
              <p className="text-xs text-slate-500">Tutor Dashboard</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/tutor" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <Icon size={19} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-5 right-5 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">Tutor Panel</p>
            <p className="mt-1 text-xs text-blue-700">
              Manage your tuitions and student applications.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Mobile Navigation */}
          <div className="border-b bg-white p-4 lg:hidden">
            <Link
              href="/dashboard/tutor"
              className="mb-4 flex items-center gap-2"
            >
              <GraduationCap className="text-blue-600" size={24} />
              <span className="font-bold text-slate-900">
                MentorLagbe Tutor
              </span>
            </Link>

            <nav className="flex gap-2 overflow-x-auto pb-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard/tutor" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-600",
                    )}
                  >
                    <Icon size={16} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
