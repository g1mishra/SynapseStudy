import client from "@/lib/appwrite.server";
import { UserLinksModel } from "@/types/study-room";
import { Server } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import { Databases, Models, Query, Users } from "node-appwrite";

const database = new Databases(client);
const users = new Users(client);

export async function GET(request: NextRequest) {
  const studyRoomId = request.nextUrl.searchParams.get("study_room_id") ?? "";
  let json_response = {};
  try {
    const userLinksResp: Models.DocumentList<UserLinksModel> = await database.listDocuments(
      Server.dbId,
      Server.userLinksCollectionId,
      [Query.equal("study_room_id", studyRoomId)]
    );

    const userLinkIds = userLinksResp.documents.map((user) => user.user_id);
    if (userLinkIds.length === 0) {
      userLinkIds.push("");
    }

    const participants = await users.list([Query.equal("$id", userLinkIds)]);

    json_response = {
      status: "success",
      data: participants?.users ?? [],
    };
  } catch (error: any) {
    json_response = {
      status: "error",
      error: error.code,
      message: error.message,
    };
  }
  return NextResponse.json(json_response);
}
