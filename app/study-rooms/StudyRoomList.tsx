import { StudyRoomModel } from "@/types/study-room";
import { cn } from "@/utils/utils";
import Link from "next/link";
import RoomListLoader from "./RoomListLoader";

interface StudyRoomListProps {
  studyRooms: StudyRoomModel[] | null;
  loading: boolean;
  error: any;
}

function StudyRoomList({ studyRooms, loading, error }: StudyRoomListProps) {
  if (loading) return <RoomListLoader />;

  if (error) {
    return <div className="text-red-500">Failed to load study rooms</div>;
  }

  if (!studyRooms) {
    return null;
  }

  if (studyRooms?.length === 0)
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
        <Link key={room.$id} href={`/study-rooms/${room.$id}`}>
          <div
            key={room.name}
            className={cn(
              "flex items-center justify-between p-4 rounded-md cursor-pointer",
              "hover:bg-gray-200",
              "transition-colors duration-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <div className="flex items-center gap-4">
              <img src={room.image_url} alt="Room" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">{room.name}</span>
                <span className="text-sm">{room.subject}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default StudyRoomList;
