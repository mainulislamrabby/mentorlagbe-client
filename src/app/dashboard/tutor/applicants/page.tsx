"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  Phone,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  getTutorApplications,
  updateTutorApplicationStatus,
  type TutorApplication,
} from "@/lib/actions/tutor";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicantsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !session?.user?.email) return;

    let cancelled = false;

    const loadApplications = async () => {
      try {
        const data = await getTutorApplications();

        if (!cancelled) {
          setApplications(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load applications.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadApplications();

    return () => {
      cancelled = true;
    };
  }, [isPending, session?.user?.email]);

  const handleStatusUpdate = async (
    id: string,
    status: "accepted" | "rejected",
  ) => {
    try {
      setUpdatingId(id);

      await updateTutorApplicationStatus(id, status);

      setApplications((previous) =>
        previous.map((application) =>
          application._id === id
            ? {
                ...application,
                status,
              }
            : application,
        ),
      );

      toast.success(
        status === "accepted"
          ? "Application accepted successfully."
          : "Application rejected successfully.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update application.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: TutorApplication["status"]) => {
    if (status === "accepted") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="mr-1 size-3.5" />
          Accepted
        </Badge>
      );
    }

    if (status === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="mr-1 size-3.5" />
          Rejected
        </Badge>
      );
    }

    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
        <Clock className="mr-1 size-3.5" />
        Pending
      </Badge>
    );
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          Unable to identify your tutor account.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Tutor Dashboard
          </Badge>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Manage Applicants
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review students who applied to your tuition posts and manage their
            application status.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Total Applicants</p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {applications.length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Pending</p>

              <p className="mt-2 text-3xl font-bold text-amber-600">
                {
                  applications.filter(
                    (application) => application.status === "pending",
                  ).length
                }
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">Accepted</p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {
                  applications.filter(
                    (application) => application.status === "accepted",
                  ).length
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Applicants */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Student Applications ({applications.length})</CardTitle>
          </CardHeader>

          <CardContent>
            {applications.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-blue-50">
                  <Clock className="size-7 text-blue-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  No applications yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Students who apply to your tuition posts will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {applications.map((application) => (
                  <div
                    key={application._id}
                    className="rounded-xl border bg-white p-5 transition-shadow hover:shadow-sm"
                  >
                    {/* Top */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-semibold text-slate-900">
                            {application.studentName}
                          </h2>

                          {getStatusBadge(application.status)}
                        </div>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {application.tuitionTitle}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {application.subject}
                        </p>
                      </div>

                      <div className="text-xs text-slate-500">
                        Applied{" "}
                        {application.appliedAt
                          ? format(
                              new Date(application.appliedAt),
                              "dd MMM yyyy",
                            )
                          : "—"}
                      </div>
                    </div>

                    {/* Student Information */}
                    <div className="mt-5 grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Email
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                          <Mail className="size-4 text-slate-400" />
                          <span className="break-all">
                            {application.studentEmail}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Phone
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
                          <Phone className="size-4 text-slate-400" />
                          {application.studentPhone}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Preferred Schedule
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {application.preferredSchedule}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Monthly Fee
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ৳{application.monthlyFee.toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>

                    {/* Student Note */}
                    {application.studentNote && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-slate-500">
                          Student Note
                        </p>

                        <p className="mt-1 rounded-lg border bg-white p-3 text-sm leading-6 text-slate-600">
                          {application.studentNote}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    {application.status === "pending" && (
                      <div className="mt-5 flex flex-wrap gap-3 border-t pt-5">
                        <Button
                          onClick={() =>
                            handleStatusUpdate(application._id, "accepted")
                          }
                          disabled={updatingId === application._id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="mr-2 size-4" />
                          )}
                          Accept Application
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleStatusUpdate(application._id, "rejected")
                          }
                          disabled={updatingId === application._id}
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                          ) : (
                            <XCircle className="mr-2 size-4" />
                          )}
                          Reject Application
                        </Button>
                      </div>
                    )}
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

export default ApplicantsPage;
