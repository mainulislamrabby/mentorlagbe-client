const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface StudentStats {
  totalApplications: number;
  acceptedApplications: number;
  pendingApplications: number;
  currentPlan: "free" | "pro";
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
