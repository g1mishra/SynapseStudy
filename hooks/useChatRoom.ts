import { getChatRoomInfo } from "@/lib/chatrooms.service";
import useSWR from "swr";

export default function useChatRoomInfo(chatRoomId: string) {
  const { data: chatRoom, error } = useSWR(`/chat-rooms/${chatRoomId}`, getChatRoomInfo, {
    onError: (error: any) => {
      console.error("Failed to fetch chat rooms:", error);
    },
    revalidateOnFocus: false, // Disable revalidation on focus to prevent unnecessary fetches
    shouldRetryOnError: false, // Disable retrying on error to prevent infinite loop
  });

  const loading = !chatRoom && !error;

  return { chatRoom, loading, error };
}
