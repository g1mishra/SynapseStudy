import { Server } from "@/utils/config";
import appwriteSDKProvider from "./appwrite.client";

const { database } = appwriteSDKProvider;

// export function getChatRoomInfo(chatRoomId: string) {
//   return database.getDocument(Server.dbId, Server.channelsCollectionId, chatRoomId);
// }
