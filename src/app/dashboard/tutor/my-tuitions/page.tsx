"use client";

import Link from "next/link";
import { BookOpen, Plus, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import TuitionCard, {
  type Tuition,
} from "@/components/dashboard/tutor/TuitionCard";

// Temporary demo data. Replace this with data from your API.
// const tuitions: Tuition[] = [
//   {
//     _id: "1",
//     title: "Experienced Mathematics Tutor for Class 10",
//     subject: "Mathematics",
//     classLevel: "Class 9-10",
//     mode: "Offline",
//     location: "Mirpur, Dhaka",
//     monthlyFee: 5000,
//     daysPerWeek: 5,
//     approvalStatus: "approved",
//     isActive: true,
//     createdAt: "2026-11-15",
//   },
//   {
//     _id: "2",
//     title: "Physics and Chemistry Tutor Needed",
//     subject: "Physics",
//     classLevel: "Class 11-12",
//     mode: "Online",
//     location: "Online",
//     monthlyFee: 6000,
//     daysPerWeek: 4,
//     approvalStatus: "pending",
//     isActive: true,
//     createdAt: "2026-11-17",
//   },
//   {
//     _id: "3",
//     title: "English Tutor for Class 8 Student",
//     subject: "English",
//     classLevel: "Class 6-8",
//     mode: "Offline",
//     location: "Uttara, Dhaka",
//     monthlyFee: 3500,
//     daysPerWeek: 3,
//     approvalStatus: "rejected",
//     isActive: false,
//     createdAt: "2026-11-18",
//   },
// ];

const MyTuitionsPage = () => {
  // Search handler
  const handleSearch = (_value: string) => {
    // TODO: Implement tuition search.
  };

  // Approval status filter handler
  const handleApprovalFilter = (_value: string | null) => {
    // TODO: Filter by approval status.
  };

  // Active status filter handler
  const handleActiveFilter = (_value: string | null) => {
    // TODO: Filter by active/closed status.
  };

  // Edit handler
  const handleEdit = (_id: string) => {
    // TODO: Navigate to the edit page or open an edit form.
  };

  // Delete handler
  const handleDelete = (_id: string) => {
    // TODO: Confirm deletion and call your DELETE API.
  };

  // Toggle active status handler
  const handleToggleStatus = (_id: string, _isActive: boolean) => {
    // TODO: Call your API to toggle isActive.
  };

  const totalTuitions = tuitions.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Tuitions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your tuition posts, approval status, and availability.
            </p>
          </div>

          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus size={17} />
            Post New Tuition
          </Link>
        </div>

        {/* Tuition List */}
        <Card className="gap-0 border-0 shadow-sm">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Tuition Listings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all your posted tuitions.
                </p>
              </div>

              <Badge variant="secondary">{totalTuitions} Listings</Badge>
            </div>

            {/* Search and Filters */}
            <div className="grid gap-3 md:grid-cols-3">
              <div className="relative md:col-span-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  placeholder="Search by tuition title..."
                  className="h-10 pl-9"
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </div>

              <Select onValueChange={handleApprovalFilter}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="All approval statuses" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={handleActiveFilter}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="All availability" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All availability</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tuition Cards */}
            <div className="space-y-4">
              {tuitions.length > 0 ? (
                tuitions.map((tuition) => (
                  <TuitionCard
                    key={tuition._id}
                    tuition={tuition}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-dashed bg-slate-50 px-5 py-12 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <BookOpen size={23} />
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    No tuitions posted yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Create your first tuition listing to connect with students.
                  </p>

                  <Link
                    href="/dashboard/tutor/post-tuition"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Plus size={16} />
                    Post a Tuition
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MyTuitionsPage;
