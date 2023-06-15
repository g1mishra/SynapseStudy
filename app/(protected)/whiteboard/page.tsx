"use client";

import { FormEvent, useEffect, useState } from "react";

// Import the Whiteboard component with the correct file path
import { useAuth } from "@/hooks/useAuth";
import { createWhiteboardDesign } from "@/lib/general.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function WhiteboardPage() {
  const { currentUser } = useAuth();
  const [name, setname] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, name: string) => {
    e.preventDefault();
    // Handle the form submission
    try {
      const resp = await createWhiteboardDesign({
        name,
        user_id: currentUser?.$id,
        data: JSON.stringify(""),
      });
      if (resp?.$id) {
        router.push(`/whiteboard/${resp?.$id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center h-full text-white px-4">
      <form
        onSubmit={(e) => handleSubmit(e, name)}
        className="card-body rounded-15 max-w-sm flex flex-col gap-y-6 bg-black-tertiary"
      >
        <h1 className="text-2xl text-center mb-6 font-semibold">Create Project</h1>
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter name"
            className="input input-bordered text-black-tertiary"
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </div>
        <button className="btn bg-purple">Create Design</button>
      </form>
    </main>
  );
}
