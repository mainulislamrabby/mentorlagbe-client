"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteStudentApplication,
  getStudentApplications,
  submitTuitionReview,
  type StudentApplication,
} from "@/lib/actions/student";
import { Textarea } from "@/components/ui/textarea";

import { authClient } from "@/lib/auth-client";

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
  const [reviewingApplicationId, setReviewingApplicationId] = useState<
    string | null
  >(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewedTuitionIds, setReviewedTuitionIds] = useState<string[]>([]);

  useEffect(() => {
    if (isPending || !studentEmail) return;

    let cancelled = false;

    const loadApplications = async () => {
      try {
        const data = await getStudentApplications();

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

      await deleteStudentApplication(id);

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

  const handleSubmitReview = async (tuitionId: string) => {
    try {
      setSubmittingReview(true);

      await submitTuitionReview(tuitionId, {
        rating,
        feedback,
      });

      setReviewedTuitionIds((previous) => [...previous, tuitionId]);
      setReviewingApplicationId(null);
      setRating(5);
      setFeedback("");

      toast.success("Review submitted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review.",
      );
    } finally {
      setSubmittingReview(false);
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

                        {application.status === "accepted" &&
                          !reviewedTuitionIds.includes(
                            application.tuitionId,
                          ) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setReviewingApplicationId(application._id);
                                setRating(5);
                                setFeedback("");
                              }}
                            >
                              Write Review
                            </Button>
                          )}

                        {application.status === "accepted" &&
                          reviewedTuitionIds.includes(
                            application.tuitionId,
                          ) && <Badge variant="secondary">Reviewed</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {applications.map(
                (application) =>
                  reviewingApplicationId === application._id && (
                    <Card key={application._id} className="mt-4">
                      <CardHeader>
                        <CardTitle>
                          Review: {application.tuitionTitle}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div>
                          <p className="mb-2 text-sm font-medium">
                            Your Rating
                          </p>

                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <Button
                                key={value}
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => setRating(value)}
                                aria-label={`Rate ${value} stars`}
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    value <= rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Your Feedback
                          </label>
                          <Textarea
                            placeholder="Share your experience..."
                            value={feedback}
                            onChange={(event) =>
                              setFeedback(event.target.value)
                            }
                            maxLength={1000}
                            rows={4}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              handleSubmitReview(application.tuitionId)
                            }
                            disabled={submittingReview || !feedback.trim()}
                          >
                            {submittingReview && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Submit Review
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => setReviewingApplicationId(null)}
                            disabled={submittingReview}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
