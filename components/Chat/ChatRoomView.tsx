"use client";

import { useAuth } from "@/hooks/useAuth";
import ChatBubble from "./ChatBubble";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomInput from "./ChatRoomInput";

interface ChatRoomViewProps {
  chatRoom: any;
}

export function ChatRoomView(props: ChatRoomViewProps) {
  const { chatRoomId, messages } = props.chatRoom;
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-100 h-full flex flex-col justify-between">
      <ChatRoomHeader chatRoom={props?.chatRoom} />
      <div className="py-4 px-6 bg-white m-2 shadow-md flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">Chat Room</h1>
        <div className="mt-4">
          {messages?.map((message: any) => (
            <ChatBubble
              key={message.id}
              content={message.content}
              createdAt={message.createdAt}
              status={message.status}
              senderId={message.senderId}
              user={currentUser}
            />
          ))}
        </div>
      </div>
      <div className="py-4 px-6 bg-white m-2 shadow-md">
        <ChatRoomInput chatRoomId={chatRoomId} />
      </div>
    </div>
  );
}
