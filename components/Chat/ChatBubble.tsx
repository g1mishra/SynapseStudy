"use client";

import { formatDate } from "@/utils/date";
import { cn } from "@/utils/utils";
import Avatar from "../Avatar";

interface ChatBubbleProps {
  content: string;
  createdAt?: string;
  status?: string;
  senderId: string;
  user: {
    $id: string;
    name: string;
    image: string;
  };
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { content, createdAt, status, user, senderId } = props;
  const isSender = senderId === user?.$id;

  return (
    <div
      className={cn("chat", {
        "chat-start": !isSender,
        "chat-end": isSender,
      })}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar imageSrc={user?.image ?? ""} alt={user?.name ?? ""} width={40} height={40} />
        </div>
      </div>

      <div className="chat-header">
        <span className="mr-1">{user?.name}</span>
        <time className="text-xs opacity-50">{formatDate(createdAt as string)}</time>
      </div>
      <div className="chat-bubble">{content}</div>
      <div
        className={cn("chat-footer opacity-50", {
          hidden: !isSender,
        })}
      >
        {status}
      </div>
    </div>
  );
}
