
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CreditCard,
  GraduationCap,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    title: "Overview",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    title: "Browse Tuitions",
    href: "/tuitions",
    icon: BookOpen,
  },
  {
    title: "My Applications",
    href: "/dashboard/student/my-applications",
    icon: ClipboardList,
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/dashboard/student" && pathname.startsWith(`${href}/`));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 border-r bg-white p-5 transition-all duration-300 lg:block",
            sidebarOpen ? "w-20" : "w-64",
          )}
        >
          <div className="mb-10 flex items-center justify-between">
            <Link href="/dashboard/student" className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2 text-white">
                <GraduationCap size={24} />
              </div>

              {!sidebarOpen && (
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    MentorLagbe
                  </h2>
                  <p className="text-xs text-slate-500">Student Dashboard</p>
                </div>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </Button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={sidebarOpen ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    sidebarOpen && "justify-center",
                  )}
                >
                  <Icon size={19} />
                  {!sidebarOpen && item.title}
                </Link>
              );
            })}
          </nav>

          {!sidebarOpen && (
            <div className="absolute bottom-6 left-5 right-5 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">
                Student Panel
              </p>
              <p className="mt-1 text-xs text-blue-700">
                Find and manage your tuition applications.
              </p>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b bg-white px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Toggle navigation"
              >
                <Menu size={22} />
              </Button>

              <h1 className="text-lg font-semibold text-slate-900">
                Student Dashboard
              </h1>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                Student Account
              </p>
              <p className="text-xs text-slate-500">Welcome back</p>
            </div>
          </header>

          {/* Mobile Navigation */}
          {mobileNavOpen && (
            <div className="border-b bg-white p-4 lg:hidden">
              <nav className="flex flex-wrap gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                        isActive(item.href)
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
          )}

          <Separator />

          {children}
        </div>
      </div>
    </div>
  );
}
