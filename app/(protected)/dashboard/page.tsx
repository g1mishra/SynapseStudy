"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { use, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { StudyRoomI } from "@/types/study-room";
import { createStudyRoom } from "@/lib/studyrooms.service";
import { toast } from "react-toastify";

const CreateStudyRoomModal = dynamic(
  () => import("@/components/Modal/CreateStudyRoomModal")
);
import Search from "@/components/Search";
import Avatar from "@/components/Avatar";
import Clock from "@/components/Clock";
import {
  AddGroup,
  BackgroundCurveSvg,
  FlowerIllustration,
  JoinGroup,
  PotIllustration,
} from "@/components/Icons";

export default function Dashboard() {
  const { currentUser, loading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  function handleSubmit(query: string) {
    console.log("Search query:", query);
  }

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
    <div className="flex md:flex-row flex-col">
      <div className="w-1/2 flex justify-center items-center gap-8 mt-20">
        <div
          className="w-52 h-52 bg-orange shadow-lg rounded-lg p-7 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <AddGroup />
          <p className="text-white text-lg font-semibold mt-14">New Room</p>
          <p className="text-white">set up new room</p>
        </div>
        <div className="w-52 h-52 bg-purple shadow-lg rounded-lg p-7 cursor-pointer">
          <JoinGroup />
          <p className="text-white text-lg font-semibold mt-14">Join Room</p>
          <p className="text-white">via invitation link</p>
        </div>
      </div>
      <div className="md:w-full lg:w-1/2 mt-7">
        <div className="flex gap-5 justify-between items-center">
          <Search handleSubmit={handleSubmit} />
          <Avatar className="rounded-md" width={56} height={56} />
        </div>
        <div className="mt-16">
          <div className="w-3/5 h-44 rounded-lg bg-bayoux">
            <div
              style={{
                position: "relative",
                top: "-8px",
                left: "-19px",
                height: "192px",
              }}
            >
              <BackgroundCurveSvg />
            </div>
            <div className="absolute top-60 pl-8">
              <Clock />
            </div>
            <div style={{ position: "absolute", top: "135px", right: "22rem" }}>
              <FlowerIllustration />
            </div>
            <div style={{ position: "absolute", top: "224px", right: "19rem" }}>
              <PotIllustration />
            </div>
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
    // <div className="flex flex-col md:flex-row">
    //   <div className="md:w-1/2 mt-7">
    //     <div className="flex justify-between items-center">
    //       <Search handleSubmit={handleSubmit} />
    //       <Avatar className="rounded-md" width={56} height={56} />
    //     </div>
    //     <div className="mt-16">
    //       <div className="w-full md:w-3/5 h-44 rounded-lg bg-bayoux relative">
    //         <div className="md:absolute top-0 left-0 w-full h-full">
    //           <BackgroundCurveSvg />
    //         </div>
    //         <div className="absolute md:top-0 md:pl-8">
    //           <Clock />
    //         </div>
    //         <div className="hidden md:block absolute top-0 right-0 md:mr-20">
    //           <FlowerIllustration />
    //         </div>
    //         <div className="hidden md:block absolute bottom-0 right-0 md:mr-16">
    //           <PotIllustration />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="md:w-1/2 mt-7 md:mt-0 md:flex md:justify-center md:items-center md:gap-8">
    //     <div className="w-52 h-52 bg-orange shadow-lg rounded-lg p-7 cursor-pointer">
    //       <AddGroup />
    //       <p className="text-white text-lg font-semibold mt-14">New Room</p>
    //       <p className="text-white">Set up new room</p>
    //     </div>
    //     <div className="w-52 h-52 bg-purple shadow-lg rounded-lg p-7 cursor-pointer">
    //       <JoinGroup />
    //       <p className="text-white text-lg font-semibold mt-14">Join Room</p>
    //       <p className="text-white">Via invitation link</p>
    //     </div>
    //   </div>
    // </div>
  );
}
