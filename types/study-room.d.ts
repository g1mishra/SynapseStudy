import { Models } from "node-appwrite";

export interface StudyRoomModel extends Models.Document {
  $id: string;
  name: string;
  description: string;
  image_url: string;
  subject: string;
}

export interface UserLinksModel extends Models.Document {
  $id: string;
  user_id: string;
  study_room_id: string;
}
