import { getChatMessagesByChannelId } from "@/lib/chatrooms.service";
import { ChatMessage } from "@/types/chat";
import { useEffect, useState } from "react";

export function useChatMessages(channelId: string) {
  const [messages, mutateMessages] = useState<ChatMessage[]>([]);
  const [lastId, setLastId] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (channelId) {
        const data = await getChatMessagesByChannelId(channelId, lastId);
        if (data.length > 0) {
          mutateMessages((prevMessages) => [...prevMessages, ...data]);
        }
        setIsLoadingMore(false);
      }
    };

    fetchChatMessages();
  }, [channelId, lastId]);

  const loadMoreMessages = (lastId: string) => {
    if (!isLoadingMore && lastId) {
      setIsLoadingMore(true);
      setLastId(lastId);
    }
  };

  return { messages, loadMoreMessages, isLoadingMore, mutateMessages };
}
