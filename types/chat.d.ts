import { Models } from "appwrite";

export type ChatChannel = Models.Document & {
  $id: string;
  name: string;
  description: string;
  image?: string;
};

export interface ChatMessageI {
  content: string;
  message_type: string;
  status?: string;
  sender_id: string;
  receiver_id?: string;
  channel_Id?: string;
}

export type ChatMessage = Models.Document &
  ChatMessageI & {
    $id?: string;
    $createdAt?: string;
    $updatedAt?: string;
  };
