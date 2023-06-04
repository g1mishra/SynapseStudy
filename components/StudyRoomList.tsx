import Avatar from "@/components/Avatar";
import { StudyRoomModel } from "@/types/study-room";
import { cn } from "@/utils/utils";
import Link from "next/link";

interface StudyRoomListProps {
  studyRooms: StudyRoomModel[] | null;
}

function StudyRoomList({ studyRooms }: StudyRoomListProps) {
  if (!studyRooms) {
    return null;
  }

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
            <div className="flex flex-col justify-center items-center">
              <Avatar imageSrc={room.image_url} alt={room.name} width={48} height={48} />
              <span className="text-lg font-bold mt-2">{room.name}</span>
              <span className="text-sm mt-1">{room.subject}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default StudyRoomList;
