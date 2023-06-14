import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import React from "react";
// import LayoutHelper from "./LayoutHelper";

const LayoutHelper = dynamic(() => import("./LayoutHelper"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen max-h-screen overflow-hidden">
      <LayoutHelper>{children}</LayoutHelper>
    </main>
  );
}
