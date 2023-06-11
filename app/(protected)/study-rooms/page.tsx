"use client";

import Avatar from "@/components/Avatar";
import Search from "@/components/Search";
import StudyRoomCard from "./StudyRoomCard";

import { useAuth } from "@/hooks/useAuth";
import { getAllStudyRooms } from "@/lib/studyrooms.service";
import { useMemo } from "react";
import useSWR from "swr";

const StudyRoomPage = () => {
  const { currentUser } = useAuth();
  const { data, error } = useSWR(
    currentUser?.$id ? "all-study-rooms" : null,
    async () => await getAllStudyRooms(currentUser?.$id),
    {
      revalidateOnFocus: false,
    }
  );

  const publicRooms = useMemo(() => data?.filter((room) => room.status === "public"), [data]);

  const privateRooms = useMemo(() => data?.filter((room) => room.status === "private"), [data]);

  function handleSubmit(query: string) {
    console.log("Search query:", query);
  }
  const handleJoinClick = () => {
    console.log("Join button clicked");
  };

  return (
    <div className="w-full flex flex-col p-8">
      <div className="flex justify-between items-center">
        <Search handleSubmit={handleSubmit} />
        <Avatar className="rounded-md" width={50} height={50} />
      </div>
      <div>
        {publicRooms && publicRooms.length > 0 ? (
          <>
            <h1 className="text-white text-4xl font-bold my-12">Public Study Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              {publicRooms?.map((room, index) => (
                <StudyRoomCard
                  key={`public-${room.$id}-${index}`}
                  heading={room.name}
                  paragraph={room.subject}
                  buttonText="Join"
                  onClick={handleJoinClick}
                  status={room.status}
                />
              ))}
            </div>
          </>
        ) : null}

        {privateRooms && privateRooms.length > 0 ? (
          <>
            <h1 className="text-white text-4xl font-bold my-12">Private Study Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              {privateRooms?.map((room, index) => (
                <StudyRoomCard
                  key={`private-${room.$id}-${index}`}
                  heading={room.name}
                  paragraph={room.subject}
                  buttonText="Join"
                  onClick={handleJoinClick}
                  status={room.status}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default StudyRoomPage;
