"use client";
import {
  CalendarIcon,
  ChatIcon,
  DashboardIcon,
  SettingsIcon,
  StudyRoomsIcon,
  WhiteboardIcon,
} from "@/components/Icons";
import { useAuth } from "@/hooks/useAuth";
import Header from "./Header";
import MenuBar from "./MenuBar";
import { cn } from "@/utils/utils";
import { useState } from "react";

const routes = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "study-rooms",
    href: "/study-rooms",
    icon: <StudyRoomsIcon />,
  },
  {
    name: "chat",
    icon: <ChatIcon />,
  },
  {
    name: "calendar",
    icon: <CalendarIcon />,
  },
  {
    name: "whiteboard",
    href: "/whiteboard",
    icon: <WhiteboardIcon />,
  },
  {
    name: "settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useAuth();

  return (
    <main className="flex h-screen max-h-screen overflow-hidden">
      <MenuBar logout={logout} className={cn("hidden md:flex")} />
      <div className="w-full bg-black-primary overflow-y-auto [&>div]:pt-0 md:[&>div]:pt-8">
        <Header className="flex md:hidden my-6 px-8 pb-4 max-w-full" currentUser={currentUser} />
        {children}
      </div>
    </main>
  );
}
