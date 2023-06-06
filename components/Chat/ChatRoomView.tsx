"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChatChannel, ChatMessage } from "@/types/chat";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomInput from "./ChatRoomInput";

import ChatBubble from "./ChatBubble";

interface ChatRoomViewProps {
  roomInfo: ChatChannel;
  messages: ChatMessage[] | undefined
}

export function ChatRoomView({ roomInfo, messages }: ChatRoomViewProps) {
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-100 h-full flex flex-col justify-between">
      <ChatRoomHeader chatRoom={roomInfo} />
      <div className="py-4 px-6 bg-white m-2 shadow-md flex-1 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800">Chat Room</h1>
        <div className="mt-4">
          {messages?.map((message) => {
            let user = JSON.parse(message?.sender ?? "{}");
            return (
              <ChatBubble
                key={message.$id}
                content={message.content}
                createdAt={message.$createdAt}
                status={message.status}
                senderId={currentUser.$id}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <div className="py-4 px-6 bg-white m-2 shadow-md">
        <ChatRoomInput chatRoomId={roomInfo?.$id} />
      </div>
    </div>
  );
}
