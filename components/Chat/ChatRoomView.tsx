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
  }, [messages?.length]);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <ChatRoomHeader chatRoom={roomInfo} />
      <div
        className="py-4 px-6 m-2 flex-1 hidden_scrollbar overflow-y-auto text-white"
        ref={chatContainerRef}
      >
        {messages?.map((message, index) => {
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
      <div className="py-4 px-6 border rounded-15">
        <ChatRoomInput channelId={roomInfo?.$id} />
      </div>
    </div>
  );
}
