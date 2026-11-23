import { getAuthToken } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface StudentStats {
  totalApplications: number;
  acceptedApplications: number;
  pendingApplications: number;
  currentPlan: "free" | "pro";
}

export interface StudentApplication {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
}

export interface SubmitApplicationData {
  tuitionId: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote?: string;
}

const getAuthHeaders = async () => {
  const token = await getAuthToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Get student statistics
export const getStudentStats = async (): Promise<StudentStats> => {
  const response = await fetch(`${BASE_URL}/student/stats`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to fetch student statistics.");
  }

  return response.json();
};

// Get student applications
export const getStudentApplications = async (): Promise<
  StudentApplication[]
> => {
  const response = await fetch(`${BASE_URL}/student/applications`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to fetch student applications.");
  }

  return response.json();
};

// Cancel student application
export const deleteStudentApplication = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/student/applications/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to cancel application.");
  }
};

// Submit student application
export const submitStudentApplication = async (
  data: SubmitApplicationData,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      ...(await getAuthHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit application.");
  }
};

export interface SubmitReviewData {
  rating: number;
  feedback: string;
}

// Submit review for an accepted tuition
export const submitTuitionReview = async (
  tuitionId: string,
  data: SubmitReviewData,
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tuitions/${tuitionId}/reviews`, {
    method: "POST",
    headers: {
      ...(await getAuthHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit review.");
  }
};
