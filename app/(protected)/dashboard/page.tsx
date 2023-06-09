"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { currentUser, loading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search query submission
    console.log("Search query:", searchQuery);
  };

  if (loading) return <Loading />;
  return (
    // <main className="hero min-h-[calc(100vh-80px)] bg-blue-600 py-4">
    //   <div className="hero-content container justify-evenly flex-col">
    //     <h1 className="text-5xl font-bold">Dashboard</h1>
    //     <div className="flex flex-col items-center">
    //       <h1>Name : {currentUser?.name}</h1>
    //       <pre>
    //         <code>{JSON.stringify(currentUser, null, 4)}</code>
    //       </pre>
    //       <button className="btn" onClick={logout}>
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </main>
    <div className="flex">
      <div className="w-1/2 flex justify-center items-center gap-8 mt-20">
        <div className="w-48 h-52 bg-orange shadow-lg rounded-lg p-7">
          <p className="text-white text-lg font-semibold mt-28">New Room</p>
          <p className="text-white">set up new room</p>
        </div>
        <div className="w-48 h-52 bg-purple shadow-lg rounded-lg p-7">
          <p className="text-white text-lg font-semibold mt-28">Join Room</p>
          <p className="text-white">via invitation link</p>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-96 rounded-md bg-black-secondary text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-500 left-3 top-2.5" />
        </form>
      </div>
    </div>
  );
}
