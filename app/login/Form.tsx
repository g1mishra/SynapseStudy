"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 200) {
      window.location.href = "/dashboard";
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="card relative flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      {error && (
        <div className="alert alert-error mt-4 absolute -translate-y-full -top-8 max-w-md">
          <div className="flex-1">
            <label>{error}</label>
          </div>
        </div>
      )}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="form-control mt-6">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
