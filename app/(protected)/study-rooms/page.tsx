"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { getAllStudyRooms } from "@/lib/studyrooms.service";
import { useMemo } from "react";
import useSWR from "swr";
import Header from "../Header";
import StudyRooms from "./StudyRooms";

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

  const isLoading = !data && !error;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full sm:h-screen flex flex-col p-4 sm:p-8 overflow-hidden">
      <Header
        currentUser={currentUser}
        className="hidden md:flex justify-between w-full max-w-full"
      />
      <StudyRooms publicRooms={publicRooms} privateRooms={privateRooms} />
    </div>
  );
};

export default StudyRoomPage;
