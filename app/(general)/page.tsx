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
      <main className="hero h-[calc(70vh)] bg-[#ffffff]">
        <div className="hero-content text-center">
          <div className="max-w-screen-md">
            <h1 className="text-5xl font-bold text-[#F9762E]">Synapse Study</h1>
            <p className="py-6">
              Collaborative online learning platform for virtual study groups
            </p>
            {/* <CTAButton /> */}
          </div>
        </div>
      </main>
      <div className="relative">
        <Image
          src={bucketFilePath("assets", "6489efbe17d765d66735")}
          width={"600"}
          height={"600"}
          alt="fancy-banner"
          className="absolute top-0 left-1/2 translate-x-1/2 -translate-y-1/2 inset-y-0"
        />
      </div>
      <AboutPage />
    </>
  );
}
