const isDev = process.env.NODE_ENV === "development";

export const Server = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  dbId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID ?? "",

  // collections
  roomsCollectionId: process.env.NEXT_PUBLIC_ROOMS_COLLECTION_ID ?? "",
  userLinksCollectionId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID ?? "",
  channelsCollectionId: process.env.NEXT_PUBLIC_CHANNEL_COLLECTION_ID ?? "",
  messagesCollectionId: process.env.NEXT_PUBLIC_MESSAGES_COLLECTION_ID ?? "",
  joinRequestsCollectionId: process.env.NEXT_PUBLIC_JOIN_REQUESTS_COLLECTION_ID ?? "",
  meetingsCollecctionId: process.env.NEXT_PUBLIC_MEETINGS_COLLECTION_ID ?? "",
  whiteboardsCollectionId: process.env.NEXT_PUBLIC_WHITEBOARD_COLLECTION_ID ?? "",

  // secret keys
  documentReadKey: process.env.APPWRITE_DOCUMENT_READ_KEY ?? "",

  allowedOrigin: isDev ? process.env.ALLOWED_ORIGIN_DEV : process.env.ALLOWED_ORIGIN_PROD,
};
