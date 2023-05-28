"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/utils";

const studyRooms = [
  {
    id: 1,
    name: "Room 1",
  },
  {
    id: 2,
    name: "Room 2",
  },
  {
    id: 3,
    name: "Room 3",
  },
];

const StudyRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <div className="w-1/5 bg-blue-800 flex flex-col justify-between">
        <div>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-bold p-4 rounded-md transition-colors duration-300">
            <div className="flex gap-4 items-center">
              <strong>Create Room</strong>{" "}
              <PlusCircleIcon className="w-6 h-6 text-indigo-50" />
            </div>
          </button>
          <ul className="py-2 flex flex-col gap-2">
            {studyRooms.map((room) => (
              <li
                key={room.id}
                className={cn({
                  "text-white hover:bg-white hover:text-blue-800": true, // Colors
                  "flex gap-4 items-center": true, // Layout
                  "transition-colors duration-300": true, // Animation
                  "rounded-md p-2 mx-2": true, // Self-style
                })}
                onClick={() => handleRoomClick(room.name)}
              >
                {room.name}
              </li>
            ))}
          </ul>
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
      <div className="w-4/5 bg-gray-100">
        <h1 className="text-xl font-bold p-4">{selectedRoom}</h1>
        {/* Add the content for the right part of the component based on the selected room */}
      </div>
    </div>
  );
};

export default StudyRoom;
