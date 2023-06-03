"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoginForm from "./AuthForm";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (currentUser && !loading) {
      router.push("/dashboard");
    }
  }, [currentUser, loading, router]);

  if (loading) return <Loading />;
  return (
    <main className="hero min-h-[calc(100vh-80px)] bg-base-200 py-4">
      <div className="hero-content container justify-evenly flex-col sm:flex-row">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
