"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { getVideoChatById } from "@/lib/chatrooms.service";
import Error from "next/error";
import useSwr from "swr";
import Meeting from "./Meetings";

export default function Page({ params: { meetingId } }: { params: { meetingId: string } }) {
  const { currentUser, loading } = useAuth();
  const { data, isLoading } = useSwr("/api/meeting/" + meetingId, async () => {
    return await getVideoChatById(meetingId);
  });

  const loadingState = isLoading || loading;

  if (!meetingId) return null;
  if (loadingState) return <Loading />;
  if (!data?.$id && !loadingState) {
    return <Error statusCode={404} title="Meeting link is not valid." />;
  }
  return (
    <Meeting
      data={data}
      userInfo={{
        displayName: currentUser?.name || "Unkown",
        email: currentUser?.email || "unkown@place.com",
      }}
    />
  );
}
