"use client";

import { formatDate } from "@/utils/date";
import { bucketFilePath, cn } from "@/utils/utils";
import Avatar from "../Avatar";

interface ChatBubbleProps {
  messageType?: string;
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
  const { messageType, content, createdAt, status, user, senderId } = props;
  const isSender = senderId === user?.$id;

  const renderMessageContent = () => {
    let messageObj = {} as { url: string; message: string; fileName: string };
    if (messageType !== "text") {
      messageObj = JSON.parse(content ?? "{}");
      messageObj.url = bucketFilePath("chat-files-bucket", messageObj.url);
    }
    if (messageType === "text") {
      return <div className="chat-bubble">{content}</div>;
    } else if (messageType === "image") {
      return (
        <div className="chat-bubble">
          <img src={messageObj?.url} alt="Image" className="sm:max-w-md object-contain max-h-52" />
          <span className="mt-1 inline-block">{messageObj.message}</span>
        </div>
      );
    } else if (messageType === "video") {
      return (
        <div className="chat-bubble">
          <video src={messageObj?.url} controls className="sm:max-w-md aspect-video" />
          <span className="mt-1 inline-block">{messageObj.message}</span>
        </div>
      );
    } else if (messageType === "audio") {
      return (
        <div className="chat-bubble">
          <audio src={messageObj?.url} controls className="chat-audio" />
          <span className="mt-1 inline-block">{messageObj.message}</span>
        </div>
      );
    } else if (messageType === "file") {
      return (
        <div className="chat-bubble">
          <a className="rounded" href={content} target="_blank" rel="noopener noreferrer">
            {messageObj?.fileName}
          </a>
        </div>
      );
    } else {
      return null;
    }
  };

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
      {renderMessageContent()}
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
