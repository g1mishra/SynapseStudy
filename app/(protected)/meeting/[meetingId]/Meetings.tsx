"use client";

import Loading from "@/components/Loading";
import { updateVideoChatById } from "@/lib/chatrooms.service";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { IJitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";
import { useParams, useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const JitsiMeet: React.FC<{
  data: any;
  userInfo: {
    displayName: string;
    email: string;
  };
}> = ({ userInfo, data }) => {
  const apiRef = useRef<IJitsiMeetExternalApi | null>(null);
  const router = useRouter();
  const { meetingId } = useParams();

  const handleJitsiIFrameRef1 = (iframeRef: HTMLDivElement | null) => {
    if (iframeRef) {
      iframeRef.style.background = "#20202D";
      iframeRef.style.height = "100%";
      iframeRef.style.width = "100%";
    }
  };

  const handleApiReady = (apiObj: IJitsiMeetExternalApi) => {
    apiRef.current = apiObj;
    // apiRef.current.on("participantJoined", handleParticipantJoined);
    // apiRef.current.on("participantLeft", handleParticipantLeft);
    // apiRef.current.on("participantKickedOut", handleParticipantKickedOut);
    // // videoConferenceJoined
    // apiRef.current.on("videoConferenceJoined", handleVideoConferenceJoined);
    // // videoConferenceLeft
    apiRef.current.on("videoConferenceLeft", handleVideoConferenceLeft);
  };

  const renderSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );

  const handleVideoConferenceLeft = () => {
    router.push("/dashboard");
    toast.success("Video chat ended");
  };

  const handleReadyToClose = async () => {
    const number = apiRef.current?.getNumberOfParticipants();
    if (number === 0) {
      await updateVideoChatById(meetingId, { status: "ended" });
    }
  };

  return (
    <>
      <JitsiMeeting
        domain="meet.rubberducker.xyz"
        roomName={data?.name || "Room Name"}
        spinner={renderSpinner}
        userInfo={userInfo}
        onApiReady={handleApiReady}
        getIFrameRef={handleJitsiIFrameRef1}
        onReadyToClose={handleReadyToClose}
        configOverwrite={{
          subject: data?.subject || `Subject-${data?.$id}`,
          hideConferenceSubject: false,
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          hideConferenceTimer: true,
          buttonsWithNotifyClick: [
            {
              key: "end-meeting",
              preventExecution: true,
            },
          ],
        }}
      />
    </>
  );
};

export default JitsiMeet;
