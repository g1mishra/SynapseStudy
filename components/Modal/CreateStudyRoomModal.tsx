import { StudyRoomI } from "@/types/study-room";
import React, { useEffect, useRef, useState } from "react";

interface CreateChatRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreateChatRoom: (studyRoom: StudyRoomI) => void;
  sucessfulCreation?: boolean;
}

type Status = "public" | "private";

const CreateStudyRoomModal: React.FC<CreateChatRoomModalProps> = ({
  open,
  onClose,
  onCreateChatRoom,
  sucessfulCreation,
}) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setstatus] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);

  const _onClose = () => {
    setName("");
    setSubject("");
    setstatus("");
    onClose();
  };

  const handleCreateChatRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studyRoom: StudyRoomI = {
      name,
      subject,
      status: status as Status,
    };

    if (onCreateChatRoom) onCreateChatRoom(studyRoom);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      _onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, _onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800/20 backdrop-blur-lg">
      <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:max-w-md " ref={modalRef}>
        {sucessfulCreation ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-green-500">Room created successfully!</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => _onClose()}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Create Study Room</h2>
            <form className="flex flex-col gap-4 pt-4 sm:pt-8" onSubmit={handleCreateChatRoom}>
              <input
                type="text"
                className="input text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                placeholder="Group name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                rows={3}
                className="textarea text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                placeholder="About the group"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <select
                name=""
                id=""
                className="select text-base font-normal border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <button className="btn btn-primary mt-4">Create</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateStudyRoomModal;
