"use client";

import { ChatChannel } from "@/types/chat";
import Avatar from "../Avatar";

interface ChatRoomHeaderProps {
  chatRoom: ChatChannel;
}

const ChatRoomHeader = ({ chatRoom }: ChatRoomHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center pt-1.5 pb-4">
        <Avatar imageSrc={chatRoom?.image} alt={chatRoom.name} width={48} height={48} />
        <div>
          <h2 className="text-lg font-semibold text-white uppercase">#{chatRoom.name}</h2>
          <p className="text-sm text-gray-400 whitespace-nowrap overflow-ellipsis">{chatRoom.description}</p>
        </div>
      </div>
      <div className="h-0.25 bg-[#676683]" />
    </div>
  );
};

export default ChatRoomHeader;
