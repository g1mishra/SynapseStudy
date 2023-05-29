"use client";
import { useAuth } from "@/hooks/useAuth";
import useSwr from "swr";
import StudyRoomList from "./StudyRoomList";
import RoomListLoader from "./RoomListLoader";

export default function StudyRooms({
  handleRoomClick,
}: {
  handleRoomClick: (room: string) => void;
}) {
  const { currentUser, loading } = useAuth();

  const {
    data: joinedStudyRooms,
    error: error1,
    isLoading: loading1,
  } = useSwr(
    currentUser ? `/api/study-group/joined?user_id=${currentUser.$id}` : null,
    (url) => fetch(url).then((res) => res.json()),
    {
      onError: (error: any) => {
        console.error("Failed to fetch chat rooms:", error);
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const {
    data: unjoinedStudyRooms,
    error: error2,
    isLoading: loading2,
  } = useSwr(
    currentUser ? `/api/study-group/unjoined?user_id=${currentUser.$id}` : null,
    (url) => fetch(url).then((res) => res.json()),
    {
      onError: (error: any) => {
        console.error("Failed to fetch chat rooms:", error);
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  // const {
  //   data: joinedStudyRooms,
  //   error: error1,
  //   isLoading: loading1,
  // } = useSwr(
  //   currentUser ? [`/joined-study-rooms`, currentUser.$id] : null,
  //   getUserJoinedStudyRooms,
  //   {
  //     onError: (error: any) => {
  //       console.error("Failed to fetch chat rooms:", error);
  //     },
  //     revalidateOnFocus: false,
  //     shouldRetryOnError: false,
  //   }
  // );

  if (loading) return <RoomListLoader />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white mt-4 px-2">Joined Study Rooms</h1>
        <StudyRoomList
          studyRooms={joinedStudyRooms?.data || null}
          loading={loading1}
          error={error1}
          handleRoomClick={handleRoomClick}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white mt-4 px-2">Unjoined Study Rooms</h1>
        <StudyRoomList
          studyRooms={unjoinedStudyRooms?.data || null}
          loading={loading2}
          error={error2}
          handleRoomClick={handleRoomClick}
        />
      </div>
    </div>
  );
}
