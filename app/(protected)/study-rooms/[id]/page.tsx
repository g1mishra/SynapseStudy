"use client";

interface StudyRoomPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: studyRoomId } }: StudyRoomPageProps) {
  // to check if the user is authorized to view the study room

  return <div className="w-full flex flex-col p-8"></div>;
}
