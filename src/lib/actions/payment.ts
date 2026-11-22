import { getAuthToken } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCheckoutSession = async () => {
  const token = await getAuthToken();

  const response = await fetch(`${BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create checkout session.");
  }

  return result.url as string;
};
