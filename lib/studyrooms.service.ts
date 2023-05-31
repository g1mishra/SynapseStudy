import { StudyRoomI, StudyRoomModel, UserLinksI, UserLinksModel } from "@/types/study-room";
import { Server } from "@/utils/config";
import { ID, Models, Permission, Query, Role } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const studyRoomsCollectionID = "646dcbc3c72be67e1267";
const userLinksCollectionID = "646dcbd31368a4a94979";

/* 
  Rules for defining functions
  
  1.) only get functions will be defined with array of params including url and query params. 
  Because these functions will be used with useSWR and useSWR will pass url and query params as array
  
  2.) other functions will be defined with payload as params

*/

export async function getAllStudyRooms(): Promise<Models.DocumentList<StudyRoomModel>> {
  return await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID);
}

export async function getUserJoinedStudyRooms([_url, userId]: [string, string]): Promise<Models.DocumentList<StudyRoomModel>> {
  const userJoinedStudyRooms = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userJoinedStudyRooms.documents.map((room) => room.study_room_id);

  if (studyRoomIds.length === 0) {
    return { documents: [], total: 0 };
  }

  const userJoinedStudyRoomDetails: Models.DocumentList<StudyRoomModel> =
    await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
      Query.equal("$id", studyRoomIds),
    ]);

  return userJoinedStudyRoomDetails;
}

export async function getUnjoinedStudyRooms([_url, userId]: [string, string]): Promise<Models.DocumentList<StudyRoomModel>> {
  const userJoinedStudyRooms = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userJoinedStudyRooms.documents.map((room) => room.study_room_id);

  if (studyRoomIds.length === 0) {
    return getAllStudyRooms();
  }

  const unjoinedStudyRoomDetails: Models.DocumentList<StudyRoomModel> =
    await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
      Query.notEqual("$id", studyRoomIds),
    ]);

  return unjoinedStudyRoomDetails;
}

export async function getStudyRoom([_url, studyRoomId]: [string, string]): Promise<StudyRoomModel> {
  return await appwriteSDKProvider.database.getDocument(Server.dbId, studyRoomsCollectionID, studyRoomId);
}



export async function joinStudyRoom(payload: UserLinksI): Promise<UserLinksModel | any> {
  
  const { study_room_id: studyRoomId, user_id: userId, role = "user" } = payload;

  const userLink = await appwriteSDKProvider.database.createDocument(Server.dbId, userLinksCollectionID, ID.unique(), {
    study_room_id: studyRoomId,
    user_id: userId,
    role: role,
  });

  return userLink;
}

export async function leaveStudyRoom(studyRoomId : string, userId : string): Promise<any> {
  const userLink = await appwriteSDKProvider.database.listDocuments(Server.dbId, userLinksCollectionID, [
    Query.equal("study_room_id", studyRoomId),
    Query.equal("user_id", userId),
  ]);

  if (userLink.documents.length === 0) {
    throw new Error("User not found in study room");
  }

  const userLinkId = userLink.documents[0].$id;

  return await appwriteSDKProvider.database.deleteDocument(Server.dbId, userLinksCollectionID, userLinkId);
}

export async function createStudyRoom(userId  :string, payload: StudyRoomI): Promise<StudyRoomModel | any> {
  const { name, description, image_url, subject } = payload;
  const studyRoom = await appwriteSDKProvider.database.createDocument(Server.dbId, studyRoomsCollectionID, ID.unique(), {
    name,
    description,
    image_url: image_url,
    subject,
  },
  [
    Permission.delete(Role.user(userId)),
    Permission.update(Role.user(userId)),
  ]
  );

  await joinStudyRoom({ study_room_id: studyRoom.$id, user_id: userId, role: "owner" });

  return studyRoom;
}

export async function updateStudyRoom(payload: StudyRoomModel): Promise<StudyRoomModel | any> {
  const { name, description, image_url, subject,$id :studyRoomId  } = payload;
  const studyRoom = await appwriteSDKProvider.database.updateDocument(Server.dbId, studyRoomsCollectionID, studyRoomId, {
    name,
    description,
    image_url,
    subject,
  });

  return studyRoom;
}

export async function deleteStudyRoom(studyRoomId: string): Promise<any> {
  const userLinks = await appwriteSDKProvider.database.listDocuments(Server.dbId, userLinksCollectionID, [
    Query.equal("study_room_id", studyRoomId),
  ]);

  // need to check deleteAll at once
  userLinks.documents.forEach(async (userLink) => await appwriteSDKProvider.database.deleteDocument(Server.dbId, userLinksCollectionID, userLink.$id));

  return await appwriteSDKProvider.database.deleteDocument(Server.dbId, studyRoomsCollectionID, studyRoomId);
}