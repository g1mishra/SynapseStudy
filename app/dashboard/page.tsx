"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { currentUser, loading, logout } = useAuth();

  if (loading) return <Loading />;
  return (
    <main className="hero min-h-[calc(100vh-80px)] bg-base-200 py-4">
      <div className="hero-content container justify-evenly flex-col">
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <div className="flex flex-col items-center">
          <h1>Name : {currentUser?.name}</h1>
          <pre>
            <code>{JSON.stringify(currentUser, null, 4)}</code>
          </pre>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
