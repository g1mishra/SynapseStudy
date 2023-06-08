import { ID, Permission, UploadProgress, Role } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const { storage } = appwriteSDKProvider;

export async function uploadFileToBucket(
  senderId: string,
  file: File,
  bucketId: string,
  onProgress?: (progress: UploadProgress) => void
) {
  const uploadedFile = await storage?.createFile(
    bucketId,
    ID.unique(),
    file,
    [Permission.write(Role.user(senderId)), Permission.read(Role.any())],
    onProgress
  );

  // console.log("uploadedFile", uploadedFile);

  return uploadedFile;
}
