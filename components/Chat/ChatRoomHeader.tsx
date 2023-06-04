"use client";

import { ChatRoom } from "@/types/chat";
import Avatar from "../Avatar";

interface ChatRoomHeaderProps {
  chatRoom: ChatRoom;
}

const ChatRoomHeader = ({ chatRoom }: ChatRoomHeaderProps) => {
  return (
    <div className="bg-gray-800 py-4 px-6">
      <div className="flex items-center">
        <Avatar imageSrc={chatRoom?.image} width={48} height={48} />
        <div>
          <h2 className="text-lg font-semibold text-white uppercase">{chatRoom.name}</h2>
          <p className="text-sm text-gray-400">{chatRoom.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
