"use client";

import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch current user data on component mount
    getCurrentUser()
      .then((userData: any) => {
        // Store the current user data in state
        setCurrentUser(userData);
      })
      .catch((error: any) => {
        console.error("Failed to fetch current user:", error);
        // Redirect to login or handle authentication error
        router.push("/login");
      });
  }, []);

  return currentUser;
}
