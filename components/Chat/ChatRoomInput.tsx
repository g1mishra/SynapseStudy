import { useCallback, useState } from "react";

interface ChatRoomInputProps {
  chatRoomId: string;
}

export default function ChatRoomInput(props: ChatRoomInputProps) {
  const { chatRoomId } = props;
  const [message, setMessage] = useState("");
  //   const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //   sendMessage({
      //     variables: {
      //       chatRoomId,
      //       message,
      //     },
      //   });
      setMessage("");
    },
    [chatRoomId, message]
    // [chatRoomId, message, sendMessage]
  );

  return (
    <form className="chat-room-input" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <SendIcon />
      </button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9L17 1L9 17L1 9Z" stroke="#4B5563" strokeWidth="2" />
    </svg>
  );
}
