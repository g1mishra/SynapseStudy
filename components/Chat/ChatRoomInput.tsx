"use client";

import { useAuth } from "@/hooks/useAuth";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useProgressBar } from "@/hooks/useProgressBar";
import { createChatDocument } from "@/lib/chatrooms.service";
import { uploadFileToBucket } from "@/lib/file-upload.service";
import { getFileType } from "@/utils/utils";
import { ID, UploadProgress } from "appwrite";
import { useCallback, useState } from "react";
import { KeyedMutator } from "swr";
import FileInputPreview from "./FileInputPreview";

interface ChatRoomInputProps {
  channelId: string;
}

export default function ChatRoomInput(props: ChatRoomInputProps) {
  const { channelId: channel_Id } = props;
  const { mutateMessages } = useChatMessages(channel_Id);
  const { mutateProgress } = useProgressBar<UploadProgress>("chat-sending");

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null); // Track the selected file
  const { currentUser } = useAuth();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const uniqueId = ID.unique();
      const sender_id = currentUser?.$id;
      let messageType = "text";
      let content = message; // Store the text message in the content

      // Prepare the chat message data
      let chatMessage: any = {
        content,
        channel_Id,
        message_type: messageType, // Update the message type
        sender_id,
        status: "pending",
      };

      if (file) {
        chatMessage["status"] = "sending";
        chatMessage["$id"] = uniqueId;
        chatMessage["content"] = JSON.stringify({
          url: URL.createObjectURL(file),
          fileName: file.name,
          message,
        });

        // temperory update the UI
        mutateMessages((prev) => [...(prev ?? []), chatMessage], false);
        setMessage("");
        setFile(null);

        uploadAndCreateChatDocument(
          sender_id,
          file,
          chatMessage,
          message,
          mutateProgress,
          uniqueId
        );
        return;
      }
      chatMessage["status"] = "sent";
      await createChatDocument(chatMessage);
      setMessage("");
      setFile(null);
    },
    [channel_Id, message, file, currentUser]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClearFilePreview = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <form className="flex items-center justify-between text-white" onSubmit={handleSendMessage}>
      <div className="relative flex-1">
        <FileInputPreview file={file} handleClearFilePreview={handleClearFilePreview} />
        <input
          type="text"
          className="w-full outline-none bg-transparent text-white placeholder-gray-400 pr-20"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex w-20 justify-between items-center">
        <label htmlFor="file-upload" className="file-upload-button">
          <input
            className="hidden"
            id="file-upload"
            type="file"
            accept="image/*, video/*, audio/*, .pdf, .doc, .xls"
            onChange={handleFileChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </label>
        <button type="submit" className="">
          <SendIcon />
        </button>
      </div>
    </form>
  );
}

const SendIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9L17 1L9 17L1 9Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

const uploadAndCreateChatDocument = async (
  sender_id: string,
  file: File,
  payload: any,
  message: string,
  mutateProgress: KeyedMutator<UploadProgress>,
  uniqueId: string
) => {
  try {
    // Determine the message type based on the file extension
    payload["message_type"] = getFileType(file);
    // Upload the file to the bucket and get the URL
    const fileObj = await uploadFileToBucket(sender_id, file, "chat-files-bucket", (progress) => {
      mutateProgress(progress);
    });
    payload["content"] = JSON.stringify({
      url: fileObj?.$id,
      fileName: fileObj?.name,
      message,
    });
    payload["status"] = "sent";
    delete payload["$id"];
    // Create the chat document
    await createChatDocument(payload, uniqueId);
  } catch (err) {
    console.error(err);
  }
};
