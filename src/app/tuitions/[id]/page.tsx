"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  MapPin,
  Monitor,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getTuitionDetails } from "@/lib/actions/tutor";
import { submitStudentApplication } from "@/lib/actions/student";
import type { Tuition } from "@/types/dataTypes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function TuitionDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [tuition, setTuition] = useState<Tuition | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [studentPhone, setStudentPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [studentNote, setStudentNote] = useState("");

  const role = session?.user.role;

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const data = await getTuitionDetails(params.id);
        setTuition(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load tuition details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchTuition();
  }, [params.id]);

  const handleApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      await submitStudentApplication({
        tuitionId: tuition!._id,
        studentPhone,
        preferredSchedule,
        studentNote,
      });

      toast.success("Your application has been submitted.");
      setStudentPhone("");
      setPreferredSchedule("");
      setStudentNote("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || sessionLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-12">
        <div className="container mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-8 w-40 rounded bg-blue-100" />
          <div className="aspect-video rounded-xl bg-blue-100" />
          <div className="h-8 w-2/3 rounded bg-blue-100" />
          <div className="h-40 rounded-xl bg-blue-50" />
        </div>
      </main>
    );
  }

  if (!tuition) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F8FAFC] px-4">
        <Card className="w-full max-w-md border-blue-100 text-center">
          <CardContent className="space-y-4 py-10">
            <h2 className="text-xl font-bold text-[#0F172A]">
              Tuition Not Found
            </h2>
            <p className="text-sm text-[#64748B]">
              This tuition may no longer be available.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-[#2563EB] hover:bg-[#1D4ED8]"
            >
              <ArrowLeft className="mr-2 size-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto max-w-6xl space-y-8 px-4 py-10">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="border-blue-200 text-[#2563EB] hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        {/* Tuition Banner */}
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-br from-blue-100 via-blue-50 to-amber-50 sm:aspect-21/9">
          {tuition.bannerImage ? (
            <Image
              src={tuition.bannerImage}
              alt={tuition.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-7xl font-extrabold text-[#2563EB]/30">
                ML
              </span>
            </div>
          )}

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge className="border-0 bg-[#2563EB] text-white">
              {tuition.mode}
            </Badge>
            <Badge className="border-0 bg-[#F59E0B] text-white">
              {tuition.subject}
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main Information */}
          <div className="space-y-6">
            <Card className="border-blue-100 shadow-sm">
              <CardContent className="space-y-5 p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#2563EB]">
                    {tuition.classLevel}
                  </p>
                  <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                    {tuition.title}
                  </h1>
                </div>

                <Separator className="bg-blue-100" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="size-5 shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-xs text-[#64748B]">Location</p>
                      <p className="font-medium text-[#0F172A]">
                        {tuition.location || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-xs text-[#64748B]">Schedule</p>
                      <p className="font-medium text-[#0F172A]">
                        {tuition.daysPerWeek} days per week
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {tuition.mode === "Online" ? (
                      <Wifi className="size-5 shrink-0 text-[#2563EB]" />
                    ) : (
                      <Monitor className="size-5 shrink-0 text-[#2563EB]" />
                    )}
                    <div>
                      <p className="text-xs text-[#64748B]">Tuition Mode</p>
                      <p className="font-medium text-[#0F172A]">
                        {tuition.mode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <GraduationCap className="size-5 shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-xs text-[#64748B]">Subject</p>
                      <p className="font-medium text-[#0F172A]">
                        {tuition.subject}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#0F172A]">
                  Tuition Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-sm leading-7 text-[#64748B]">
                  {tuition.description || "No description provided."}
                </p>
              </CardContent>
            </Card>

            {/* Tutor Profile Summary */}
            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#0F172A]">
                  About the Tutor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <GraduationCap className="size-7 text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#0F172A]">
                    {tuition.tutorName || "Tutor"}
                  </p>
                  <p className="break-all text-sm text-[#64748B]">
                    {tuition.tutorEmail}
                  </p>
                  <Badge className="mt-2 border-blue-100 bg-blue-50 text-[#2563EB] hover:bg-blue-50">
                    Tuition Provider
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fee and Application */}
          <aside className="space-y-6">
            <Card className="h-fit border-blue-100 shadow-sm">
              <CardContent className="space-y-3 p-6">
                <p className="text-sm text-[#64748B]">Monthly Tuition Fee</p>
                <p className="text-3xl font-extrabold text-[#2563EB]">
                  ৳{tuition.monthlyFee.toLocaleString("en-BD")}
                </p>
                <Separator className="bg-blue-100" />
                <p className="text-sm text-[#64748B]">
                  {tuition.daysPerWeek} days per week · {tuition.mode}
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#0F172A]">
                  Apply for This Tuition
                </CardTitle>
              </CardHeader>

              <CardContent>
                {!session ? (
                  <div className="space-y-3">
                    <p className="text-sm leading-6 text-[#64748B]">
                      Please sign in with a student account to apply for this
                      tuition.
                    </p>
                    <Button
                      className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
                      onClick={() => router.push("/login")}
                    >
                      Sign In
                    </Button>
                  </div>
                ) : role !== "student" ? (
                  <p className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                    Only users with a student account can apply for tuitions.
                  </p>
                ) : (
                  <form onSubmit={handleApplication} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentPhone">Phone Number *</Label>
                      <Input
                        id="studentPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={studentPhone}
                        onChange={(event) =>
                          setStudentPhone(event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredSchedule">
                        Preferred Schedule *
                      </Label>
                      <Input
                        id="preferredSchedule"
                        placeholder="e.g. Evening, 5 PM - 7 PM"
                        value={preferredSchedule}
                        onChange={(event) =>
                          setPreferredSchedule(event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentNote">Learning Note</Label>
                      <Textarea
                        id="studentNote"
                        placeholder="Tell the tutor about your learning needs..."
                        value={studentNote}
                        onChange={(event) => setStudentNote(event.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>

                    <p className="text-xs leading-5 text-[#64748B]">
                      Your application will be submitted with pending status.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
