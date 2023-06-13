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
import dynamic from "next/dynamic";
import { useParams, usePathname } from "next/navigation";
// import StudyRoomSidebar from "./study-rooms/StudyRoomSidebar";

const StudyRoomSidebar = dynamic(
  () => import("./study-rooms/StudyRoomSidebar")
);

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const shouldShowStudyRoomSidebar =
    pathname.includes("/study-rooms") && openMenu;

  return (
    <main className="flex h-screen max-h-screen overflow-hidden">
      <MenuBar
        logout={logout}
        className={cn("md:block", openMenu ? "block" : "hidden")}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
      {shouldShowStudyRoomSidebar ? (
        <StudyRoomSidebar className="md:block bg-black-tertiary min-w-max flex-1 w-full max-w-full" />
      ) : null}

      <div
        className={cn(
          "w-full bg-black-primary overflow-y-auto [&>div]:pt-0 md:[&>div]:pt-8",
          {
            "w-[50px]": shouldShowStudyRoomSidebar,
          }
        )}
        onClick={() => {
          shouldShowStudyRoomSidebar && setOpenMenu(false);
        }}
      >
        <Header
          className="flex md:hidden my-6 px-8 pb-4 max-w-full"
          currentUser={currentUser}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />

        {children}
      </div>
    </main>
  );
}
