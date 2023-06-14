import { cn } from "@/utils/utils";
import React from "react";

interface StudyRoomCardProps {
  heading: string;
  paragraph: string;
  buttonText: string;
  onClick: () => void;
  status?: "public" | "private";
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
      className={cn("w-full max-w-[500px] md:min-w-max sm:h-[250px] rounded-15", {
        "bg-orange-dark": status === "public",
        "bg-purple": status === "private",
      })}
    >
      <div className="flex flex-col justify-center h-full p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold">{heading}</h2>
          <p className="flex items-center space-x-2">
            <span
              className={cn("w-2.5 h-2.5 inline-block rounded-full", {
                "bg-yellow-light": status === "public",
                "bg-green-light": status === "private",
              })}
            />
            <span className={`font-bold text-lg sm:text-xl lg:text-2xl text-white capitalize`}>
              {status}
            </span>
          </p>
        </div>
        <p className="text-black-secondary mb-4 text-base md:text-base lg:text-lg max-w-[294px] line-clamp-2">
          {paragraph}
        </p>
        <button
          className="bg-black-secondary text-white p-3 rounded-15 w-28 box-border justify-self-end self-end"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StudyRoomCard;
