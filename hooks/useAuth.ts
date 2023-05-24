"use client";

// import { getCurrentUser } from "@/lib/auth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function useAuth() {
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch current user data on component mount
//     getCurrentUser()
//       .then((userData: any) => {
//         // Store the current user data in state
//         setCurrentUser(userData);
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         console.error("Failed to fetch current user:", error);
//         // Set error state and redirect to login or handle authentication error
//         setLoading(false);
//         router.push("/login");
//       });
//   }, []);

//   return { currentUser, loading };
// }

import { getCurrentUser } from "@/lib/auth";
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
