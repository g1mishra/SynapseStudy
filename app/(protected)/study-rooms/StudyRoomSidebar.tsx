"use client";

import ActiveLink from "@/components/ActiveLink";
import { ArrowRight } from "@/components/Icons";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import useStudyRoomByUserId from "@/hooks/useStudyRoomByUserId";
import { cn } from "@/utils/utils";

export default function StudyRoomSidebar() {
  const { currentUser, loading: authLoader } = useAuth();
  const { studyRooms, isLoading, isError } = useStudyRoomByUserId(currentUser?.$id);

  const loading = authLoader || isLoading;

  if (loading) return <Loading />;

  return (
    <div className="hidden_scrollbar w-full h-full overflow-y-auto scroll-smooth p-6">
      <h1 className="text-white text-2xl leading-tight font-bold mt-6 p-6">Your Rooms</h1>
      <div className="w-full h-0.25 bg-[#676683]" />
      <ul className="flex flex-col">
        {studyRooms?.map((room, index) => (
          <li key={room.$id} className="first:mt-9 mx-6 my-3 text-lg leading-6">
            <ActiveLink href={`/study-rooms/${room.$id}`}>
              {(active) => (
                <p
                  className={cn(
                    "flex justify-between gap-2 items-center",
                    active ? "text-gray-400" : "text-white"
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
