import useSWR from "swr";

const useCollapse = <T>(key: string, initial: T): [T, (newValue: T) => void] => {
  const { data: state, mutate: setState } = useSWR<T | undefined>(key, {
    fallbackData: initial,
  });

  return [state || initial, setState];
};

export default useCollapse;
