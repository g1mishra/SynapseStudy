import Image from "next/image";
import { ChatRoom } from "./chat";

interface ChatRoomHeaderProps {
  chatRoom: ChatRoom;
}

export function ChatRoomHeader(props: ChatRoomHeaderProps) {
  const { chatRoom } = props;

  return (
    <div className="">
      <Image src={chatRoom.image} alt={chatRoom.name} width={50} height={50} />
      <div className="">{chatRoom.name}</div>
      <div className="">{chatRoom.description}</div>
    </div>
  );
}
