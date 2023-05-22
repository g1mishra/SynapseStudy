"use client";

import { useAuth } from "@/hooks/useAuth";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Login() {
  const router = useRouter();
  const user = useAuth();

  if (user) {
    router.push("/dashboard");
  }

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
