"use client";

import { ChatRoomView } from "@/components/Chat/ChatRoomView";
import { useChatMessages } from "@/hooks/useChatMessages";
import appwriteSDKProvider from "@/lib/appwrite.client";
import { ChatChannel } from "@/types/chat";
import { Server } from "@/utils/config";
import { useEffect } from "react";

const Base_Event = `databases.${Server.dbId}.collections.${Server.messagesCollectionId}.documents`;

export default function ChannelChat({ roomInfo }: { roomInfo: ChatChannel }) {
  const channelId = roomInfo?.$id;
  const { messages, mutateMessages } = useChatMessages(channelId);

  useEffect(() => {
    const unsubscribe = appwriteSDKProvider.client.subscribe(`${Base_Event}`, (response) => {
      const payload: any = response?.payload;
      if (response.events.includes(`${Base_Event}.*.create`)) {
        if (payload && payload.channel_Id !== channelId) return;
        mutateMessages((prev) => {
          const index = prev?.findIndex((message) => message.$id !== payload.$id);
          if (prev && index !== undefined && index !== -1) {
            prev[index] = payload;
            return prev;
          }
          return [...(prev ?? []), payload];
        });
      } else if (response.events.includes(`${Base_Event}.*.update`)) {
        if (payload && payload.channel_Id !== channelId) return;
        mutateMessages((prev) => {
          if (!prev) return prev;
          const index = prev?.findIndex((message) => message.$id === payload.$id);
          if (index !== undefined && index !== -1) {
            prev[index] = payload;
          }
          return [...(prev ?? [])];
        }, false);
      } else if (response.events.includes(`${Base_Event}.*.delete`)) {
        if (payload && payload.channel_Id !== channelId) return;
        mutateMessages((prev) => {
          if (!prev) return prev;
          const index = prev?.findIndex((message) => message.$id === payload.$id);
          if (index !== undefined && index !== -1) {
            prev.splice(index, 1);
          }
          return [...(prev ?? [])];
        }, false);
      }
    });
    // Closes the subscription.
    () => unsubscribe();
  }, []);

  return <ChatRoomView roomInfo={roomInfo} messages={messages} />;
}
