"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as
    | {
        name: string;
        email: string;
        image?: string | null;
        role?: "student" | "tutor" | "admin";
        plan?: "free" | "pro";
      }
    | undefined;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tuitions", href: "/tuitions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  const dashboardHref = user?.role ? `/dashboard/${user.role}` : "/dashboard";

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsPopoverOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-extrabold text-blue-600"
        >
          MentorLagbe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-2 py-1.5 text-left transition-colors hover:bg-blue-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="bg-[#2563EB] text-xs font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-col items-start">
                  <div className="flex items-center gap-1">
                    <span className="max-w-28 truncate text-xs font-semibold text-[#0F172A]">
                      {user.name}
                    </span>

                    {user.plan === "pro" && (
                      <Badge className="h-4 border border-[#F59E0B] bg-amber-50 px-1 text-[9px] text-[#D97706]">
                        ✨ PRO
                      </Badge>
                    )}
                  </div>

                  <span className="text-[10px] capitalize text-[#64748B]">
                    {user.role}
                  </span>
                </div>

                <ChevronDown className="ml-1 h-3.5 w-3.5 shrink-0 text-[#64748B]" />
              </PopoverTrigger>

              <PopoverContent align="end" className="w-64 p-3">
                {/* User Information */}
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image ?? ""} alt={user.name} />
                    <AvatarFallback className="bg-teal-100 font-semibold text-teal-700">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Role & Plan */}
                <div className="flex items-center gap-2 border-b py-3">
                  <Badge className="border border-blue-100 bg-blue-50 text-[#2563EB] capitalize">
                    {user.role ?? "User"}
                  </Badge>

                  {user.plan === "pro" && (
                    <Badge className="border border-amber-200 bg-amber-50 text-[#D97706]">
                      PRO
                    </Badge>
                  )}
                </div>

                {/* Navigation */}
                <div className="space-y-1 py-2">
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#2563EB]" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    Update Profile
                  </Link>
                </div>

                {/* Sign Out */}
                <div className="border-t pt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => router.push("/sign-in")}>
                Sign In
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md border">
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-8">
                <Link href="/" className="text-xl font-extrabold text-blue-600">
                  MentorLagbe
                </Link>

                {/* Navigation Links - Always Visible */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4">
                  {isPending ? (
                    <div className="h-9 animate-pulse rounded-md bg-muted" />
                  ) : user ? (
                    <div className="flex flex-col gap-4">
                      {/* Mobile User Information */}
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image ?? ""} />
                          <AvatarFallback className="bg-teal-100 font-semibold text-teal-700">
                            {user.name?.charAt(0).toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className="capitalize">
                              {user.role}
                            </Badge>

                            {user.plan === "pro" && (
                              <Badge className="border border-amber-500 bg-transparent text-amber-500">
                                PRO
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={dashboardHref}
                        className="flex items-center gap-2 text-sm"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 text-sm"
                      >
                        <UserRound className="h-4 w-4" />
                        Update Profile
                      </Link>

                      <Button
                        variant="outline"
                        className="w-full text-red-600"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/sign-in")}
                      >
                        Sign In
                      </Button>

                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => router.push("/sign-up")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
