import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils/utils";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function Notifications({ from = "settings" }) {
  const { currentUser } = useAuth();
  const { data, isLoading, mutate } = useSWR(
    `/api/join-request/?user_id=${currentUser?.$id}`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    },
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const handleAccept = async (item: any) => {
    if (item?.userId && item?.studyRoomId) {
      try {
        const resp = await fetch(`/api/join-request`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "accepted",
            userId: item?.userId,
            studyRoomId: item?.studyRoomId,
            joinRequestId: item?.$id,
          }),
        });
        if (resp.status !== 200) {
          toast.error("An unexpected error occured.");
          return;
        }
        toast.success("Request accepted");
        mutate((prev: { data: { joinRequests: any[] } }) => {
          return {
            ...prev,
            data: {
              ...prev?.data,
              joinRequests: prev?.data?.joinRequests?.filter((req: any) => req?.$id !== item?.$id),
            },
          };
        });
      } catch (error) {
        toast.error("An unexpected error occured.");
      }
    }
  };
  const handleDecline = (item: any) => {
    if (item?.userId && item?.studyRoomId) {
      fetch(`/api/join-request`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
          userId: item?.userId,
          studyRoomId: item?.studyRoomId,
          joinRequestId: item?.$id,
        }),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Request rejected");
          mutate((prev: { data: { joinRequests: any[] } }) => {
            return {
              ...prev,
              data: {
                ...prev?.data,
                joinRequests: prev?.data?.joinRequests?.filter(
                  (req: any) => req?.$id !== item?.$id
                ),
              },
            };
          });
        } else {
          toast.error("An unexpected error occured.");
        }
      });
    }
  };

  const joinRequests = data?.data?.joinRequests || [];
  const userListObj = data?.data?.userListObj || {};

  return (
    <div
      className={cn("container mt-28 mb-10 flex flex-col justify-center items-center", {
        "mt-0": from === "dashboard",
      })}
    >
      <div className="flex flex-col items-center w-full max-w-md">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          joinRequests?.map((item: any) => {
            return (
              <div
                key={item?.$id}
                className="flex flex-col sm:flex-row justify-between gap-x-4 items-center bg-white p-4 rounded-md shadow-md"
              >
                <div className="flex flex-col">
                  <span className="text-gray-600 text-base">
                    <strong>{userListObj[item?.userId]?.name || item?.userId}</strong> wants to join
                    your studyroom
                  </span>
                  <span className="text-gray-800 text-sm mt-1">{item?.message}</span>
                </div>
                <div className="flex flex-row mt-2 sm:mt-0">
                  <button
                    onClick={() => handleAccept(item)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(item)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })
        )}
        {!isLoading && joinRequests?.length === 0 && from !== "dashboard" && (
          <div className="text-white">No pending requests</div>
        )}
      </div>
    </div>
  );
}
