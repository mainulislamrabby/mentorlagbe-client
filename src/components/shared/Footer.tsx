import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tuitions", href: "/tuitions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-extrabold text-blue-400">
              MentorLagbe
            </Link>

            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Connecting students with the right mentors to make learning
              easier, smarter, and more accessible.
            </p>

            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <FaFacebook className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <FaSquareInstagram className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <FaLinkedin className="h-5 w-5" />
                </Button>
              </a>

              {/* X Social Link */}

              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <FaXTwitter className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                <a
                  href="mailto:hello@mentorlagbe.com"
                  className="hover:text-white"
                >
                  hello@mentorlagbe.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-blue-400" />
                <a href="tel:+8801700000000" className="hover:text-white">
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-blue-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold">Learn & Grow</h3>

            <p className="text-sm leading-6 text-slate-400">
              Find the right tutor, explore tuition opportunities, and take the
              next step in your learning journey.
            </p>

            <Link href="/tuitions">
              <Button className={"bg-blue-600"}>Explore Tuitions</Button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
