import useSWR from "swr";

export default function useParticipants(study_room_id: string) {
  const { data, error } = useSWR(
    `/api/study-group/users/?study_room_id=${study_room_id}`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
