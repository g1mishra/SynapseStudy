"use client";

import { getCurrentUser } from "@/lib/auth.service";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export function useAuth() {
  const router = useRouter();

  const { data: currentUser, error } = useSWR("/api/auth", getCurrentUser, {
    onError: (error) => {
      console.error("Failed to fetch current user:", error);
      router.push("/login");
    },
    revalidateOnFocus: false, // Disable revalidation on focus to prevent unnecessary fetches
    shouldRetryOnError: false, // Disable retrying on error to prevent infinite loop
  });

  const loading = !currentUser && !error;

  return { currentUser, loading, error };
}
