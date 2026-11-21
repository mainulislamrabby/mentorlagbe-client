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
