export default function RoomListLoader() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 gap-y-2 py-1 flex flex-col items-center ">
        <div className="rounded-full bg-blue-400 h-12 w-12"></div>
        <div className="h-4 bg-blue-400 rounded w-8/12 mt-2"></div>
        <div className="h-4 bg-blue-400 rounded w-10/12"></div>
        <div className="h-4 bg-blue-400 rounded w-11/12"></div>
      </div>
    </div>
  );
}
