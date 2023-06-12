import { getStudyRoomByUserId } from "@/lib/studyrooms.service";
import useSWR from "swr";

export default function useStudyRoomListByUserId(userId: string) {
  const key = userId ? `/studyroom/${userId}` : null;
  const { data, error, mutate } = useSWR(key, async () => await getStudyRoomByUserId(userId), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    studyRooms: data?.documents || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}