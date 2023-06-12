import RequestToJoinModal from "@/components/Modal/RequestToJoinModal";
import { useAuth } from "@/hooks/useAuth";
import { joinStudyRoom, requestToJoinStudyRoom } from "@/lib/studyrooms.service";
import { StudyRoomModel } from "@/types/study-room";
import { Models } from "appwrite";
import { useState } from "react";
import StudyRoomCard from "./StudyRoomCard";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import useStudyRoomListByUserId from "@/hooks/useStudyRoomListByUserId";

interface StudyRoomsProps {
  publicRooms?: Models.Document[];
  privateRooms?: Models.Document[];
}

export default function StudyRooms({ publicRooms, privateRooms }: StudyRoomsProps) {
  const [showRequestToJoinModal, setShowRequestToJoinModal] = useState({
    open: false,
    roomId: "",
  });
  const { currentUser } = useAuth();
  const { mutate: mutateSidebarList } = useStudyRoomListByUserId(currentUser?.$id);
  const { mutate } = useSWRConfig();

  const handleJoinClick = async (room: StudyRoomModel) => {
    if (room.status === "private") {
      console.log("Private room");
      setShowRequestToJoinModal({
        open: true,
        roomId: room.$id,
      });
    }

    if (room.status === "public") {
      try {
        await joinStudyRoom({
          role: "user",
          study_room_id: room.$id,
          user_id: currentUser?.$id,
        });
        toast.success("Joined successfully");
        mutate("all-study-rooms");
        mutateSidebarList((prev) => ({
          documents: [...(prev?.documents || []), room],
          total: (prev?.total || 0) + 1,
        }));
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleSendRequest = async (message: string, roomId: string) => {
    try {
      await requestToJoinStudyRoom(currentUser?.$id, roomId, message);
      toast.success("Request sent successfully");
      setShowRequestToJoinModal({
        open: false,
        roomId: "",
      });
    } catch (error: any) {
      let message = error.message;
      if (message.includes("already exists")) {
        message = "You have already sent a request to join this room";
      }
      toast.error(message);
    }
  };

  return (
    <div className="w-full overflow-y-auto hidden_scrollbar">
      {publicRooms && publicRooms.length > 0 ? (
        <>
          <h1 className="text-white text-4xl font-bold mt-4 mb-12">Public Study Rooms</h1>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {publicRooms?.map((room, index) => (
              <StudyRoomCard
                key={`public-${room.$id}-${index}`}
                heading={room.name}
                paragraph={room.subject}
                buttonText="Join"
                onClick={() => handleJoinClick(room as StudyRoomModel)}
                status={room.status}
              />
            ))}
          </div>
        </>
      ) : null}

      {privateRooms && privateRooms.length > 0 ? (
        <>
          <h1 className="text-white text-4xl font-bold my-12">Private Study Rooms</h1>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {privateRooms?.map((room, index) => (
              <StudyRoomCard
                key={`private-${room.$id}-${index}`}
                heading={room.name}
                paragraph={room.subject}
                buttonText="Join"
                onClick={() => handleJoinClick(room as StudyRoomModel)}
                status={room.status}
              />
            ))}
          </div>
        </>
      ) : null}
      <RequestToJoinModal
        open={showRequestToJoinModal?.open}
        roomId={showRequestToJoinModal?.roomId}
        onClose={() =>
          setShowRequestToJoinModal({
            open: false,
            roomId: "",
          })
        }
        onSendRequest={handleSendRequest}
      />
    </div>
  );
}
