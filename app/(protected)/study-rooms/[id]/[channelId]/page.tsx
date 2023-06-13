"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import useParticipants from "@/hooks/useParticipants";
import { getChannelInfo } from "@/lib/chatrooms.service";
import useSwr from "swr";
import ChannelChat from "./ChannelChat";

export default function ChatPage({ params }: { params: { channelId: string } }) {
  const { channelId } = params;
  const {} = useAuth();
  const { isLoading: loading } = useParticipants(channelId);

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
      <div>
        <h1>Oops - this chat room doesn't exist!</h1>
      </div>
    );
  }

  return <ChannelChat roomInfo={data} />;
}
