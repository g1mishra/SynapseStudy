"use client";

import Clock from "@/components/Clock";
import {
  AddGroup,
  BackgroundCurveSvg,
  FlowerIllustration,
  JoinGroup,
  PotIllustration,
} from "@/components/Icons";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { createStudyRoom } from "@/lib/studyrooms.service";
import { StudyRoomI } from "@/types/study-room";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Header from "../Header";

const CreateStudyRoomModal = dynamic(() => import("@/components/Modal/CreateStudyRoomModal"));

export default function Dashboard() {
  const { currentUser, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);

  const _createStudyRoom = useCallback(
    async (studyRoom: StudyRoomI) => {
      try {
        const newStudyRoom = await createStudyRoom({
          ...studyRoom,
          userId: currentUser.$id,
        });
        if (newStudyRoom?.$id) setSuccessfullyCreated(true);
        else toast.error("Study room creation failed");
      } catch (err: any) {
        toast.error(err.message);
      }
    },
    [createStudyRoom]
  );

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col p-8">
      <Header currentUser={currentUser} className="hidden md:flex" />
      <div className="flex flex-col-reverse md:flex-row gap-y-6 gap-x-16 md:pl-6">
        {/* left  */}
        <div className="w-full md:w-1/2 flex gap-y-6 gap-x-8 items-center justify-center">
          <div
            className="w-52 h-52 flex flex-col justify-between flex-1 bg-orange shadow-lg rounded-lg p-7 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <AddGroup />
            <div>
              <p className="text-white text-lg font-semibold">New Room</p>
              <p className="text-white">set up new room</p>
            </div>
          </div>
          <div className="w-52 h-52 flex flex-col flex-1 justify-between bg-purple shadow-lg rounded-lg p-7 cursor-pointer">
            <JoinGroup />
            <div>
              <p className="text-white text-lg font-semibold">Join Room</p>
              <p className="text-white">via invitation link</p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-full md:w-1/2 flex flex-col md:items-end min-h-[170px]">
          <div className="flex-1 w-full md:max-w-md h-52 rounded-lg bg-bayoux relative overflow-hidden">
            <BackgroundCurveSvg className="absolute -left-14  h-60 -top-4 w-auto" />
            <div className="absolute flex items-center left-6 inset-y-0 ">
              <Clock />
            </div>
            <div className="absolute right-14 bottom-[-22px]">
              <FlowerIllustration />
            </div>
            <div className="absolute -bottom-2 right-0">
              <PotIllustration />
            </div>
          </div>
        </div>
        <CreateStudyRoomModal
          open={open}
          onClose={() => setOpen(false)}
          onCreateChatRoom={_createStudyRoom}
          sucessfulCreation={successfullyCreated}
        />
      </div>
    </div>
  );
}
