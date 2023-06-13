import { ChatChannel, ChatMessage, ChatMessageI } from "@/types/chat";
import { Server } from "@/utils/config";
import { ID, Permission, Query, Role } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const { database } = appwriteSDKProvider;

export const getChannelInfo = async (channelId: string) => {
  const channelInfo = await database.getDocument<ChatChannel>(
    Server.dbId,
    Server.channelsCollectionId,
    channelId
  );

  return channelInfo;
};

export async function getChatMessagesByChannelId(channelId: string) {
  const { documents } = await database.listDocuments<ChatMessage>(
    Server.dbId,
    Server.messagesCollectionId,
    [Query.equal("channel_Id", channelId), Query.orderAsc("$updatedAt")]
  );

  return documents;
}

export async function createChatDocument(payload: ChatMessageI, uniqueId = ID.unique()) {
  return await database.createDocument<ChatMessage>(
    Server.dbId,
    Server.messagesCollectionId,
    uniqueId,
    {
      ...payload,
    },
    [Permission.write(Role.user(payload.sender_id)), Permission.read(Role.any())]
  );
}

export async function updateChatDocument(payload: Partial<ChatMessageI>, uniqueId: string) {
  return await database.updateDocument<ChatMessage>(
    Server.dbId,
    Server.messagesCollectionId,
    uniqueId,
    payload
  );
}
