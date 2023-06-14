"use client";

import { useAuth } from "@/hooks/useAuth";
import { registerUser } from "@/lib/auth.service";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface UserInputI {
  email: string;
  password: string;
  name: string;
}

export default function LoginForm() {
  const [variant, setVariant] = useState("login");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => {
    if (!loading) setLoading(true);
    e.preventDefault();
    try {
      await login(user.email, user.password);
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes("Invalid credentials")) {
        message = "Invalid credentials";
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(user.email, user.password, user.name);
      handleLoginSubmit(e, user);
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes("Invalid email")) {
        // Invalid email: Value must be a valid email address
        message = "Email is invalid";
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card relative md:shrink-0 w-full max-w-full md:max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        {variant === "login" ? (
          <Form handleSubmit={handleLoginSubmit} variant={variant} loading={loading} />
        ) : (
          <Form handleSubmit={handleRegisterSubmit} variant={variant} loading={loading} />
        )}
        <button
          className="underline tracking-wide"
          onClick={() => {
            setVariant(variant === "login" ? "register" : "login");
          }}
        >
          {variant === "login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

const Form = ({
  handleSubmit,
  variant,
  loading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => void;
  variant?: string;
  loading?: boolean;
}) => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });

  return (
    <form onSubmit={(e) => handleSubmit(e, user)}>
      {variant === "register" && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </div>
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
      </div>
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary flex justify-center disabled:btn-primary"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin -ml-6 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}

          {variant === "login" ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};
