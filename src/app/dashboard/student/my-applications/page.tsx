"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  deleteStudentApplication,
  getStudentApplications,
  type StudentApplication,
} from "@/lib/actions/student";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyApplicationsPage() {
  const { data: session, isPending } = authClient.useSession();
  const studentEmail = session?.user?.email;

  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !studentEmail) return;

    let cancelled = false;

    const loadApplications = async () => {
      try {
        const data = await getStudentApplications(studentEmail);

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
  }, [isPending, studentEmail]);

  const handleDelete = async (id: string) => {
    if (!studentEmail) return;

    try {
      setDeletingId(id);

      await deleteStudentApplication(id, studentEmail);

      setApplications((previous) =>
        previous.filter((application) => application._id !== id),
      );

      toast.success("Application cancelled successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to cancel application.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: StudentApplication["status"]) => {
    const variants = {
      pending: "secondary",
      accepted: "default",
      rejected: "destructive",
    } as const;

    const labels = {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (!studentEmail) {
    return (
      <p className="text-sm text-destructive">
        Unable to identify your student account.
      </p>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your tuition applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Applications ({applications.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {applications.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="font-semibold">No applications found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven&apos;t applied for any tuition yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Tutor Email</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{application.tuitionTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            {application.subject}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>{application.tutorEmail}</TableCell>

                      <TableCell>
                        ৳{application.monthlyFee.toLocaleString("en-BD")}
                      </TableCell>

                      <TableCell>
                        {application.appliedAt
                          ? format(
                              new Date(application.appliedAt),
                              "dd MMM yyyy",
                            )
                          : "—"}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>

                      <TableCell className="text-right">
                        {application.status === "pending" && (
                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={deletingId === application._id}
                                />
                              }
                            >
                              {deletingId === application._id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="mr-2 h-4 w-4" />
                              )}
                              Cancel
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Cancel application?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel your
                                  application for &quot;
                                  {application.tuitionTitle}&quot;?
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Keep Application
                                </AlertDialogCancel>

                                <AlertDialogAction
                                  onClick={() => handleDelete(application._id)}
                                >
                                  Yes, Cancel
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
