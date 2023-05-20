const Features = () => {
  return (
    <main className="hero min-h-[calc(100vh-80px)] bg-base-200 py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Study Rooms
            </h3>
            <p className="text-gray-700">
              Create and join virtual study rooms to collaborate with peers on
              specific subjects or topics.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-700">
              Communicate with study group members using a real-time messaging
              system, fostering instant collaboration and knowledge sharing.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Document Sharing
            </h3>
            <p className="text-gray-700">
              Upload and share study materials, documents, and resources within
              study rooms for easy access and collaboration.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Virtual Whiteboard
            </h3>
            <p className="text-gray-700">
              Collaborate in real-time using a shared virtual whiteboard,
              enabling students to brainstorm ideas, solve problems, and
              visually present concepts.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Video Conferencing
            </h3>
            <p className="text-gray-700">
              Seamlessly integrate video conferencing capabilities to facilitate
              face-to-face interactions and discussions within study rooms.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl text-gray-900 font-semibold mb-2">
              Notifications and Reminders
            </h3>
            <p className="text-gray-700">
              Stay organized with study reminders and notifications, ensuring
              that students never miss an important study session.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Features;
