"use client";

import Avatar from "@/components/Avatar";
import Search from "@/components/Search";

import { useAuth } from "@/hooks/useAuth";
import { getAllStudyRooms } from "@/lib/studyrooms.service";
import { useMemo } from "react";
import useSWR from "swr";
import StudyRooms from "./StudyRooms";
import Loading from "@/components/Loading";
import Link from "next/link";

const StudyRoomPage = () => {
  const { currentUser } = useAuth();
  const { data, error } = useSWR(
    currentUser?.$id ? "all-study-rooms" : null,
    async () => await getAllStudyRooms(currentUser?.$id),
    {
      revalidateOnFocus: false,
    }
  );

  const publicRooms = useMemo(
    () => data?.filter((room) => room.status === "public"),
    [data]
  );

  const privateRooms = useMemo(
    () => data?.filter((room) => room.status === "private"),
    [data]
  );

  function handleSubmit(query: string) {
    console.log("Search query:", query);
  }

  const isLoading = !data && !error;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col p-8 overflow-hidden ">
      <div className="justify-between items-center pb-8 hidden md:flex">
        <Search handleSubmit={handleSubmit} />
        <Link href="/settings">
          <Avatar
            className="rounded-md"
            imageSrc={currentUser?.prefs?.image || ""}
            width={50}
            height={50}
          />
        </Link>
      </div>
      <StudyRooms publicRooms={publicRooms} privateRooms={privateRooms} />
    </div>
  );
};

export default StudyRoomPage;
