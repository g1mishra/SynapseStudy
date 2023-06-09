import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Server } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bucketFilePath = (bucketId: string, fileId: string) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${Server.project}`;
};

export const getFileType = (file: File) => {
  const fileType = file.type.split("/")[0];
  if (fileType === "image") {
    return "image";
  } else if (fileType === "video") {
    return "video";
  } else if (fileType === "audio") {
    return "audio";
  } else {
    return "file";
  }
};
