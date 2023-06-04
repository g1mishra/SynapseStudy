import { ChatRoomView } from "@/components/Chat/ChatRoomView";

const chatRooms = [
  {
    id: "647341c83675ca19faa2",
    name: "Chat Room 1",
    description: "This is a chat room channel",
    messages: [
      {
        id: "1",
        content: "Hello",
        createdAt: "2021-07-22T00:00:00Z",
        senderId: "646b3810e4dc3d0fa6eb",
      },
      {
        id: "2",
        content: "Hi",
        createdAt: "2021-07-22T00:00:00Z",
        senderId: "",
      },
    ],
  },
  {
    id: "647341e869b8a9aeab17",
    name: "Chat Room 2",
    description: "This is a chat room channel",
    messages: [
      {
        id: "3",
        content: "Hello",
        createdAt: "2021-07-22T00:00:00Z",
        senderId: "646b3810e4dc3d0fa6eb",
      },
      {
        id: "4",
        content: "Hi",
        createdAt: "2021-07-22T00:00:00Z",
        senderId: "",
      },
    ],
  },
];

export default function ChatPage({ params }: { params: { channelId: string } }) {
  const { channelId } = params;

  const chatRoom = chatRooms.find((chatRoom) => chatRoom.id === channelId);

  if (!chatRoom) {
    return <div>Chat room not found</div>;
  }

  return <ChatRoomView chatRoom={chatRoom} />;
}
