import { Server } from "@/utils/config";
import { ID, Permission, Role } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const { database } = appwriteSDKProvider;

interface Design {
  name: string;
  user_id: string;
  data: string;
  public?: boolean;
}

export async function createWhiteboardDesign(payload: Design) {
  return await database.createDocument<any>(
    Server.dbId,
    Server.whiteboardsCollectionId,
    ID.unique(),
    {
      ...payload,
    },
    [Permission.write(Role.user(payload.user_id)), Permission.read(Role.any())]
  );
}

export async function updateWhiteboardDesign(payload: Partial<Design>, id: string) {
  if (payload.public) {
  }

  return await database.updateDocument<any>(
    Server.dbId,
    Server.whiteboardsCollectionId,
    id,
    {
      ...payload,
    }
    // [
    //     Permission.write(Role.user(payload.user_id))
    // ]
  );
}

export async function getWhiteboardDesign(id: string) {
  return await database.getDocument(Server.dbId, Server.whiteboardsCollectionId, id);
}
