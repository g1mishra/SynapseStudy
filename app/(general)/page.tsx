import CTAButton from "@/components/CTAButton";
import AboutPage from "./about/page";
import Image from "next/image";
import { bucketFilePath } from "@/utils/utils";
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
    <>
      <main className="hero h-[calc(70vh)] bg-[#ffffff] relative">
        <div className="hero-content text-center">
          <div className="max-w-screen-md">
            <h1 className="text-5xl font-bold text-[#F9762E]">Synapse Study</h1>
            <p className="py-6">Collaborative online learning platform for virtual study groups</p>
            {/* <CTAButton /> */}
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center translate-y-1/2">
          <Image
            src={bucketFilePath("assets", "6489efbe17d765d66735")}
            width="700"
            height="400"
            alt="fancy-banner"
            className="object-cover object-center"
          />
        </div>
      </main>

      <AboutPage />
    </>
  );
}
