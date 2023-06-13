"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { getChannelInfo } from "@/lib/chatrooms.service";
import useSwr from "swr";
import ChannelChat from "./ChannelChat";

export default function ChatPage({ params }: { params: { id: string; channelId: string } }) {
  const { channelId } = params;
  const { loading } = useAuth();

  const { data, error, isLoading } = useSwr(
    channelId ? `/chatrooms/${channelId}` : null,
    async (_) => await getChannelInfo(channelId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  if (error || !data?.$id) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <h1>Oops - this chat room doesn't exist!</h1>
      </div>
    );
  }

  return <ChannelChat roomInfo={data} />;
}
