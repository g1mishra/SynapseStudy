import { PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StudyRooms from "./StudyRooms";

export default function StudyRoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <div className="w-1/5 bg-blue-800 flex flex-col justify-between">
        <div>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-bold p-4 rounded-md transition-colors duration-300">
            <div className="flex gap-4 items-center">
              <strong>Create Room</strong> <PlusCircleIcon className="w-6 h-6 text-indigo-50" />
            </div>
          </button>
          <StudyRooms />
        </div>
        <div className="border-t border-t-indigo-800 p-4">
          <div className="flex gap-4 items-center">
            <UserIcon className="w-6 h-6 text-indigo-50" />
            <div className="flex flex-col">
              <span className="text-indigo-50 my-0">Vikas Thakur</span>
              <Link href="/" className="text-indigo-200 text-sm">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 bg-gray-100">{children}</div>
    </div>
  );
}
