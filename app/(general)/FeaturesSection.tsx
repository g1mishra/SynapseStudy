const FeaturesSection = () => {
  return (
    <section id="features" className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto">
      <div className="px-4 bg-[#8486D7]  py-8 flex flex-col  items-center text-left">
        <div className="max-w-sm py-4 sm:p-4">
          <h2 className="text-white font-semibold text-xl mb-6">Document Sharing - </h2>
          <p className="text-white text-lg">
            Upload and share study materials, documents, and resources within study rooms for easy
            access and collaboration.
          </p>
        </div>
      </div>
      <div className="px-4 bg-[#F9762E]  py-8 flex flex-col  items-center ">
        <div className="max-w-sm py-4 sm:p-4">
          <h2 className="text-white font-semibold text-xl mb-6">Virtual Whiteboard - </h2>
          <p className="text-white text-lg">
            Collaborate in real-time using a shared virtual whiteboard, enabling students to
            brainstorm ideas, solve problems, and virtually present concepts.
          </p>
        </div>
      </div>
      <div className="px-4 bg-[#28273F]  py-8 flex flex-col  items-center ">
        <div className="max-w-sm py-4 sm:p-4">
          <h2 className="text-white font-semibold text-xl mb-6">Video Conferencing - </h2>
          <p className="text-white text-lg">
            Seamlessly integrate video conferencing, capabilities to facilitate face-to-face
            interactions and discussions within study rooms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
