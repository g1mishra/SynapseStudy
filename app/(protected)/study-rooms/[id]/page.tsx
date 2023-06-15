"use client";

import Loading from "@/components/Loading";
import CreateChannelModal from "@/components/Modal/CreateChannelModal";
import SquareCard from "@/components/SquareCard";
import { useAuth } from "@/hooks/useAuth";
import useParticipants from "@/hooks/useParticipants";
import useStudyRoomDetailsById from "@/hooks/useStudyRoomDetailsById";
import { getVideoChatByStudyRoomId } from "@/lib/chatrooms.service";
import { createChannel, leaveStudyRoom } from "@/lib/studyrooms.service";
import { ChannelI } from "@/types/study-room";
import { Models } from "appwrite";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useSwr from "swr";

const SplashSVG = dynamic(() => import("@/components/Splash"));

interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const { data, mutate, isLoading } = useStudyRoomDetailsById(studyRoomId);
  const { isLoading: loading } = useParticipants(studyRoomId);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);

  const { data: notification, isLoading: loader } = useSwr<Models.DocumentList<Models.Document>>(
    `/study-rooms/meet/${studyRoomId}`,
    async () => await getVideoChatByStudyRoomId(studyRoomId)
  );

  const handleLeaveClick = async () => {
    try {
      await leaveStudyRoom(studyRoomId, currentUser?.$id);
      router.push("/study-rooms");
      toast.success("Successfully left the study room");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onClose = () => {
    setOpen(false);
    setSuccessfullyCreated(false);
  };

  const onCreateChannelModal = useCallback(
    async (channel: ChannelI) => {
      try {
        const newChannel = await createChannel({ ...channel, userId: currentUser.$id });
        if (newChannel && newChannel?.$id) {
          setSuccessfullyCreated(true);
          mutate((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              channels: [prev.channels, newChannel],
            };
          });
        } else toast.error("Study room creation failed");
      } catch (err: any) {
        toast.error(err.message);
      }
    },
    [createChannel]
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col gap-8 justify-center p-8 text-white overflow-y-auto hidden_scrollbar">
      <div>
        <h1 className="text-center text-2xl font-bold">{data?.name}</h1>
        <p className="text-center mt-2">{data?.subject}</p>
      </div>

      <div className="w-full flex justify-center items-center my-6">
        <SplashSVG />
      </div>

      <div className="flex justify-center gap-x-4 items-center gap-y-4">
        <button className="btn max-w-sm" onClick={handleLeaveClick}>
          Leave Room
        </button>
        <button className="btn max-w-sm" onClick={() => setOpen(true)}>
          Create a new channel
        </button>
      </div>
      {notification && notification.documents.length > 0 && (
        <div className="flex flex-col flex-wrap">
          <h1 className="text-xl mb-4">Video Meetings</h1>
          {notification.documents.map((doc) => {
            return (
              <SquareCard
                className="shrink-0 min-w-[250px]"
                key={doc.$id}
                name={doc.name}
                subject={doc.subject}
                to={`meeting/${doc.$id}`}
              />
            );
          })}
        </div>
      )}

      <CreateChannelModal
        open={open}
        onClose={onClose}
        onCreateChannelModal={onCreateChannelModal}
        sucessfulCreation={successfullyCreated}
      />
    </div>
  );
}
