import { useParams } from "next/navigation";
import StudyRoomSidebar from "./study-rooms/StudyRoomSidebar";
import ChannelSidebar from "./study-rooms/ChannelSidebar";

interface Props {
  sidebarLevel: number;
  setSidebarLevel: (level: number) => void;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderSidebar = ({ sidebarLevel, setSidebarLevel, setOpenMenu }: Props) => {
  const params = useParams();

  switch (sidebarLevel) {
    case 0:
      return (
        <StudyRoomSidebar
          handleClick={(value?: number) => {
            if (value) {
              setSidebarLevel(value);
              setOpenMenu(false);
            } else setSidebarLevel(1);
          }}
        />
      );
    case 1:
      return (
        <ChannelSidebar
          studyRoomId={params?.id}
          handleClick={() => setSidebarLevel(0)}
          onLinkClick={() => {
            setOpenMenu((prev) => !prev);
          }}
        />
      );
    default:
      return null;
  }
};

export default RenderSidebar;
