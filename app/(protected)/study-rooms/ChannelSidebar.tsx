"use client";

import ActiveLink from "@/components/ActiveLink";
import { ArrowRight } from "@/components/Icons";
import Loading from "@/components/Loading";
import useCollapse from "@/hooks/useCollapse";
import useStudyRoomDetailsById from "@/hooks/useStudyRoomDetailsById";
import { cn } from "@/utils/utils";

interface ChannelSidebarProps {
  studyRoomId: string;
  handleClick?: () => void;
  onLinkClick?: () => void;
}

export default function ChannelSidebar({
  studyRoomId,
  handleClick,
  onLinkClick,
}: ChannelSidebarProps) {
  const { data, isLoading } = useStudyRoomDetailsById(studyRoomId);
  const [collapsed, toggleCollapsed] = useCollapse(studyRoomId, false);

  const handleToggleCollapsed = () => {
    if (handleClick) {
      handleClick();
      return;
    }
    toggleCollapsed(true);
  };

  if (isLoading) return <Loading />;
  if (collapsed) return null;
  return (
    <div className="flex flex-col shrink-0 flex-1 md:max-w-max min-w-max h-screen overflow-hidden bg-black-tertiary md:bg-black-secondary ">
      <div className="md:min-w-[350px] md:w-1/6 hidden_scrollbar h-full overflow-y-auto scroll-smooth  relative">
        <div className="flex items-center justify-between text-white mt-6 py-6 px-6 md:px-12 pr-6">
          <h1 className="text-2xl leading-tight font-bold">{data?.name}</h1>
          <ArrowRight className="rotate-180" onClick={handleToggleCollapsed} />
        </div>
        <div className="h-0.25 bg-[#676683] mx-6" />
        <ul className="flex flex-col">
          {data?.channels.map((channel) => (
            <li key={channel.$id} className="first:mt-9 mb-1 text-lg leading-6 text-white">
              <ActiveLink href={`/study-rooms/${studyRoomId}/${channel.$id}`} onClick={onLinkClick}>
                {(active) => (
                  <p
                    className={cn(
                      "flex justify-between gap-2 items-center w-full px-6 py-3 hover:bg-black-tertiary cursor-pointer",
                      active ? "bg-black-tertiary w-full" : ""
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
    </div>
  );
}
