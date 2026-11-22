
import type { Tuition, TuitionData } from "@/types/dataTypes";
import type { TuitionFormData } from "@/components/dashboard/tutor/EditTuitionDialog";
import { getAuthToken } from "../auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export interface TutorApplication {
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

const getAuthHeaders = async (json = false) => {
  const token = await getAuthToken();

  return {
    Authorization: `Bearer ${token}`,
    ...(json && { "Content-Type": "application/json" }),
  };
};

// Upload tuition banner image to ImgBB
export const uploadBannerImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "Image upload failed.");
  }

  return result.data.url;
};

// Create tuition
export const createTuition = async (data: TuitionData) => {
  const response = await fetch(`${BASE_URL}/tuitions`, {
    method: "POST",
    headers: await getAuthHeaders(true),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create tuition.");
  }

  return result;
};

// Get logged-in tutor's own tuitions
export const getTuition = async () => {
  const response = await fetch(`${BASE_URL}/tuitions?mine=true`, {
    headers: await getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch your tuitions.");
  }

  return result;
};

// Update tuition
export const updateTuition = async (
  id: string,
  data: TuitionFormData,
) => {
  const response = await fetch(`${BASE_URL}/tuitions/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(true),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update tuition.");
  }

  return result;
};

// Delete tuition
export const deleteTuition = async (id: string) => {
  const response = await fetch(`${BASE_URL}/tuitions/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete tuition.");
  }

  return result;
};

// Activate or deactivate tuition
export const toggleTuitionStatus = async (
  id: string,
  isActive: boolean,
) => {
  const response = await fetch(`${BASE_URL}/tuitions/${id}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders(true),
    body: JSON.stringify({ isActive }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update tuition status.");
  }

  return result;
};

// Browse approved tuitions (public)
export const getBrowseTuitions = async (filters?: {
  search?: string;
  subject?: string;
  classLevel?: string;
  mode?: string;
}): Promise<Tuition[]> => {
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.subject) params.set("subject", filters.subject);
  if (filters?.classLevel) params.set("classLevel", filters.classLevel);
  if (filters?.mode) params.set("mode", filters.mode);

  const response = await fetch(`${BASE_URL}/tuitions?${params.toString()}`);

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to fetch tuitions.");
  }

  return response.json();
};

// Get tuition details (public)
export const getTuitionDetails = async (id: string): Promise<Tuition> => {
  const response = await fetch(`${BASE_URL}/tuitions/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch tuition details.");
  }

  return result;
};

// Get applications for logged-in tutor
export const getTutorApplications = async (): Promise<TutorApplication[]> => {
  const response = await fetch(`${BASE_URL}/tutor/applications`, {
    headers: await getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch applications.");
  }

  return result;
};

// Accept or reject an application
export const updateTutorApplicationStatus = async (
  id: string,
  status: "accepted" | "rejected",
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tutor/applications/${id}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders(true),
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update application status.");
  }
};


export interface TutorStats {
  totalTuitions: number;
  activeApprovedTuitions: number;
  totalApplicants: number;
  currentPlan: "free" | "pro";
}

export const getTutorStats = async (): Promise<TutorStats> => {
  const response = await fetch(`${BASE_URL}/tutor/stats`, {
    headers: await getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch tutor statistics.");
  }

  return result;
};
