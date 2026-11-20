"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Plus } from "lucide-react";

import BannerImageUpload from "@/components/dashboard/tutor/BannerImageUpload";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { uploadBannerImage } from "@/lib/actions/tutor";

import type { TuitionData } from "@/types/dataTypes";

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
import { createTuition } from "@/lib/actions/tutor";

const PostTuitionPage = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [subject, setSubject] = useState<string | null>(null);
  const [classLevel, setClassLevel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!subject || !classLevel || !mode) {
      toast.error("Please select subject, class level and tuition mode.");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a tuition banner image.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData(form);

      // Upload banner image to ImgBB
      const bannerImage = await uploadBannerImage(selectedFile);

      // Collect tuition information
      const tuitionData: TuitionData = {
        title: formData.get("title") as string,
        subject,
        classLevel,
        mode: mode as "Online" | "Offline",
        location: formData.get("location") as string,
        monthlyFee: Number(formData.get("monthlyFee")),
        daysPerWeek: Number(formData.get("daysPerWeek")),
        description: formData.get("description") as string,
        bannerImage,
      };

      // Send tuition data to Express API
      await createTuition(tuitionData);

      toast.success("Tuition posted successfully! Waiting for admin approval.");

      form.reset();

      setSelectedFile(null);
      setSelectedFileName("");
      setSubject(null);
      setClassLevel(null);
      setMode(null);

      router.push("/dashboard/tutor/my-tuitions");
    } catch (error) {
      console.error("Tuition submission error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to post tuition.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Select handlers
  const handleSubjectChange = (value: string | null) => {
    setSubject(value);
  };

  const handleClassLevelChange = (value: string | null) => {
    setClassLevel(value);
  };

  const handleModeChange = (value: string | null) => {
    setMode(value);
  };

  // Banner image handler
  const handleBannerSelect = (file: File | null) => {
    setSelectedFile(file);
    setSelectedFileName(file?.name || "");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/tutor"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <BookOpen size={25} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Post a Tuition
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a tuition listing and connect with potential students.
              </p>
            </div>
          </div>
        </div>

        {/* Free Plan Information */}
        <Card className="mb-6 border-blue-100 bg-blue-50 shadow-none">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="mt-0.5 shrink-0 text-blue-600" size={20} />

            <div>
              <p className="text-sm font-semibold text-blue-900">
                Tuition Posting Guidelines
              </p>

              <p className="mt-1 text-sm text-blue-700">
                Free tutors can post up to 2 tuitions. Upgrade to Pro for
                unlimited tuition postings. Every new tuition requires admin
                approval before appearing publicly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tuition Form */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Tuition Information</CardTitle>

            <CardDescription>
              Fill in the details below to create your tuition listing.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tuition Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tuition Title <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Experienced Math Tutor for Class 10"
                  required
                />
              </div>

              {/* Subject and Class Level */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>
                    Subject <span className="text-red-500">*</span>
                  </Label>

                  <Select onValueChange={handleSubjectChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bangla">Bangla</SelectItem>
                      <SelectItem value="ICT">ICT</SelectItem>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="IELTS">IELTS</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    Class Level <span className="text-red-500">*</span>
                  </Label>

                  <Select onValueChange={handleClassLevelChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class level" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Class 1-5">Class 1-5</SelectItem>
                      <SelectItem value="Class 6-8">Class 6-8</SelectItem>
                      <SelectItem value="Class 9-10">Class 9-10</SelectItem>
                      <SelectItem value="Class 11-12">Class 11-12</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                      <SelectItem value="Admission">Admission</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <Label>
                  Tuition Mode <span className="text-red-500">*</span>
                </Label>

                <Select onValueChange={handleModeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tuition mode" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Mirpur, Dhaka"
                  required
                />
              </div>

              {/* Monthly Fee and Days Per Week */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monthlyFee">
                    Monthly Fee (৳) <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    id="monthlyFee"
                    name="monthlyFee"
                    type="number"
                    min="1"
                    placeholder="e.g. 5000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daysPerWeek">
                    Days Per Week <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    id="daysPerWeek"
                    name="daysPerWeek"
                    type="number"
                    min="1"
                    max="7"
                    placeholder="e.g. 5"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Tuition Description <span className="text-red-500">*</span>
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your teaching experience, teaching methods, and what students can expect..."
                  className="min-h-36 resize-y"
                  required
                />
              </div>

              {/* Banner Image */}
              <BannerImageUpload
                onFileSelect={handleBannerSelect}
                selectedFileName={selectedFileName}
              />

              {/* Approval Notice */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Admin Approval Required
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  Your tuition will be submitted with pending status. It will
                  become visible on the Browse Tuitions page after an admin
                  approves it.
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="sm:min-w-32"
                  onClick={() => router.push("/dashboard/tutor/my-tuitions")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 bg-blue-600 hover:bg-blue-700 sm:min-w-40"
                >
                  <Plus size={17} />
                  {isSubmitting ? "Posting..." : "Post Tuition"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PostTuitionPage;
