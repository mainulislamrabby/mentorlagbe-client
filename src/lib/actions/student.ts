const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { getAuthToken } from "@/lib/auth-client";

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

export const getStudentStats = async (
  studentEmail: string,
): Promise<StudentStats> => {
  const response = await fetch(
    `${BASE_URL}/student/stats?studentEmail=${encodeURIComponent(studentEmail)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch student statistics.");
  }

  return response.json();
};

export const getStudentApplications = async (
  studentEmail: string,
): Promise<StudentApplication[]> => {
  const response = await fetch(
    `${BASE_URL}/student/applications?studentEmail=${encodeURIComponent(studentEmail)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch student applications.");
  }

  return response.json();
};

export const deleteStudentApplication = async (
  id: string,
  studentEmail: string,
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/student/applications/${id}?studentEmail=${encodeURIComponent(studentEmail)}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error("Failed to cancel application.");
  }
};

export const submitStudentApplication = async (
  data: SubmitApplicationData,
): Promise<void> => {
  const token = await getAuthToken();

  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit application.");
  }
};
