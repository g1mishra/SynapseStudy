import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ChatChannel, ChatMessage } from "@/types/chat";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomInput from "./ChatRoomInput";
import ChatBubble from "./ChatBubble";

interface ChatRoomViewProps {
  roomInfo: ChatChannel;
  messages?: ChatMessage[] | undefined;
}

export function ChatRoomView({ roomInfo, messages }: ChatRoomViewProps) {
  const { currentUser } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <ChatRoomHeader chatRoom={roomInfo} />
      <div
        className="py-4 px-6 m-2 shadow-md flex-1 hidden_scrollbar overflow-y-auto"
        ref={chatContainerRef}
      >
        <h1 className="text-2xl font-semibold">Chat Room</h1>
        <div className="mt-4">
          {messages?.reverse().map((message, index) => {
            let user = JSON.parse(message?.sender ?? "{}");
            return (
              <ChatBubble
                key={`${message.$id}-${index}`}
                content={message.content}
                createdAt={message.$createdAt}
                status={message.status}
                senderId={currentUser.$id}
                user={user}
                messageType={message.message_type}
              />
            );
          })}
        </div>
      </div>
      <div className="py-4 px-6 m-2 shadow-md">
        <ChatRoomInput channelId={roomInfo?.$id} />
      </div>
    </div>
  );
}
