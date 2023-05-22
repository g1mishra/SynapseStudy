"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const user = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      router.push("/");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return <Loading />;
    }
  };

  return (
    <div className="flex flex-col">
      <h1>{user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
