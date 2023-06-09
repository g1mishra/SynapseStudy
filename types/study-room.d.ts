import { Models } from "node-appwrite";

export interface StudyRoomI {
  name: string;
  description: string;
  image_url?: string;
  subject: string;
}

export interface StudyRoomModel extends Models.Document, StudyRoomI {
  $id: string;
}

interface UserLinksI {
  user_id: string;
  study_room_id: string;
  role: "owner" | "admin" | "user";
}

export interface UserLinksModel extends Models.Document, UserLinksI {
  $id: string;
}

export interface ChannelI {
  name: string;
  study_room_id: string;
}

export interface ChannelModel extends Models.Document, ChannelI {
  $id: string;
}
