import type { TuitionData } from "@/types/dataTypes";
import type { TuitionFormData } from "@/components/dashboard/tutor/EditTuitionDialog";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export const uploadBannerImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.data.url;
};

export const createTuition = async (
  data: TuitionData,
  tutor: { tutorEmail: string; tutorName: string },
) => {
  const res = await fetch(`${BASE_URL}/tuitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      ...tutor,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create tuition");
  }

  return result;
};

export const getTuition = async (tutorEmail: string) => {
  const params = new URLSearchParams({ tutorEmail });

  const res = await fetch(`${BASE_URL}/tuitions?${params}`);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch tuitions.");
  }

  return result;
};

export const updateTuition = async (
  id: string,
  tutorEmail: string,
  data: TuitionFormData,
) => {
  const res = await fetch(`${BASE_URL}/tuitions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, tutorEmail }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update tuition.");
  }

  return result;
};

export const deleteTuition = async (id: string, tutorEmail: string) => {
  const params = new URLSearchParams({ tutorEmail });

  const res = await fetch(`${BASE_URL}/tuitions/${id}?${params}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete tuition.");
  }

  return result;
};

export const toggleTuitionStatus = async (
  id: string,
  tutorEmail: string,
  isActive: boolean,
) => {
  const res = await fetch(`${BASE_URL}/tuitions/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tutorEmail, isActive }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update tuition status.");
  }

  return result;
};
