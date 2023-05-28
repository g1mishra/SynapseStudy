import Link from "next/link";
// async function getData() {
//   try {
//     const user = await getCurrentUser();
//     console.log("Getting data", user);
//   } catch (err) {
//     console.log(err);
//   }
// }

export default async function Page() {
  // const data = await getData();
  return (
    <main className="hero min-h-[calc(100vh-80px)] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-screen-md">
          <h1 className="text-5xl font-bold">SynapseStudy</h1>
          <p className="py-6">Collaborative online learning platform for virtual study groups</p>
          <Link href="/login" className="btn">
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
