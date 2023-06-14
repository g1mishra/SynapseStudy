"use client";

import { useAuth } from "@/hooks/useAuth";
import { createVideoChat } from "@/lib/chatrooms.service";
import { ChatChannel } from "@/types/chat";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "../Avatar";
import { VideoIcon } from "../Icons";
import StartVideoChat from "../Modal/StartVideoChat";

interface ChatRoomHeaderProps {
  chatRoom: ChatChannel;
}

const ChatRoomHeader = ({ chatRoom }: ChatRoomHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const { id: study_room_id } = useParams();
  const router = useRouter();

  const handleJoinGroupCall = async (name: string, subject: string) => {
    console.log("Joining group call with name:", name, "and subject:", subject);
    try {
      const resp = await createVideoChat({
        name,
        subject,
        study_room_id,
        user_id: currentUser?.$id,
        status: "active",
      });
      router.push(`/meeting/${resp?.$id}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create video chat");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center pt-1.5 pb-4">
        <Avatar imageSrc={chatRoom?.image} alt={chatRoom.name} width={48} height={48} />
        <div>
          <h2 className="text-lg font-semibold text-white uppercase">#{chatRoom.name}</h2>
          <p className="text-sm text-gray-400 line-clamp-1">{chatRoom.description}</p>
        </div>
        <div
          className="rounded-full p-2 hover:bg-slate-400 ml-auto"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <VideoIcon className="text-white w-6 h-6  cursor-pointer  " />
        </div>
      </div>
      <div className="h-0.25 bg-[#676683] shrink-0" />
      <StartVideoChat
        isOpen={isOpen}
        joinGroupCall={handleJoinGroupCall}
        closeModal={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default ChatRoomHeader;
