import ChannelSidebar from "../ChannelSidebar";

interface StudyRoomsLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function StudyRoomsLayout({ children, params }: StudyRoomsLayoutProps) {
  const { id } = params;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row overflow-hidden">
        <ChannelSidebar studyRoomId={id} />
        <div className="w-full flex flex-col p-8 h-screen overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
