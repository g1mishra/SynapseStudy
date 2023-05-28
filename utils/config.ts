export const Server = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "",
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "",
  dbId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID ?? "",
};
