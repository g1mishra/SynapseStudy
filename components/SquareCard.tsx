import { cn } from "@/utils/utils";
import Link from "next/link";
import React from "react";

interface SquareCardProps {
  className?: string;
  name: string;
  subject: string;
  to: string;
}

const SquareCard: React.FC<SquareCardProps> = ({ name, subject, to, className = "" }) => {
  return (
    <div
      className={cn(
        "max-w-sm h-28 bg-black-tertiary shadow-md rounded-md p-4 flex items-center space-x-2",
        className
      )}
    >
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <p className="text-sm text-gray-primary">{subject}</p>
      </div>
      <Link href={to}>
        <button className="bg-orange-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Join
        </button>
      </Link>
    </div>
  );
};

export default SquareCard;
