const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "student" | "tutor" | "admin";
  createdAt: string;
}

export const getAllUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return response.json();
};
