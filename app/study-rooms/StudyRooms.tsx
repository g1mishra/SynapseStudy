"use client";
import { useAuth } from "@/hooks/useAuth";
import { getUnjoinedStudyRooms, getUserJoinedStudyRooms } from "@/lib/studyrooms.service";
import { cn } from "@/utils/utils";
import useSwr from "swr";

// interface StudyRoom {
//   name: string;
//   subject: string;
//   description: string;
//   image_url: string;
// }

interface StudyRoomListProps {
  studyRooms: any[];
  loading: boolean;
  error: any;
  handleRoomClick: (room: string) => void;
}

function StudyRoomList({ studyRooms, loading, error, handleRoomClick }: StudyRoomListProps) {
  console.log(studyRooms, loading, error);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-400 rounded"></div>
            <div className="h-4 bg-blue-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load study rooms</div>;
  }

  if (studyRooms.length === 0)
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

  return (
    <div className="flex flex-col gap-4">
      {studyRooms.map((room) => (
        <div
          key={room.name}
          className={cn(
            "flex items-center justify-between p-4 rounded-md cursor-pointer",
            "hover:bg-gray-200",
            "transition-colors duration-300",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          )}
          onClick={() => handleRoomClick(room.name)}
        >
          <div className="flex items-center gap-4">
            <img src={room.image_url} alt="Room" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{room.name}</span>
              <span className="text-sm">{room.subject}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StudyRooms({
  handleRoomClick,
}: {
  handleRoomClick: (room: string) => void;
}) {
  // const { currentUser } = useAuth();

  const currentUser = { $id: "646b3810e4dc3d0fa6eb" };

  const {
    data: joinedStudyRooms,
    error: error1,
    isLoading: loading1,
  } = useSwr(
    currentUser ? [`/joined-study-rooms`, currentUser.$id] : null,
    getUserJoinedStudyRooms,
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
    currentUser ? [`/unjoined-study-rooms`, currentUser.$id] : null,
    getUnjoinedStudyRooms,
    {
      onError: (error: any) => {
        console.error("Failed to fetch chat rooms:", error);
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white mt-4 px-2">Joined Study Rooms</h1>
        <StudyRoomList
          studyRooms={joinedStudyRooms?.documents || []}
          loading={loading1}
          error={error1}
          handleRoomClick={handleRoomClick}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white mt-4 px-2">Unjoined Study Rooms</h1>
        <StudyRoomList
          studyRooms={unjoinedStudyRooms?.documents || []}
          loading={loading2}
          error={error2}
          handleRoomClick={handleRoomClick}
        />
      </div>
    </div>
  );
}
