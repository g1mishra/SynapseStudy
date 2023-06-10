"use client";
import ActiveLink from "@/components/ActiveLink";
import {
  CalendarIcon,
  ChatIcon,
  DashboardIcon,
  LogoutIcon,
  SettingsIcon,
  StudyRoomsIcon,
  WhiteboardIcon,
} from "@/components/Icons";
import { cn } from "@/utils/utils";

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
  return (
    <main className="flex h-screen max-h-screen overflow-hidden">
      <div className="w-20 shrink-0 bg-black-secondary flex flex-col justify-between py-4 sticky">
        <div className="flex flex-col items-center gap-y-10">
          <div className="h-20"></div>
          {routes.map((route) => (
            <ActiveLink
              href={route.href || `#${route.name}`}
              key={route.name}
              className="cursor-pointer"
            >
              {(isActive) => (
                <div
                  className={cn({
                    "text-white": isActive,
                    "text-gray-primary": !isActive,
                  })}
                >
                  {route.icon}
                </div>
              )}
            </ActiveLink>
          ))}
        </div>
        <div className="flex items-center justify-center mb-4">
          <LogoutIcon />
        </div>
      </div>
      <div className="w-full bg-black-primary overflow-y-auto">{children}</div>
    </main>
  );
}
