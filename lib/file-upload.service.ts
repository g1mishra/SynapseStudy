import { ID } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const { storage } = appwriteSDKProvider;

export async function uploadFileToBucket(file: File, bucketId: string) {
  const uploadedFile = await storage?.createFile(bucketId, ID.unique(), file);

  console.log("uploadedFile", uploadedFile);

  return uploadedFile;
}
