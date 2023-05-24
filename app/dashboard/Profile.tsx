"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function Profile() {
  const router = useRouter();

  const { currentUser, loading } = useAuth();

  if (loading) return <Loading />;
  if (!currentUser && !loading) {
    router.push("/login");
    return null;
  }

  const logout = async () => {
    try {
      await logoutUser();
      mutate("/api/auth", null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Name : {currentUser?.name}</h1>
      <pre>
        <code>{JSON.stringify(currentUser, null, 4)}</code>
      </pre>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
