"use client";

import useChatRoomInfo from "@/hooks/useChatRoom";
import { ChatRoomHeader } from "./ChatRoomHeader";
import ChatRoomInput from "./ChatRoomInput";
interface ChatRoomViewProps {
  chatRoomId: string;
}

export function ChatRoomView(props: ChatRoomViewProps) {
  const { chatRoomId } = props;
  const { chatRoom } = useChatRoomInfo(chatRoomId);
  // const { data: messages } = useChatRoomMessages(chatRoomId);

  return (
    <div className="chat-room-view">
      <ChatRoomHeader chatRoom={chatRoom as any} />
      {/* <ChatRoomMessages messages={messages} /> */}
      <ChatRoomInput chatRoomId={chatRoomId} />
    </div>
  );
}
