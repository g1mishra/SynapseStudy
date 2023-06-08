import useSwr from "swr";

export function useProgressBar<T>(key: string) {
  const { data: progress, mutate: mutateProgress } = useSwr<T>(key);

  return { progress, mutateProgress };
}
