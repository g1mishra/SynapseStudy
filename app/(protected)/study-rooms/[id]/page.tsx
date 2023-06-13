"use client";

import { useAuth } from "@/hooks/useAuth";
import useStudyRoomDetailsById from "@/hooks/useStudyRoomDetailsById";
import { leaveStudyRoom } from "@/lib/studyrooms.service";
interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  const { currentUser } = useAuth();
  const { data, isError } = useStudyRoomDetailsById(studyRoomId);
  console.log("data", data);
  

  const handleLeaveClick = () => {
    console.log("leave the study room");
    leaveStudyRoom(studyRoomId, currentUser?.$id);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 justify-center p-8 text-white">
      <h1>{data?.name}</h1>
      <button className="btn" onClick={handleLeaveClick}>
        Leave Room
      </button>
    </div>
  );
}
