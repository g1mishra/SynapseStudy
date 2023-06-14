import { AboutSectionCreative } from "@/components/Icons";

const AboutPage = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-black-primary text-white">
      <section className="py-8 container mx-auto">
        <div className="container mx-auto px-4 text-center mt-32">
          {/* <h1 className="text-4xl font-bold mb-4">About SynapseStudy</h1> */}
          <p className="text-lg mb-4">
            SynapseStudy is a platform designed to enhance collaboration and
            knowledge sharing among students. It provides a range of features to
            facilitate virtual study rooms, real-time messaging, document
            sharing, virtual whiteboard, video conferencing, and notifications.
          </p>
          <p className="text-lg mb-4">
            Our goal is to create a seamless and intuitive study experience,
            allowing students to connect with their peers, collaborate on
            subjects, share resources, and engage in interactive study sessions.
          </p>
          <p className="text-lg">
            Join SynapseStudy today and revolutionize the way you study!
          </p>
          <div className="scale-75 ml-52">
            {" "}
            <AboutSectionCreative />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
