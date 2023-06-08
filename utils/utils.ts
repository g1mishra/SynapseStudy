import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Server } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bucketFilePath = (bucketId: string, fileId: string) => {
  // https://cloud.appwrite.io/v1/storage/buckets/chat-files-bucket/files/648161f32e3bd2c0d146/view?project=646913b8565dcc7921b7

  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${Server.project}`;
};
