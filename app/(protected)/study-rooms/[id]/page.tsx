"use client";

import Loading from "@/components/Loading";
import CreateChannelModal from "@/components/Modal/CreateChannelModal";
import { useAuth } from "@/hooks/useAuth";
import useParticipants from "@/hooks/useParticipants";
import useStudyRoomDetailsById from "@/hooks/useStudyRoomDetailsById";
import { createChannel, leaveStudyRoom } from "@/lib/studyrooms.service";
import { ChannelI } from "@/types/study-room";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const { data, mutate, isLoading } = useStudyRoomDetailsById(studyRoomId);
  const { isLoading: loading } = useParticipants(studyRoomId);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);

  const handleLeaveClick = () => {
    console.log("leave the study room");
    leaveStudyRoom(studyRoomId, currentUser?.$id);
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
    <div className="w-full flex flex-col gap-8 justify-center p-8 text-white">
      <h1 className="text-center">{data?.name}</h1>
      <div className="flex flex-col items-center gap-y-4">
        <button className="btn max-w-sm" onClick={handleLeaveClick}>
          Leave Room
        </button>
        <button className="btn max-w-sm" onClick={() => setOpen(true)}>
          Create a new channel
        </button>
      </div>
      <CreateChannelModal
        open={open}
        onClose={onClose}
        onCreateChannelModal={onCreateChannelModal}
        sucessfulCreation={successfullyCreated}
      />
    </div>
  );
}
