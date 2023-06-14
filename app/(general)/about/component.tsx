import { AboutSectionCreative } from "@/components/Icons";

const AboutPage = () => {
  return (
    <section className="bg-black-primary text-white mt-[15vh] md:mt-[25vh]" id="about">
      <div className="py-8 container mx-auto">
        <div className="container mx-auto px-4 text-center max-w-screen-lg">
          <p className="text-lg mb-4">
            SynapseStudy is a platform designed to enhance collaboration and knowledge sharing among
            students. It provides a range of features to facilitate virtual study rooms, real-time
            messaging, document sharing, virtual whiteboard, video conferencing, and notifications.
          </p>
          <p className="text-lg mb-4">
            Our goal is to create a seamless and intuitive study experience, allowing students to
            connect with their peers, collaborate on subjects, share resources, and engage in
            interactive study sessions.
          </p>
          <p className="text-lg">Join SynapseStudy today and revolutionize the way you study!</p>
          <div className="flex items-center justify-center mt-4">
            <AboutSectionCreative />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
