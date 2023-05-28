import { Server } from "@/utils/config";
import appwriteSDKProvider from "./appwrite";

const { database } = appwriteSDKProvider;

export function getChatRoomInfo(chatRoomId: string) {
  return database.getDocument(Server.dbId, "chat-rooms", chatRoomId);
}
