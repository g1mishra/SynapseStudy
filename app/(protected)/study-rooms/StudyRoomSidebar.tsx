"use client";

import ActiveLink from "@/components/ActiveLink";
import { ArrowRight } from "@/components/Icons";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import useCollapse from "@/hooks/useCollapse";
import useStudyRoomListByUserId from "@/hooks/useStudyRoomListByUserId";
import { cn } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  className?: string;
  handleClick?: (value?: number) => void;
}

export default function StudyRoomSidebar({ className, handleClick }: Props) {
  const params = useParams();
  const { currentUser, loading: authLoader } = useAuth();
  const [_, toggleCollapsed] = useCollapse(params?.id, false);
  let { studyRooms = [], isLoading } = useStudyRoomListByUserId(currentUser?.$id);

  const loading = authLoader || isLoading;

  const handleCollapse = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (handleClick) {
      handleClick();
      return;
    }
    if (id !== params.id) return;
    toggleCollapsed(false);
    e.preventDefault();
  };

  useEffect(() => {
    if (!params.id) return;
    toggleCollapsed(false);
  }, [params.id]);

  if (loading) return <Loading />;

  return (
    <div className={cn("hidden_scrollbar w-full h-full overflow-y-auto scroll-smooth", className)}>
      <h1 className="flex items-center justify-between text-white text-2xl leading-tight font-bold mt-6 py-6 px-12 pr-6">
        Your Rooms
        {handleClick && (
          <svg
            onClick={() => handleClick(-1)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </h1>
      <div className="h-0.25 bg-[#676683] mx-6" />
      <ul className="flex flex-col">
        {studyRooms?.length === 0 && (
          <li className="first:mt-9 mb-1 text-lg leading-6 text-white opacity-80">
            <p className="flex justify-center gap-2 items-center w-full px-6 py-3 hover:bg-black-secondary cursor-pointer">
              <span>
                No rooms found. <br />
              </span>
            </p>
          </li>
        )}
        {studyRooms?.map((room, index) => (
          <li key={room.$id} className="first:mt-9 mb-1 text-lg leading-6 text-white">
            <ActiveLink
              href={`/study-rooms/${room.$id}`}
              onClick={(e) => handleCollapse(e, room.$id)}
            >
              {(active) => (
                <p
                  className={cn(
                    "flex justify-between gap-2 items-center w-full px-6 py-3 hover:bg-black-secondary cursor-pointer"
                  )}
                >
                  <span>{room.name}</span>
                  <ArrowRight />
                </p>
              )}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
