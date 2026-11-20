import type { TuitionData } from "@/types/dataTypes";

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

export const createTuition = async (data: TuitionData) => {
  const res = await fetch(`${BASE_URL}/tuitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create tuition");
  }

  return result;
};
