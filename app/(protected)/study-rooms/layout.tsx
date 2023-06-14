"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/utils";
import dynamic from "next/dynamic";

const StudyRoomSidebar = dynamic(() => import("./StudyRoomSidebar"));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex flex-col !pt-0">
      <div className="flex flex-row overflow-hidden">
        {matches && (
          <div
            className={cn(
              "hidden md:flex flex-col shrink-0 sm:w-full min-w-[350px] w-full md:w-1/6 h-screen overflow-hidden bg-black-tertiary"
            )}
          >
            <StudyRoomSidebar />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
