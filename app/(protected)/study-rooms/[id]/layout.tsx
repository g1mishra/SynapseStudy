"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import ChannelSidebar from "../ChannelSidebar";

interface StudyRoomsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function StudyRoomsLayout({ children, params }: StudyRoomsLayoutProps) {
  const { id } = params;
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row overflow-hidden">
        {matches && <ChannelSidebar studyRoomId={id} />}
        <div className="w-full flex flex-col shrink-0 flex-1 p-8 h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
