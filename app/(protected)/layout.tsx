"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LayoutHelper = dynamic(() => import("./LayoutHelper"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/auth");
    }
  }, [loading, currentUser, router]);

  if (loading) return <Loading />;

  return (
    <>
      {!loading && currentUser ? (
        <main className="flex h-screen max-h-screen overflow-hidden">
          <LayoutHelper>{children}</LayoutHelper>
        </main>
      ) : null}
    </>
  );
}
