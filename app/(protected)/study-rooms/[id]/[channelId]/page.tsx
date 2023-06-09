"use client";

import { getChannelInfo } from "@/lib/chatrooms.service";
import useSwr from "swr";
import ChannelChat from "./ChannelChat";
import { useAuth } from "@/hooks/useAuth";

export default function ChatPage({ params }: { params: { channelId: string } }) {
  const { channelId } = params;
  const {} = useAuth();
  const { data, error, isLoading } = useSwr(
    channelId ? `/chatrooms/${channelId}` : null,
    async (_) => await getChannelInfo(channelId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error || !data?.$id) {
    return (
      <div>
        <h1>Oops - this chat room doesn't exist!</h1>
      </div>
    );
  }

  return <ChannelChat roomInfo={data} />;
}
