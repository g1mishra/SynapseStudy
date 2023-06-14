"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoginForm from "./AuthForm";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (currentUser && !loading) {
      setIsRedirecting(true);
      router.push("/dashboard");
    }
  }, [currentUser, loading, router]);

  if (loading || isRedirecting) return <Loading />;
  return (
    <main className="flex justify-center min-h-[calc(100vh-80px)] bg-base-200 py-4 w-full">
      <div className="hero-content w-full justify-evenly flex-col sm:flex-row">
        <div className="text-center lg:text-left md:max-w-md">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome to our platform! Take a step towards accessing exciting features and
            personalized experiences by logging in now. We value your presence and can't wait to
            offer you a seamless journey.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
