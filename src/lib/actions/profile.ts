import { getAuthToken } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserProfile {
  name: string;
  email: string;
  image?: string;
  phone?: string;
  bio?: string;
  role: "student" | "tutor" | "admin";
  plan: "free" | "pro";
}

export interface UpdateProfileData {
  name: string;
  phone: string;
  bio: string;
  image: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const token = await getAuthToken();

  const response = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch profile.");
  }

  return result;
};

export const updateProfile = async (
  data: UpdateProfileData,
) => {
  const token = await getAuthToken();

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile.");
  }

  return result;
};