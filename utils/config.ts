export const Server = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  dbId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID ?? "",

  // collections
  roomsCollectionId: process.env.APPWRITE_ROOMS_COLLECTION_ID ?? "",
  userLinksCollectionId: process.env.APPWRITE_USER_LINKS_COLLECTION_ID ?? "",

  // secret keys
  documentReadKey: process.env.APPWRITE_DOCUMENT_READ_KEY ?? "",
};
