"use client";

import { useAuth } from "@/hooks/useAuth";

import { Loader } from "@/components/Loading";
import { getStudyRoomById } from "@/lib/studyrooms.service";
import Link from "next/link";
import useSWR from "swr";

interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  // to check if the user is authorized to view the study room
  const { currentUser } = useAuth();

  const key = studyRoomId ? [`/study-room/${studyRoomId}`, studyRoomId] : null;

  const { data, isLoading, error } = useSWR(key, async ([_, id]) => await getStudyRoomById(id), {
    onError: (error: any) => {
      console.error("Failed to fetch chat rooms:", error);
    },
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  if (error) {
    return <div>Failed to load study room</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-center py-8">
        <Loader />;
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center text-center py-8">
        <div>
          <h1 className="text-xl font-bold p-4">{data?.name}</h1>
          <p className="max-w-screen-md">{data?.subject}</p>
          <p className="max-w-screen-md">{data?.description}</p>
        </div>
        <section className="mt-8">
          <h1 className="text-2xl font-bold">Channels</h1>
          <ul>
            {data?.channels.map((channel: any) => (
              <Link href={`/study-rooms/${studyRoomId}/${channel.$id}`} key={channel.id}>
                <li className="cursor-pointer underline hover:underline"># {channel.name}</li>
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
