import React from "react";
import LayoutHelper from "./LayoutHelper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen max-h-screen overflow-hidden">
      <LayoutHelper>{children}</LayoutHelper>
    </main>
  );
}
