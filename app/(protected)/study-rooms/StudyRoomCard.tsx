import { cn } from "@/utils/utils";
import React from "react";

interface StudyRoomCardProps {
  heading: string;
  paragraph: string;
  buttonText: string;
  onClick: () => void;
  status: string;
}

const StudyRoomCard: React.FC<StudyRoomCardProps> = ({
  heading,
  paragraph,
  buttonText,
  onClick,
  status,
}) => {
  return (
    <div
      className={cn("w-full max-w-[519px] h-[270px] rounded-15", {
        "bg-orange-dark": status === "public",
        "bg-purple": status === "private",
      })}
    >
      <div className="flex flex-col justify-center h-full p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">{heading}</h2>
          <p className="flex items-center space-x-2">
            <span
              className={cn("w-2.5 h-2.5 inline-block rounded-full", {
                "bg-yellow-light": status === "public",
                "bg-green-light": status === "private",
              })}
            />
            <span className={`font-bold text-2xl text-white capitalize`}>{status}</span>
          </p>
        </div>
        <p className="text-black-secondary mb-4 text-lg max-w-[294px]">{paragraph}</p>
        <button
          className="bg-black-secondary text-white px-4 py-2 rounded-15 w-28 box-border self-end"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StudyRoomCard;
