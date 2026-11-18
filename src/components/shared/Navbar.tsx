import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tuitions", href: "/tuitions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          MentorLagbe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
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

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost">
            <Link href="/sign-in">Sign In</Link>
          </Button>

          <Button className={"bg-blue-600"}>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border">
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className={"conatiner mx-auto ps-4"}>
              <div className="flex flex-col gap-6 pt-8">
                <Link href="/" className="text-xl font-extrabold text-blue-600">
                  MentorLagbe
                </Link>

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

                <div className="flex flex-col gap-3">
                  <Button variant="outline">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>

                  <Button>
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
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
