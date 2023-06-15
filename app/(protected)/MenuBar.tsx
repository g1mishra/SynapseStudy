"use client";
import ActiveLink from "@/components/ActiveLink";
import {
  CalendarIcon,
  ChatIcon,
  DashboardIcon,
  Logo,
  LogoutIcon,
  SettingsIcon,
  StudyRoomsIcon,
  WhiteboardIcon,
} from "@/components/Icons";
import { cn } from "@/utils/utils";
import Link from "next/link";

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
  // {
  //   name: "chat",
  //   icon: <ChatIcon />,
  // },
  // {
  //   name: "calendar",
  //   icon: <CalendarIcon />,
  // },
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

interface MenuBarProps {
  logout: () => void;
  className?: string;
  handleMenuIconClick?: (name: string) => void;
}

export default function MenuBar({ logout, className, handleMenuIconClick }: MenuBarProps) {
  return (
    <div
      className={cn(
        "w-20 shrink-0 bg-black-secondary flex flex-col justify-between py-4 sticky",
        className
      )}
    >
      <div className="flex flex-col items-center gap-y-10">
        <Link href="/" className="cursor-pointer">
          <Logo className="my-4 w-16 h-16" />
        </Link>
        {routes.map((route) => (
          <ActiveLink
            href={route.href || `#${route.name}`}
            key={route.name}
            className="cursor-pointer"
            onClick={() => handleMenuIconClick?.(route.name)}
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
      <div className="flex items-center justify-center cursor-pointer" onClick={logout}>
        <LogoutIcon />
      </div>
    </div>
  );
}
