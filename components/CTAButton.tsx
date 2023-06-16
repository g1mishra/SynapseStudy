"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CTAButton() {
  const router = useRouter();
  const { loading, currentUser } = useAuth(false);

  const handleCTA = () => {
    if (currentUser && !loading) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <>
      <button className="btn bg-[#F9762E] mt-5 border-none w-32 whitespace-nowrap" onClick={handleCTA}>
        Get Started
      </button>
    </>
  );
}
