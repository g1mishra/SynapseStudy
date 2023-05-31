"use client";

import { getStudyRoom } from "@/lib/studyrooms.service";
import useSWR from "swr";
export default function StudyRoomDetails({ studyRoomId }: { studyRoomId: string }) {

  const { data, error } = useSWR([`/joined-study-rooms`, studyRoomId], getStudyRoom, {
    onError: (error: any) => {
      console.error("Failed to fetch chat rooms:", error);
    },
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  if (error) {
    return <div>Failed to load study room</div>;
  }

  return (
    <div className="flex flex-col items-center text-center py-8">
      <h1 className="text-xl font-bold p-4">{data?.name}</h1>
      <p className="max-w-screen-md">{data?.subject}</p>
      <p className="max-w-screen-md">{data?.description}</p>
    </div>
  );
}
