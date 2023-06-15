"use client";

import Loading from "@/components/Loading";
import { Whiteboard } from "@/components/Whiteboard";
import { useAuth } from "@/hooks/useAuth";
import { getWhiteboardDesign, updateWhiteboardDesign } from "@/lib/general.service";
import Error from "next/error";
import { toast } from "react-toastify";
import useSWR from "swr";

// updateWhiteboardDesign

export default function WhiteboardPage({ params: { wId } }: { params: { wId: string } }) {
  const { currentUser, loading } = useAuth();

  const { data, isLoading, error } = useSWR(
    wId ? `/whiteboard/${wId}` : null,
    async () => await getWhiteboardDesign(wId)
  );

  const saveDataToDB = async (data: string, id: string) => {
    try {
      const res = await updateWhiteboardDesign({ data }, id);
      toast.success("Data saved to db");
    } catch (error) {
      toast.error("Error while saving data!");
    }
  };

  if (loading || isLoading) return <Loading />;

  if (error) return <Error statusCode={404} title="URL is not valid" />;

  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <Whiteboard data={data} saveDataToDB={saveDataToDB} />
    </div>
  );
}
