import client from "@/lib/appwrite.server";
import { Server } from "@/utils/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";
import { Databases, Query, Users } from "node-appwrite";

const users = new Users(client);
const database = new Databases(client);

// const userLinks = await appwriteSDKProvider.database.listDocuments(
//     Server.dbId,
//     userLinksCollectionID,
//     [Query.equal("user_id", userId), Query.equal("role", "owner")]
//   );

//   const studyRoomIds = userLinks.documents.map((room) => room.study_room_id);
//   if (studyRoomIds.length === 0) studyRoomIds.push("");

//   const joinRequests = await appwriteSDKProvider.database.listDocuments(Server.dbId, Server.joinRequestsCollectionId, [
//     Query.equal("studyRoomId", studyRoomIds),
//   ]);

//   const userIds = joinRequests.documents.map((request) => request.userId);

//   return appwriteSDKProvider.database.listDocuments(Server.dbId, Server.usersCollectionId, [

export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.searchParams.get("user_id") ?? "null";

  let json_response = {};

  try {
    const userLinks = await database.listDocuments(Server.dbId, Server.userLinksCollectionId, [
      Query.equal("user_id", user_id),
      Query.equal("role", "owner"),
    ]);

    const studyRoomIds = userLinks.documents.map((room: any) => room.study_room_id);
    if (studyRoomIds.length === 0) studyRoomIds.push("");

    const joinRequests = await database.listDocuments(
      Server.dbId,
      Server.joinRequestsCollectionId,
      [Query.equal("studyRoomId", studyRoomIds), Query.equal("status", "pending")]
    );

    const userIds: string[] = joinRequests.documents.map((request: any) => request.userId);
    if (userIds.length === 0) userIds.push("");
    const userList = await users.list([Query.equal("$id", userIds)]);

    const userListObj: any = {};
    userList.users.forEach((user: any) => {
      userListObj[user.$id] = user;
    });

    json_response = {
      status: "success",
      data: {
        userListObj: userListObj,
        joinRequests: joinRequests.documents,
      },
      message: "User found",
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    json_response = { status: "error", message: error.message };
  }
  return NextResponse.json(json_response);
}

export async function PATCH(request: Request) {
  const { joinRequestId, status, userId, studyRoomId } = await request.json();

  let json_response = {};

  try {
    await database.updateDocument(Server.dbId, Server.joinRequestsCollectionId, joinRequestId, {
      status: status,
    });

    if (status === "accepted") {
      await database.createDocument(Server.dbId, Server.userLinksCollectionId, ID.unique(), {
        user_id: userId,
        study_room_id: studyRoomId,
        role: "user",
      });
    }
    json_response = {
      status: "success",
      message: "Join request updated",
    };
  } catch (error: any) {
    json_response = { status: "error", message: error.message };
  }
  return NextResponse.json(json_response);
}
