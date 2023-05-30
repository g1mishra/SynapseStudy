import { Server } from "@/utils/config";
import appwriteSDKProvider from "./appwrite.client";
import { Models, Query } from "appwrite";
import { StudyRoomModel } from "@/types/study-room";

const studyRoomsCollectionID = "646dcbc3c72be67e1267";
const userLinksCollectionID = "646dcbd31368a4a94979";

export async function getAllStudyRooms(): Promise<
  Models.DocumentList<StudyRoomModel>
> {
  return await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    studyRoomsCollectionID
  );
}

export async function getUserJoinedStudyRooms([_url, userId]: [
  string,
  string
]): Promise<Models.DocumentList<StudyRoomModel>> {
  const userJoinedStudyRooms = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userJoinedStudyRooms.documents.map(
    (room) => room.study_room_id
  );

  if (studyRoomIds.length === 0) {
    return { documents: [], total: 0 };
  }

  const userJoinedStudyRoomDetails: Models.DocumentList<StudyRoomModel> =
    await appwriteSDKProvider.database.listDocuments(
      Server.dbId,
      studyRoomsCollectionID,
      [Query.equal("$id", studyRoomIds)]
    );

  return userJoinedStudyRoomDetails;
}

export async function getUnjoinedStudyRooms([_url, userId]: [
  string,
  string
]): Promise<Models.DocumentList<StudyRoomModel>> {
  const userJoinedStudyRooms = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userJoinedStudyRooms.documents.map(
    (room) => room.study_room_id
  );

  if (studyRoomIds.length === 0) {
    return getAllStudyRooms();
  }

  const unjoinedStudyRoomDetails: Models.DocumentList<StudyRoomModel> =
    await appwriteSDKProvider.database.listDocuments(
      Server.dbId,
      studyRoomsCollectionID,
      [Query.notEqual("$id", studyRoomIds)]
    );

  return unjoinedStudyRoomDetails;
}
