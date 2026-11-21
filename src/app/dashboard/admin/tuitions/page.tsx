"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

import {
  getAllTuitions,
  updateTuitionApproval,
  type AdminTuition,
} from "@/lib/actions/admin";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AdminTuitionsPage = () => {
  const [tuitions, setTuitions] = useState<AdminTuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const data = await getAllTuitions();
        setTuitions(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load tuition posts.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  const filteredTuitions = useMemo(() => {
    return tuitions.filter((tuition) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        tuition.title.toLowerCase().includes(searchTerm) ||
        tuition.subject.toLowerCase().includes(searchTerm) ||
        tuition.tutorName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || tuition.approvalStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tuitions, search, statusFilter]);

  const handleApproval = async (
    id: string,
    approvalStatus: "approved" | "rejected",
  ) => {
    setUpdatingId(id);

    try {
      await updateTuitionApproval(id, approvalStatus);

      setTuitions((previous) =>
        previous.map((tuition) =>
          tuition._id === id ? { ...tuition, approvalStatus } : tuition,
        ),
      );

      toast.success(
        approvalStatus === "approved"
          ? "Tuition approved successfully."
          : "Tuition rejected successfully.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update tuition status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = tuitions.filter(
    (tuition) => tuition.approvalStatus === "pending",
  ).length;

  const approvedCount = tuitions.filter(
    (tuition) => tuition.approvalStatus === "approved",
  ).length;

  const rejectedCount = tuitions.filter(
    (tuition) => tuition.approvalStatus === "rejected",
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <Badge variant="secondary" className="mb-3">
            Admin Dashboard
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Tuition Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review tutor submissions and manage tuition approvals.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Tuitions",
              value: tuitions.length,
              icon: ClipboardList,
              color: "text-blue-600 bg-blue-100",
            },
            {
              title: "Pending",
              value: pendingCount,
              icon: Clock,
              color: "text-amber-600 bg-amber-100",
            },
            {
              title: "Approved",
              value: approvedCount,
              icon: CheckCircle2,
              color: "text-green-600 bg-green-100",
            },
            {
              title: "Rejected",
              value: rejectedCount,
              icon: XCircle,
              color: "text-red-600 bg-red-100",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title}>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="mt-2 text-2xl font-bold">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tuition, subject, or tutor..."
                  className="pl-9"
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value ?? "all")}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tuition List */}
            {loading ? (
              <p className="py-12 text-center text-muted-foreground">
                Loading tuition posts...
              </p>
            ) : error ? (
              <p className="py-12 text-center text-destructive">{error}</p>
            ) : filteredTuitions.length === 0 ? (
              <div className="py-12 text-center">
                <ClipboardList className="mx-auto mb-3 size-10 text-slate-300" />
                <p className="font-medium text-slate-700">
                  No tuition posts found.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or status filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTuitions.map((tuition) => (
                  <div
                    key={tuition._id}
                    className="rounded-xl border bg-white p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {tuition.title}
                          </h3>

                          <Badge
                            className={statusStyles[tuition.approvalStatus]}
                            variant="secondary"
                          >
                            {tuition.approvalStatus}
                          </Badge>
                        </div>

                        <p className="text-sm text-slate-500">
                          Submitted by {tuition.tutorName} ({tuition.tutorEmail}
                          )
                        </p>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <BookOpen size={15} />
                            {tuition.subject} · {tuition.classLevel}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <MapPin size={15} />
                            {tuition.mode} · {tuition.location}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            {tuition.daysPerWeek} days/week
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-800">
                          ৳{tuition.monthlyFee.toLocaleString("en-BD")} / month
                        </p>

                        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                          {tuition.description}
                        </p>

                        <p className="text-xs text-slate-400">
                          Posted on{" "}
                          {new Date(tuition.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        {tuition.approvalStatus !== "approved" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleApproval(tuition._id, "approved")
                            }
                            disabled={updatingId === tuition._id}
                          >
                            <CheckCircle2 className="mr-1 size-4" />
                            Approve
                          </Button>
                        )}

                        {tuition.approvalStatus !== "rejected" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleApproval(tuition._id, "rejected")
                            }
                            disabled={updatingId === tuition._id}
                          >
                            <XCircle className="mr-1 size-4" />
                            Reject
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminTuitionsPage;
