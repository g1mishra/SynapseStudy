const FeaturesSection = () => {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 place-content-center">
        <div className="bg-[#8486D7] p-4 text-center flex flex-col justify-center items-center">
          <h2 className="text-white font-semibold text-xl mb-6">
            Document Sharing -{" "}
          </h2>
          <p className="text-white text-lg text-justify">
            Upload and share study
            <br /> materials, documents,
            <br /> and resources within
            <br />
            study rooms for easy
            <br /> access and <br /> collaboration.
          </p>
        </div>
        <div className="bg-[#F9762E] p-4 text-center flex flex-col justify-center items-center">
          <h2 className="text-white font-semibold text-xl mb-6">
            Virtual Whiteboard -{" "}
          </h2>
          <p className="text-white text-lg text-justify">
            Collaborate in real-time
            <br /> using a shared virtual
            <br /> whiteboard, enabling
            <br />
            students to brainstorm
            <br />
            ideas, solve problems,
            <br /> and virtually present <br /> concepts.
          </p>
        </div>
        <div className="bg-[#28273F] p-4 text-center flex flex-col justify-center items-center">
          <h2 className="text-white font-semibold text-xl mb-6">
            Video Conferencing -{" "}
          </h2>
          <p className="text-white text-lg text-justify">
            Seamlessly integrate
            <br /> video conferencing,
            <br /> capabilities to facilitate
            <br /> face-to-face <br />
            interactions and
            <br /> discussions within
            <br /> study rooms.
          </p>
        </div>
      </div>
    </main>
  );
};

export default FeaturesSection;
