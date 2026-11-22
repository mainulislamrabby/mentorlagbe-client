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

// Reusable JWT authorization headers
const getAuthHeaders = async () => {
  const token = await getAuthToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Get all users
export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch users.");
  }

  return response.json();
};

// Get admin statistics
export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await fetch(`${BASE_URL}/admin/stats`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch admin statistics.");
  }

  return response.json();
};

// Get all tuition posts
export const getAllTuitions = async (): Promise<AdminTuition[]> => {
  const response = await fetch(`${BASE_URL}/admin/tuitions`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch tuition posts.");
  }

  return response.json();
};

// Update tuition approval status
export const updateTuitionApproval = async (
  id: string,
  approvalStatus: "approved" | "rejected",
) => {
  const response = await fetch(`${BASE_URL}/admin/tuitions/${id}/status`, {
    method: "PATCH",
    headers: {
      ...(await getAuthHeaders()),
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

// Get admin transactions
export const getAdminTransactions = async (): Promise<AdminTransaction[]> => {
  const response = await fetch(`${BASE_URL}/admin/transactions`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch transactions.");
  }

  return response.json();
};
