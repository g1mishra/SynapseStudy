"use client";

import Loading from "@/components/Loading";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { IJitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface LogItem {
  message: string;
}

const JitsiMeet: React.FC = () => {
  const apiRef = useRef<IJitsiMeetExternalApi | null>(null);
  const [logItems, updateLog] = useState<LogItem[]>([]);
  const [showNew, toggleShowNew] = useState(false);
  const [knockingParticipants, updateKnockingParticipants] = useState<any[]>([]);
  const router = useRouter();

  const printEventOutput = (payload: any) => {
    updateLog((items) => [...items, { message: JSON.stringify(payload) }]);
  };

  const handleAudioStatusChange = (payload: any, feature: string) => {
    if (payload.muted) {
      updateLog((items) => [...items, { message: `${feature} off` }]);
    } else {
      updateLog((items) => [...items, { message: `${feature} on` }]);
    }
  };

  const handleChatUpdates = (payload: any) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current?.executeCommand("toggleChat");
    updateLog((items) => [
      ...items,
      { message: `you have ${payload.unreadCount} unread messages` },
    ]);
  };

  const handleKnockingParticipant = (payload: any) => {
    updateLog((items) => [...items, { message: JSON.stringify(payload) }]);
    updateKnockingParticipants((participants) => [...participants, payload?.participant]);
  };

  const resolveKnockingParticipants = (condition: (participant: any) => boolean) => {
    knockingParticipants.forEach((participant) => {
      apiRef.current?.executeCommand(
        "answerKnockingParticipant",
        participant?.id,
        condition(participant)
      );
      updateKnockingParticipants((participants) =>
        participants.filter((item) => item.id === participant.id)
      );
    });
  };

  const handleJitsiIFrameRef1 = (iframeRef: HTMLDivElement | null) => {
    if (iframeRef) {
      iframeRef.style.border = "10px solid #3d3d3d";
      iframeRef.style.background = "#3d3d3d";
      iframeRef.style.height = "calc(100vh - 80px)";
      iframeRef.style.width = "100%";
      iframeRef.style.marginBottom = "20px";
    }
  };

  const handleApiReady = (apiObj: IJitsiMeetExternalApi) => {
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload: any) =>
      handleAudioStatusChange(payload, "audio")
    );
    apiRef.current.on("videoMuteStatusChanged", (payload: any) =>
      handleAudioStatusChange(payload, "video")
    );
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    // router.push("/dashboard");
    router.back();
  };

  // const generateRoomName = (): string => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

  const renderSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );

  return (
    <>
      <JitsiMeeting
        domain="meet.rubberducker.xyz"
        // roomName={generateRoomName()}
        roomName="JitsiMeetRoomNo1"
        spinner={renderSpinner}
        configOverwrite={{
          subject: "lalalala",
          hideConferenceSubject: false,
          enableClosePage: true,
        }}
        onApiReady={handleApiReady}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1}
      />
    </>
  );
};

export default JitsiMeet;
