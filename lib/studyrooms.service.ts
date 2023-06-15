import {
  ChannelI,
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

export type GetStudyRoomsResponse = Models.DocumentList<StudyRoomModel>;

export interface GetStudyRoomResponse extends StudyRoomModel {
  // userLinks: UserLinksModel[];
  channels: ChannelModel[];
}

export async function getAllStudyRooms(userId: string, q?: string): Promise<Models.Document[]> {
  const query = [];
  if (q && q !== "") {
    query.push(Query.search("name", q));
  }
  const userLinks = await appwriteSDKProvider.database.listDocuments(
    Server.dbId,
    userLinksCollectionID,
    [Query.equal("user_id", userId)]
  );

  const studyRoomIds = userLinks.documents.map((room) => room.study_room_id);

  if (studyRoomIds.length === 0) {
    studyRoomIds.push("");
  }

  return (
    await appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, query)
  ).documents.filter((room) => !studyRoomIds.includes(room.$id));
}

export async function getStudyRoomByUserId(userId: string): Promise<GetStudyRoomsResponse> {
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
  // const [studyRoom, userLinks, channels] = await Promise.all([
  const [studyRoom, channels] = await Promise.all([
    appwriteSDKProvider.database.getDocument<StudyRoomModel>(
      Server.dbId,
      studyRoomsCollectionID,
      studyRoomId
    ),
    // appwriteSDKProvider.database.listDocuments<UserLinksModel>(Server.dbId, userLinksCollectionID, [
    //   Query.equal("study_room_id", studyRoomId),
    // ]),
    appwriteSDKProvider.database.listDocuments<ChannelModel>(
      Server.dbId,
      Server.channelsCollectionId,
      [Query.equal("study_room_id", studyRoomId)]
    ),
  ]);

  return {
    ...studyRoom,
    // userLinks: userLinks.documents,
    channels: channels.documents,
  };
}

export async function joinStudyRoom(payload: UserLinksI): Promise<UserLinksModel | any> {
  const { study_room_id: studyRoomId, user_id: userId, role = "user" } = payload;

  return await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    userLinksCollectionID,
    ID.unique(),
    {
      study_room_id: studyRoomId,
      user_id: userId,
      role: role,
    },
    [
      Permission.read(Role.any()),
      Permission.delete(Role.user(userId)),
      Permission.update(Role.user(userId)),
    ]
  );
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
  const { name, status, image_url, subject, userId } = payload;
  const studyRoom = await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    studyRoomsCollectionID,
    ID.unique(),
    {
      name,
      status,
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
  const { name, status, image_url, subject, $id: studyRoomId } = payload;
  const studyRoom = await appwriteSDKProvider.database.updateDocument(
    Server.dbId,
    studyRoomsCollectionID,
    studyRoomId,
    {
      name,
      status,
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

export const requestToJoinStudyRoom = async (userId: string, studyRoomId: string, message = "") => {
  return await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    Server.joinRequestsCollectionId,
    ID.unique(),
    {
      userId,
      studyRoomId,
      message,
      status: "pending",
    },
    [
      Permission.read(Role.any()),
      Permission.delete(Role.user(userId)),
      Permission.update(Role.users()),
    ]
  );
};

export const createChannel = async (
  payload: ChannelI & { userId: string }
): Promise<ChannelModel | any> => {
  const { userId, ...rest } = payload;
  return await appwriteSDKProvider.database.createDocument(
    Server.dbId,
    Server.channelsCollectionId,
    ID.unique(),
    {
      ...rest,
    },
    [
      Permission.read(Role.any()),
      Permission.delete(Role.user(userId)),
      Permission.update(Role.user(userId)),
    ]
  );
};

// export async function getStudyRoomIf(userId: string): Promise<GetStudyRoomsResponse> {
//   const userLinks = await appwriteSDKProvider.database.listDocuments(
//     Server.dbId,
//     userLinksCollectionID,
//     [Query.equal("user_id", userId)]
//   );

//   const studyRoomIds = userLinks.documents.map((room) => room.study_room_id);
//   if (studyRoomIds.length === 0) studyRoomIds.push("");

//   return appwriteSDKProvider.database.listDocuments(Server.dbId, studyRoomsCollectionID, [
//     Query.equal("$id", studyRoomIds),
//   ]);
// }

// export async function getJoinRequestByUsers(
//   userId: string
// ): Promise<Models.DocumentList<Models.Document>> {
//   const userLinks = await appwriteSDKProvider.database.listDocuments(
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

// }
