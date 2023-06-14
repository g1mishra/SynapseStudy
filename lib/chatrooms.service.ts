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
interface VideoChat {
  name: string;
  subject: string;
  status: "active" | "inactive" | "ended";
  user_id: string;
  study_room_id: string;
}

export async function createVideoChat(payload: VideoChat) {
  return await database.createDocument<any>(
    Server.dbId,
    Server.meetingsCollecctionId,
    ID.unique(),
    {
      ...payload,
    },
    [Permission.write(Role.user(payload.user_id)), Permission.read(Role.any())]
  );
}

export async function updateVideoChatById(id: string, payload: Partial<VideoChat>) {
  return await database.updateDocument(Server.dbId, Server.meetingsCollecctionId, id, {
    ...payload,
  });
}

export async function getVideoChatById(id: string) {
  return await database.getDocument(Server.dbId, Server.meetingsCollecctionId, id, [
    Query.notEqual("status", "ended"),
  ]);
}

export async function getVideoChatByStudyRoomId(study_room_id: string) {
  return await database.listDocuments(Server.dbId, Server.meetingsCollecctionId, [
    Query.equal("study_room_id", study_room_id),
    Query.notEqual("status", "ended"),
  ]);
}
