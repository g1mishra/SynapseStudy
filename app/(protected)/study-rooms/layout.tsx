import StudyRoomSidebar from "./StudyRoomSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row overflow-hidden">
        <div className="flex flex-col shrink-0 min-w-[350px] w-1/6 h-screen overflow-hidden bg-black-tertiary ">
          <StudyRoomSidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
