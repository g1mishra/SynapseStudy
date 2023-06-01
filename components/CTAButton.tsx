"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CTAButton() {
  const router = useRouter();
  const { loading, currentUser } = useAuth({ redirectTo: false });

  const handleCTA = () => {
    if (currentUser && !loading) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <>
      <button className="btn" onClick={handleCTA}>
        Get Started
      </button>
    </>
  );
}
