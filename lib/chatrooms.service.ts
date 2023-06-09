import { Server } from "@/utils/config";
import appwriteSDKProvider from "./appwrite.client";
import { ChatChannel, ChatMessage, ChatMessageI } from "@/types/chat";
import { ID, Permission, Query, Role } from "appwrite";

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

export async function createChatDocument(
  payload: ChatMessageI & { senderId: string },
  uniqueId = ID.unique()
) {
  const { senderId, ...rest } = payload;
  return await database.createDocument<ChatMessage>(
    Server.dbId,
    Server.messagesCollectionId,
    uniqueId,
    {
      ...rest,
    },
    [Permission.write(Role.user(senderId)), Permission.read(Role.any())]
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
