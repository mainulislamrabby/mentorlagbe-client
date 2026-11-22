import { getAuthToken } from "../auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "student" | "tutor" | "admin";
  createdAt: string;
}
export interface AdminStats {
  totalUsers: number;
  totalTutors: number;
  pendingTuitions: number;
  approvedTuitions: number;
  revenueByCurrency: {
    _id: string;
    total: number;
  }[];
}

export interface AdminTuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
}

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return response.json();
};

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await fetch(`${BASE_URL}/admin/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin statistics.");
  }

  return response.json();
};

export const getAllTuitions = async (): Promise<AdminTuition[]> => {
  const response = await fetch(`${BASE_URL}/admin/tuitions`);

  if (!response.ok) {
    throw new Error("Failed to fetch tuition posts.");
  }

  return response.json();
};

export const updateTuitionApproval = async (
  id: string,
  approvalStatus: "approved" | "rejected",
) => {
  const response = await fetch(`${BASE_URL}/admin/tuitions/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ approvalStatus }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to update tuition status.");
  }

  return response.json();
};

export interface AdminTransaction {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: "student" | "tutor";
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: string;
}

export const getAdminTransactions = async (): Promise<AdminTransaction[]> => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  const response = await fetch(`${BASE_URL}/admin/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch transactions.");
  }

  return result;
};
