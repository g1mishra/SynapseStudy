import { getStudyRoomByUserId } from "@/lib/studyrooms.service";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function useStudyRoomListByUserId(userId: string) {
  const key = userId ? `/studyroom/${userId}` : null;
  const { data, error, mutate } = useSWR(key, async () => await getStudyRoomByUserId(userId), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError(err, key, config) {
      console.log("useStudyRoomListByUserId onError", err, key, config);
      toast.error(err.message);
    },
  });

  return {
    studyRooms: data?.documents || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
