"use client";

interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  // to check if the user is authorized to view the study room

  const handleLeaveClick = () => {
    console.log("leave the study room");

    // leave the study room
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 justify-center p-8 text-white">
      <h1>{studyRoomId}</h1>
      <button className="btn" onClick={handleLeaveClick}>
        Leave Room
      </button>
    </div>
  );
}
