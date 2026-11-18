"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUpPage = () => {
  const router = useRouter();

  const [role, setRole] = useState<"student" | "tutor">("student");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // TODO: Implement role-based registration
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      // Role must be supported by your Better Auth additionalFields config.
      role,
    });

    setIsLoading(false);

    if (error) {
      // TODO: Show error toast
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogleSignUp = async () => {
    // TODO: Implement Google sign-up and role handling
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <GraduationCap className="h-6 w-6" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Create Your Account
          </CardTitle>

          <CardDescription>
            Join MentorLagbe as a student or tutor
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>

              <Select
                value={role}
                onValueChange={(value) => setRole(value as "student" | "tutor")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="tutor">Tutor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignUp}
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
