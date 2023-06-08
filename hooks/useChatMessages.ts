import { getChatMessagesByChannelId } from "@/lib/chatrooms.service";
import useSWR from "swr";

export function useChatMessages(channelId: string) {
  const { data: messages, mutate: mutateMessages } = useSWR(
    channelId ? `/chatrooms/${channelId}/messages` : null,
    async (_) => await getChatMessagesByChannelId(channelId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return { messages, mutateMessages };
}
