"use client";

import { useAuth } from "@/hooks/useAuth";
import StudyRoomDetails from "./StudyRoomDeatils";

export default function Page({ params }: { params: { id: string } }) {
  // to check if the user is authorized to view the study room
  useAuth();

  return (
    <>
      <StudyRoomDetails studyRoomId={params.id} />
    </>
  );
}
