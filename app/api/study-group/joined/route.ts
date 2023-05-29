import client from "@/lib/appwrite.server";
import { StudyRoomModel, UserLinksModel } from "@/types/study-room";
import { Server } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";
import { Databases, Models, Query } from "node-appwrite";

const database = new Databases(client);

export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.searchParams.get("user_id") ?? "";
  //   const page_str = request.nextUrl.searchParams.get("page");
  //   const limit_str = request.nextUrl.searchParams.get("limit");

  //   const page = page_str ? parseInt(page_str, 10) : 1;
  //   const limit = limit_str ? parseInt(limit_str, 10) : 10;
  //   const skip = (page - 1) * limit;

  const userJoinedStudyRooms: Models.DocumentList<UserLinksModel> = await database.listDocuments(
    Server.dbId,
    Server.userLinksCollectionId,
    [Query.equal("user_id", user_id)]
  );

  const studyRoomIds = userJoinedStudyRooms.documents.map((room) => room.study_room_id);

  if (studyRoomIds.length === 0) {
    studyRoomIds.push("");
  }

  const userJoinedStudyRoomDetails: Models.DocumentList<StudyRoomModel> =
    await database.listDocuments(Server.dbId, Server.roomsCollectionId, [
      Query.equal("$id", studyRoomIds),
    ]);

  let json_response = {
    status: "success",
    results: userJoinedStudyRooms.total,
    data: userJoinedStudyRoomDetails.documents,
  };
  return NextResponse.json(json_response);
}
