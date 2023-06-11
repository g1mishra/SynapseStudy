"use client";

import ActiveLink from "@/components/ActiveLink";
import { ArrowRight } from "@/components/Icons";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import useStudyRoomDetailsById from "@/hooks/useStudyRoomDetailsById";
import { cn } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ChannelSidebarProps {
  studyRoomId: string;
}

export default function ChannelSidebar({ studyRoomId }: ChannelSidebarProps) {
  const { channelId } = useParams();
  const { data, isLoading } = useStudyRoomDetailsById(studyRoomId);
  const [collapsed, setCollapsed] = useState(false);

  console.log("channelId", channelId);

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col shrink-0 max-w-max h-screen overflow-hidden bg-black-secondary ">
      {collapsed ? (
        <div className="flex flex-col items-center h-full p-6">
          <div className="flex items-center text-white mt-12">
            <ArrowRight onClick={handleCollapse} />
          </div>
        </div>
      ) : (
        <div className="min-w-[350px] w-1/6 hidden_scrollbar h-full overflow-y-auto scroll-smooth p-6">
          <div className="flex items-center justify-between text-white mt-6 p-6 pr-0">
            <h1 className="text-2xl leading-tight font-bold">Your Rooms</h1>
            <ArrowRight className="rotate-180" onClick={handleCollapse} />
          </div>
          <div className="w-full h-0.25 bg-[#676683]" />
          <ul className="flex flex-col">
            {data?.channels.map((channel) => (
              <li key={channel.$id} className="first:mt-9 mx-6 my-3 text-lg leading-6">
                <ActiveLink href={`/study-rooms/${studyRoomId}/${channel.$id}`}>
                  {(active) => (
                    <p
                      className={cn(
                        "flex justify-between gap-2 items-center",
                        active ? "text-gray-400" : "text-white"
                      )}
                    >
                      <span># {channel.name}</span>
                    </p>
                  )}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
