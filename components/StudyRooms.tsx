"use client";
import { useAuth } from "@/hooks/useAuth";
import { GetStudyRoomsResponse, getAllStudyRooms } from "@/lib/studyrooms.service";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useSwr from "swr";
import RoomListLoader from "./RoomListLoader";
import StudyRoomList from "./StudyRoomList";

export default function StudyRooms() {
  const { currentUser, loading: authLoader } = useAuth();

  const key = currentUser ? [`/study-rooms`, currentUser.$id] : null;

  const { data, error, isLoading } = useSwr(key, async ([_, uid]) => await getAllStudyRooms(uid), {
    onError: (error: any) => {
      console.error("Failed to fetch chat rooms:", error);
    },
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const loading = authLoader || isLoading;

  return (
    <>
      <div className="flex flex-col gap-4 mb-10 items-center">
        <h1 className="text-xl font-bold mt-4 px-2">Study Rooms</h1>
        <button className=" bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-bold p-4 rounded-md transition-colors duration-300 flex gap-4 items-center justify-between">
          <strong>Create Room</strong> <PlusCircleIcon className="w-6 h-6 text-indigo-50" />
        </button>
      </div>
      {renderComponet(loading, data)}
    </>
  );
}

const renderComponet = (loading: boolean, data: GetStudyRoomsResponse | undefined) => {
  const status = loading ? "loading" : data?.total === 0 ? "empty" : "success";

  switch (status) {
    case "loading":
      return (
        <div className="grid grid-cols-3 gap-x-8 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <RoomListLoader key={index} />
          ))}
        </div>
      );
    case "empty":
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 rounded-md cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-lg font-bold">No Study Rooms</span>
                <span className="text-sm">You have no study rooms</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="flex flex-col gap-4 items-center">
          <StudyRoomList studyRooms={data?.joinedStudyRooms || null} />
          <StudyRoomList studyRooms={data?.restStudyRooms || null} />
        </div>
      );

    default:
      return null;
  }
};
