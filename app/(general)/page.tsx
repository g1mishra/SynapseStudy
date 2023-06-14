import CTAButton from "@/components/CTAButton";
import AboutPage from "./about/component";
import Image from "next/image";
import { bucketFilePath } from "@/utils/utils";
import CTABanner from "./CTABanner";
import FeaturesSection from "./FeaturesSection";
import ContactForm from "./contact/ContactForm";

export default async function Page() {
  return (
    <>
      <main className="hero h-[calc(70vh)] bg-[#ffffff] relative">
        <div className="hero-content text-center mt-8 sm:mt-0">
          <div className="max-w-screen-md mb-44">
            <h1 className="text-3xl md:text-5xl font-bold text-black-primary">Synapse Study</h1>
            <p className="py-6">An ordinary not so ordinary place for you and your community</p>
            <CTAButton />
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 px-4 flex items-center justify-center translate-y-1/2">
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
      <CTABanner />
      <FeaturesSection />
      <section className="w-full px-4 py-8 flex justify-evenly flex-col sm:flex-row bg-white text-black">
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="text-2xl md:text-4xl leading-relaxed text-[#F9762E] font-semibold mb-4">
            WE BUILD WHAT WE BELIEVE IN. <br />
            WE BELIEVE IN WHAT WE BUILD.
          </h1>
          <div className="bg-[#343446] p-4 rounded-15 max-w-max">
            <Image
              src={bucketFilePath("assets", "648a25c21711822db4eb")}
              alt="fancy-banner-03"
              width={"400"}
              height={"400"}
              className="object-contain object-center"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center md:text-left mt-8 sm:mt-0">
          <p className="text-lg leading-relaxed text-[#343446] max-w-sm">
            We believe that creating the future the world wants requires changing how the world
            grows. That's why we develop inclusive products for the people which are accessible and
            user-friendly.
          </p>
          <p className="mt-5 text-lg text-[#343446] max-w-sm">
            Led by the team of fantastic front-end developers, outstanding backend developers and
            phenomenal designers is creating next-generation solutions that will overcome critical
            challenges facing the industry.
          </p>
        </div>
      </section>
      <section id="contact" className="container mx-auto px-6 py-12 h-full flex flex-col md:flex-row justify-evenly items-center text-white">
        <h1 className="text-3xl font-bold mb-4 leading-relaxed self-start">
          LET'S MAKE <br /> SOMETHING GREAT <br /> TOGETHER
        </h1>
        <div className="max-w-md w-full ">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
