import { ID } from "appwrite";
import appwriteSDKProvider from "./appwrite";

const { storage } = appwriteSDKProvider;
const bucketId = "647317f524fbb9334d1b";

export function uploadFile(file: File) {
  return storage?.createFile(bucketId, ID.unique(), file);
}
