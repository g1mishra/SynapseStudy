"use client";

import { useAuth } from "@/hooks/useAuth";
import { createChatDocument } from "@/lib/chatrooms.service";
import { uploadFileToBucket } from "@/lib/file-upload.service";
import { useCallback, useState } from "react";
import FileInputPreview from "./FileInputPreview";

interface ChatRoomInputProps {
  chatRoomId: string;
}

export default function ChatRoomInput(props: ChatRoomInputProps) {
  const { chatRoomId } = props;
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null); // Track the selected file
  const { currentUser } = useAuth();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Sending message...");

      const sender = JSON.stringify({
        $id: currentUser?.$id,
        name: currentUser?.name,
        image: currentUser?.image,
      });

      // Determine the message type based on the file extension
      let messageType = "text";
      let content = message; // Store the text message in the content

      if (file) {
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          messageType = "image";
        } else if (fileType === "video") {
          messageType = "video";
        } else if (fileType === "audio") {
          messageType = "audio";
        } else {
          messageType = "file";
        }

        // Upload the file to the bucket and get the URL
        try {
          const fileObj = await uploadFileToBucket(file, "chat-files-bucket");
          content = JSON.stringify({
            url: fileObj?.$id,
            fileName: fileObj?.name,
            message,
          });
        } catch (err) {
          console.error(err);
        }
      }

      // Prepare the chat message data
      const chatMessage = {
        content,
        channel_Id: chatRoomId,
        message_type: messageType, // Update the message type
        sender,
        senderId: currentUser?.$id,
        status: "sent",
      };

      await createChatDocument(chatMessage);

      setMessage("");
      setFile(null); // Reset the file input
    },
    [chatRoomId, message, file, currentUser]
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
    <form className="flex items-center justify-between" onSubmit={handleSendMessage}>
      <div className="relative flex-1">
        <FileInputPreview file={file} handleClearFilePreview={handleClearFilePreview} />
        <input
          type="text"
          className="w-full outline-none "
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

