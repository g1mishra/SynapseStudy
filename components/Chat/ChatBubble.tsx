"use client";

import { formatDate } from "@/utils/date";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

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
  const [imageError, setImageError] = useState(false);

  const { content, createdAt, status, user, senderId } = props;
  const isSender = senderId === user?.$id;

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div
      className={cn("chat", {
        "chat-start": isSender,
        "chat-end": !isSender,
      })}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {!imageError ? (
            <Image
              src={user?.image ?? "/images/avatar.png"}
              alt={user?.name ?? ""}
              width={40}
              height={40}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-500" />
          )}
        </div>
      </div>

      <div className="chat-header">
        <span className="mr-1">{user?.name}</span>
        <time className="text-xs opacity-50">{formatDate(createdAt as string)}</time>
      </div>
      <div className="chat-bubble">{content}</div>
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
}
