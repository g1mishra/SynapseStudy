import {
  ChannelModel,
  StudyRoomI,
  StudyRoomModel,
  UserLinksI,
  UserLinksModel,
} from "@/types/study-room";
import { Server } from "@/utils/config";
import { ID, Models, Permission, Query, Role } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const studyRoomsCollectionID = Server.roomsCollectionId;
const userLinksCollectionID = Server.userLinksCollectionId;

export interface GetStudyRoomsResponse {
  joinedStudyRooms: StudyRoomModel[];
  restStudyRooms: StudyRoomModel[];
  total: number;
}

export interface GetStudyRoomResponse extends StudyRoomModel {
  // userLinks: UserLinksModel[];
  channels: ChannelModel[];
}

export async function getAllStudyRooms(userId: string): Promise<GetStudyRoomsResponse> {
  try {
    const userLinks = await appwriteSDKProvider.database.listDocuments(
      Server.dbId,
      userLinksCollectionID,
      [Query.equal("user_id", userId)]
    );

    const studyRoomIds = userLinks.documents.map((room) => room.study_room_id);

    if (studyRoomIds.length === 0) {
      studyRoomIds.push("");
    }

    const joinedStudyRooms: Models.DocumentList<StudyRoomModel> =
      await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
        Query.equal("$id", studyRoomIds),
      ]);

    const restStudyRooms: Models.DocumentList<StudyRoomModel> =
      await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
        Query.notEqual("$id", studyRoomIds),
      ]);

    return {
      joinedStudyRooms: joinedStudyRooms.documents,
      restStudyRooms: restStudyRooms.documents,
      total: joinedStudyRooms.total + restStudyRooms.total,
    };
  } catch (error) {
    console.log(error);
    return { joinedStudyRooms: [], restStudyRooms: [], total: 0 };
  }
}

export async function getStudyRoomByUserId(
  userId: string
): Promise<Models.DocumentList<StudyRoomModel>> {
  const userLinks = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userLinks.documents.map((room) => room.study_room_id);
  if (studyRoomIds.length === 0) studyRoomIds.push("");

  return appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
    Query.equal("$id", studyRoomIds),
  ]);
}

export async function getStudyRoomById(studyRoomId: string): Promise<GetStudyRoomResponse> {
  const studyRoom = await appwriteSDKProvider.database.getDocument<StudyRoomModel>(
    Server.dbId,
    studyRoomsCollectionID,
    studyRoomId
  );
  // const userLinks = await appwriteSDKProvider.database.listDocuments(Server.dbId, userLinksCollectionID, [
  //   Query.equal("study_room_id", studyRoomId),
  // ]);
  const channel = await appwriteSDKProvider.database.listDocuments<ChannelModel>(
    Server.dbId,
    Server.channelsCollectionId,
    [Query.equal("study_room_id", studyRoomId)]
  );
  return {
    ...studyRoom,
    // userLinks: userLinks.documents,
    channels: channel.documents,
  };
}

export async function joinStudyRoom(payload: UserLinksI): Promise<UserLinksModel | any> {
  const { study_room_id: studyRoomId, user_id: userId, role = "user" } = payload;

  const userLink = await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    userLinksCollectionID,
    ID.unique(),
    {
      study_room_id: studyRoomId,
      user_id: userId,
      role: role,
    }
  );

  return userLink;
}

export async function leaveStudyRoom(studyRoomId: string, userId: string): Promise<any> {
  const userLink = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("study_room_id", studyRoomId), Query.equal("user_id", userId)]
  );

  if (userLink.documents.length === 0) {
    throw new Error("User not found in study room");
  }

  const userLinkId = userLink.documents[0].$id;

  return await appwriteSDKProvider.database.deleteDocument(
    Server.dbId,
    userLinksCollectionID,
    userLinkId
  );
}

export async function createStudyRoom(
  payload: StudyRoomI & { userId: string }
): Promise<StudyRoomModel | any> {
  const { name, description, image_url, subject, userId } = payload;
  const studyRoom = await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    studyRoomsCollectionID,
    ID.unique(),
    {
      name,
      description,
      image_url: image_url,
      subject,
    },
    [
      Permission.read(Role.any()),
      Permission.delete(Role.user(userId)),
      Permission.update(Role.user(userId)),
    ]
  );

  await joinStudyRoom({ study_room_id: studyRoom.$id, user_id: userId, role: "owner" });

  return studyRoom;
}

export async function updateStudyRoom(payload: StudyRoomModel): Promise<StudyRoomModel | any> {
  const { name, description, image_url, subject, $id: studyRoomId } = payload;
  const studyRoom = await appwriteSDKProvider.database.updateDocument(
    Server.dbId,
    studyRoomsCollectionID,
    studyRoomId,
    {
      name,
      description,
      image_url,
      subject,
    }
  );

  return studyRoom;
}

export async function deleteStudyRoom(studyRoomId: string): Promise<any> {
  const userLinks = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("study_room_id", studyRoomId)]
  );

  // need to check deleteAll at once
  userLinks.documents.forEach(
    async (userLink) =>
      await appwriteSDKProvider.database.deleteDocument(
        Server.dbId,
        userLinksCollectionID,
        userLink.$id
      )
  );

  return await appwriteSDKProvider.database.deleteDocument(
    Server.dbId,
    studyRoomsCollectionID,
    studyRoomId
  );
}
