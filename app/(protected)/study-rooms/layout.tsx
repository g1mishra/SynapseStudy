import StudyRoomSidebar from "./StudyRoomSidebar";
import { cn } from "@/utils/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row overflow-hidden">
        <div
          className={cn(
            "hidden test123 md:flex flex-col shrink-0 sm:w-full min-w-[350px] w-full md:w-1/6 h-screen overflow-hidden bg-black-tertiary"
          )}
        >
          <StudyRoomSidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
