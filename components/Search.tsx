"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  handleSubmit: (query: string) => void;
}

export default function Search({ handleSubmit }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit} className="relative text-white flex items-center w-full max-w-md">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        className="pl-14 pr-4 py-2 h-16 box-border w-full rounded-15 bg-black-secondary placeholder:text-white  focus:outline-none"
      />
      <MagnifyingGlassIcon className="absolute w-5 h-5 left-4" />
    </form>
  );
}
