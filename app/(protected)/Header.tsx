"use client";

import Avatar from "@/components/Avatar";
import Search from "@/components/Search";
import { cn } from "@/utils/utils";
import Link from "next/link";

interface HeaderProps {
  currentUser: any;
  className?: string;
  openMenu: any;
  setOpenMenu: any;
}

export default function Header({
  currentUser,
  className,
  openMenu,
  setOpenMenu,
}: HeaderProps) {
  function handleSubmit(query: string) {
    console.log("Search query:", query);
  }

  return (
    <>
      <div
        className={cn(
          "w-full self-end max-w-md flex justify-between items-center pb-8 gap-x-4",
          className
        )}
      >
        <svg
          onClick={() => setOpenMenu(!openMenu)}
          className="w-8 h-full cursor-pointer md:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        <Search className="flex-1" handleSubmit={handleSubmit} />
        <Link href="/settings">
          <Avatar
            className="rounded-md shrink-0 mr-0"
            width={50}
            height={50}
            imageSrc={currentUser?.prefs?.image || ""}
          />
        </Link>
      </div>
    </>
  );
}
