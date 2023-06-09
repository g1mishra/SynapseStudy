"use client";

import { useAuth } from "@/hooks/useAuth";
import { registerUser } from "@/lib/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserInputI {
  email: string;
  password: string;
  name: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [variant, setVariant] = useState("login");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => {
    e.preventDefault();
    try {
      const res = await registerUser(user.email, user.password, user.name);
      if (res?.error) {
        setError(res.error);
      } else {
        handleLoginSubmit(e, user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card relative flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        {variant === "login" ? (
          <Form handleSubmit={handleLoginSubmit} variant={variant} />
        ) : (
          <Form handleSubmit={handleRegisterSubmit} variant={variant} />
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
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, user: UserInputI) => void;
  variant?: string;
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
        <input
          type="submit"
          value={variant === "login" ? "Login" : "Register"}
          className="btn btn-primary"
        />
      </div>{" "}
    </form>
  );
};
