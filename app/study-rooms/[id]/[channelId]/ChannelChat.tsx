"use client";

import { ChatRoomView } from "@/components/Chat/ChatRoomView";
import appwriteSDKProvider from "@/lib/appwrite.client";
import { getChatMessagesByChannelId } from "@/lib/chatrooms.service";
import { ChatChannel } from "@/types/chat";
import { Server } from "@/utils/config";
import { useEffect } from "react";
import useSwr from "swr";

export default function ChannelChat({ roomInfo }: { roomInfo: ChatChannel }) {
  const channelId = roomInfo?.$id;
  const { data: messages, mutate: mutateMessages } = useSwr(
    channelId ? `/chatrooms/${channelId}/messages` : null,
    async (_) => await getChatMessagesByChannelId(channelId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    const unsubscribe = appwriteSDKProvider.client.subscribe(
      `databases.${Server.dbId}.collections.${Server.messagesCollectionId}.documents`,
      (response) => {
        const payload: any = response?.payload;
        if (payload && payload.channel_Id === channelId) {
          mutateMessages((prev) => [...(prev ?? []), payload], false);
        }
        // console.log(response);
      }
    );
    // Closes the subscription.
    () => unsubscribe();
  }, []);

  return <ChatRoomView roomInfo={roomInfo} messages={messages} />;
}
