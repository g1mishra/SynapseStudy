import { useAuth } from "@/hooks/useAuth";
import useParticipants from "@/hooks/useParticipants";
import { ChatChannel, ChatMessage } from "@/types/chat";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomInput from "./ChatRoomInput";
import Loading from "../Loading";

interface ChatRoomViewProps {
  roomInfo: ChatChannel;
  messages?: ChatMessage[] | undefined;
}

export function ChatRoomView({ roomInfo, messages }: ChatRoomViewProps) {
  const { id: studyRoomId } = useParams();
  const { currentUser, loading } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user: participants, isLoading } = useParticipants(studyRoomId);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <ChatRoomHeader chatRoom={roomInfo} />
      <div
        className="py-4 md:px-6 m-2 flex-1 hidden_scrollbar overflow-y-auto text-white"
        style={{
          overflowAnchor: "none",
        }}
        ref={chatContainerRef}
      >
        {messages && renderChatBubbles(messages, currentUser, participants)}
      </div>
      <div className="py-4 px-6 border rounded-15">
        <ChatRoomInput channelId={roomInfo?.$id} />
      </div>
    </div>
  );
}

const renderChatBubbles = (
  messages: ChatMessage[],
  currentUser: { $id: string },
  participants: any
) => {
  let currentDate: string | null = null;
  let previousSenderId: string | null = null;
  return messages.map((message, index) => {
    let user = participants?.find((participant: any) => participant?.$id === message?.sender_id);

    const messageDate = new Date(message.$createdAt).toLocaleDateString();

    let renderDate = null;
    if (messageDate !== currentDate) {
      renderDate = renderDateSegment(messageDate);
      currentDate = messageDate;
      previousSenderId = null; // Reset previous sender ID for new date segment
    }

    const isConsecutiveMessage = user?.$id === previousSenderId;

    previousSenderId = user?.$id;

    return (
      <React.Fragment key={`${message.$id}-${index}`}>
        {!isConsecutiveMessage && renderDate} {/* Render date segment only if not consecutive */}
        <ChatBubble
          content={message.content}
          createdAt={message.$createdAt}
          status={message.status}
          senderId={currentUser.$id}
          user={user}
          messageType={message.message_type}
          isConsecutiveMessage={isConsecutiveMessage} // Pass isConsecutiveMessage to ChatBubble
        />
      </React.Fragment>
    );
  });
};

const renderDateSegment = (date: string) => {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

  let segmentText = date;

  if (date === today) {
    segmentText = "Today";
  } else if (date === yesterday) {
    segmentText = "Yesterday";
  }

  return (
    <div className="flex items-center my-2">
      <hr className="flex-grow border-gray-600" />
      <span className="px-4 text-gray-500">{segmentText}</span>
      <hr className="flex-grow border-gray-600" />
    </div>
  );
};
