"use client";

import Avatar from "@/components/Avatar";
import Search from "@/components/Search";
import StudyRoomCard from "./StudyRoomCard";

const StudyRoomPage = () => {
  function handleSubmit(query: string) {
    console.log("Search query:", query);
  }
  const handleJoinClick = () => {
    console.log("Join button clicked");
  };
  return (
    <div className="w-full flex flex-col p-8">
      <div className="flex justify-between items-center">
        <Search handleSubmit={handleSubmit} />
        <Avatar className="rounded-md" width={56} height={56} />
      </div>
      <div>
        <h1 className="text-4xl font-bold">Public Study Rooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
          <StudyRoomCard
            heading="Techie Updates"
            paragraph="Your daily dose of latest new gadgets and updates on a variety of categories"
            buttonText="Join"
            onClick={handleJoinClick}
            status="public"
          />
          <StudyRoomCard
            heading="Techie Updates"
            paragraph="Your daily dose of latest new gadgets and updates on a variety of categories"
            buttonText="Join"
            onClick={handleJoinClick}
            status="private"
          />
        </div>
      </div>
    </div>
  );
};

export default StudyRoomPage;
