"use client";
import { cn } from "@/utils/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  handleSubmit: (query: string) => void;
  className?: string;
}

export default function Search({ handleSubmit, className }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    if (search) setSearchQuery(search);
    else setSearchQuery("");
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative text-white flex items-center w-full sm:max-w-md", className)}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchQuery ?? ""}
        onChange={handleSearch}
        className="pl-14 pr-4 py-2 h-16 box-border w-full rounded-15 bg-black-secondary placeholder:text-white  focus:outline-none"
      />
      <MagnifyingGlassIcon className="absolute w-5 h-5 left-4" />
    </form>
  );
}
