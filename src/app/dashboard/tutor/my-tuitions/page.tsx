"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Plus, Search, SlidersHorizontal, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  getTuition,
  deleteTuition,
  toggleTuitionStatus,
  updateTuition,
} from "@/lib/actions/tutor";

import EditTuitionDialog, {
  type TuitionFormData,
} from "@/components/dashboard/tutor/EditTuitionDialog";

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
import { toast } from "sonner";

const MyTuitionsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [selectedTuition, setSelectedTuition] = useState<Tuition | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const tutorEmail = session?.user?.email;

  // Fetch logged-in tutor's tuitions
  useEffect(() => {
    if (isPending || !tutorEmail) return;

    let cancelled = false;

    const fetchTuitions = async () => {
      try {
        const data = await getTuition();

        if (!cancelled) {
          setTuitions(data);
          setError("");
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error ? error.message : "Failed to load tuitions.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTuitions();

    return () => {
      cancelled = true;
    };
  }, [isPending, tutorEmail]);

  // Search and filter
  const filteredTuitions = useMemo(() => {
    return tuitions.filter((tuition) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        tuition.title.toLowerCase().includes(searchValue) ||
        tuition.subject.toLowerCase().includes(searchValue);

      const matchesApproval =
        approvalFilter === "all" || tuition.approvalStatus === approvalFilter;

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && tuition.isActive) ||
        (activeFilter === "closed" && !tuition.isActive);

      return matchesSearch && matchesApproval && matchesActive;
    });
  }, [tuitions, search, approvalFilter, activeFilter]);

  const hasFilters =
    search !== "" || approvalFilter !== "all" || activeFilter !== "all";

  const handleClearFilters = () => {
    setSearch("");
    setApprovalFilter("all");
    setActiveFilter("all");
  };

  const handleEdit = (id: string) => {
    const tuition = tuitions.find((item) => item._id === id);

    if (tuition) {
      setSelectedTuition(tuition);
      setIsEditOpen(true);
    }
  };

  const handleSaveEdit = async (data: TuitionFormData) => {
    if (!tutorEmail || !selectedTuition) {
      throw new Error("Unable to identify the tuition owner.");
    }

    await updateTuition(selectedTuition._id, data);

    setTuitions((previous) =>
      previous.map((tuition) =>
        tuition._id === selectedTuition._id ? { ...tuition, ...data } : tuition,
      ),
    );
  };

  const handleDelete = async (id: string) => {
    if (!tutorEmail) {
      toast.error("Unable to identify your account.");
      return;
    }

    try {
      await deleteTuition(id);

      setTuitions((previous) =>
        previous.filter((tuition) => tuition._id !== id),
      );

      toast.success("Tuition deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete tuition.",
      );
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    if (!tutorEmail) return;

    try {
      setError("");

      await toggleTuitionStatus(id, isActive);

      setTuitions((previous) =>
        previous.map((tuition) =>
          tuition._id === id ? { ...tuition, isActive } : tuition,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update tuition status.",
      );
    }
  };

  const accountError =
    !isPending && !tutorEmail
      ? "Unable to find your account. Please sign in again."
      : error;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="secondary" className="mb-3">
              Tutor Dashboard
            </Badge>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Tuitions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your tuition posts, approval status, and availability.
            </p>
          </div>

          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus size={17} />
            Post New Tuition
          </Link>
        </div>

        {/* Tuition Listings */}
        <Card className="gap-0 border border-slate-200 shadow-sm">
          <CardContent className="space-y-6 p-4 sm:p-6">
            {/* Section Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Tuition Listings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all your posted tuitions.
                </p>
              </div>

              <Badge variant="outline" className="w-fit px-3 py-1">
                {filteredTuitions.length} of {tuitions.length} listings
              </Badge>
            </div>

            {/* Search and Filters */}
            <div className="grid gap-3 md:grid-cols-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title or subject..."
                  className="h-10 pl-9"
                />
              </div>

              <Select
                value={approvalFilter}
                onValueChange={(value) => setApprovalFilter(value ?? "all")}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Approval status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All approval statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={activeFilter}
                onValueChange={(value) => setActiveFilter(value ?? "all")}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All availability</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Information */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <SlidersHorizontal size={15} className="text-slate-500" />

                <span className="text-sm text-slate-500">Filters applied</span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="h-7 gap-1 text-blue-600 hover:text-blue-700"
                >
                  <X size={14} />
                  Clear filters
                </Button>
              </div>
            )}

            {/* Tuition Table / States */}
            {isPending || (tutorEmail && loading) ? (
              <div className="py-14 text-center text-sm text-slate-500">
                Loading your tuitions...
              </div>
            ) : accountError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-10 text-center">
                <p className="text-sm text-red-600">{accountError}</p>
              </div>
            ) : filteredTuitions.length > 0 ? (
              <TuitionCard
                tuitions={filteredTuitions}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-14 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <BookOpen size={25} />
                </div>

                <h3 className="font-semibold text-slate-900">
                  {tuitions.length === 0
                    ? "No tuitions posted yet"
                    : "No matching tuitions found"}
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                  {tuitions.length === 0
                    ? "Create your first tuition listing to connect with students."
                    : "Try changing your search keyword or filters."}
                </p>

                {tuitions.length === 0 ? (
                  <Link
                    href="/dashboard/tutor/post-tuition"
                    className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Plus size={16} />
                    Post a Tuition
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="mt-5"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        {selectedTuition && (
          <EditTuitionDialog
            key={selectedTuition._id}
            tuition={selectedTuition}
            open={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open);

              if (!open) {
                setSelectedTuition(null);
              }
            }}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </main>
  );
};

export default MyTuitionsPage;
