import CTAButton from "@/components/CTAButton";
import { bucketFilePath } from "@/utils/utils";
import Image from "next/image";

const CTABanner = () => {
  return (
    <section className="bg-white text-black mt-[5vh]">
      <div className="py-8 container mx-auto">
        <div className="flex flex-col md:flex-row place-content-around">
          <div className="text-center md:text-left flex flex-col items-center sm:items-start px-4">
            <h1 className="text-2xl md:text-4xl leading-relaxed text-[#F9762E] font-semibold mb-4">
              THIS IS SIMPLY THE <br /> MOST AWESOME
              <br /> PLATFORM:
            </h1>
            <Image
              src={bucketFilePath("assets", "648a042b84afe01ed1a3")}
              alt="fancy-banner-02"
              width={"400"}
              height={"400"}
              className="object-cover object-center"
            />
          </div>
          <div className="text-center md:text-left mt-8 md:mt-36">
            <p className="text-lg leading-relaxed">
              SynapseStudy offers a seamless and
              <br /> interactive study experience,
              <br /> empowering students to connect, <br />
              collaborate, and learn together, <br />
              regardless of their physical location.
            </p>
            <p className="mt-5">#Collaboration and learning at its best!!</p>
            <CTAButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
