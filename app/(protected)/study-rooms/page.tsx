import StudyRooms from "../../components/StudyRooms";

const StudyRoom = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center py-8 overflow-hidden">
        <h1 className="text-xl font-bold p-4">Welcome</h1>
        <p className="max-w-screen-md">
          This is a study room. You can create a study room and invite your friends to join you. You
          can also join a study room created by your friends.
        </p>
        <div className="mt-8 max-w-screen-md w-full">
          <StudyRooms />
        </div>
      </div>
    </>
  );
};

export default StudyRoom;
