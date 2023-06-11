import { getStudyRoomById } from "@/lib/studyrooms.service";
import useSWR from "swr";

export default function useStudyRoomDetailsById(studyRoomId: string) {
  const key = studyRoomId ? `/studyroom-details/${studyRoomId}` : null;
  const { data, error, mutate } = useSWR(key, async () => await getStudyRoomById(studyRoomId), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
