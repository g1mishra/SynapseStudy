"use client";

import { ChatChannel } from "@/types/chat";
import Avatar from "../Avatar";

interface ChatRoomHeaderProps {
  chatRoom: ChatChannel;
}

const ChatRoomHeader = ({ chatRoom }: ChatRoomHeaderProps) => {
  return (
    <div className="flex items-center">
      <Avatar imageSrc={chatRoom?.image} alt={chatRoom.name} width={48} height={48} />
      <div>
        <h2 className="text-lg font-semibold text-white uppercase">#{chatRoom.name}</h2>
        <p className="text-sm text-gray-400">{chatRoom.description}</p>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
