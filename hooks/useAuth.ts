"use client";

import { getCurrentUser, loginUser, logoutUser } from "@/lib/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

interface AuthHookProps {
  redirectTo?: boolean;
}

export function useAuth(redirectTo = true) {
  const router = useRouter();

  const {
    data: currentUser,
    mutate: updateCurrentUser,
    error,
  } = useSWR("/auth", getCurrentUser, {
    onError: (error) => {
      console.error("Failed to fetch current user:", error);
      if (redirectTo) {
        console.log("Redirecting to login page");
        router.push("/auth");
      }
    },
    revalidateOnFocus: false, // Disable revalidation on focus to prevent unnecessary fetches
    shouldRetryOnError: false, // Disable retrying on error to prevent infinite loop
  });

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    const user = await getCurrentUser();
    mutate("/auth", user);
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await logoutUser();
      router.push("/auth");
      mutate("/auth", null);
    } catch (err) {
      console.log(err);
      toast.error("Failed to logout");
    }
  };

  const loading = !currentUser && !error;

  return { currentUser, loading, error, logout, login, updateCurrentUser };
}
